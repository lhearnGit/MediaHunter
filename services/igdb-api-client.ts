import { IGDB_Genre, Theme } from "@/lib/entities/IGDB";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const baseUrl = "https://api.igdb.com/v4/";
const prisma = new PrismaClient();

export interface Auth_Token {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
}
export interface IGDB_Request {
  endpoint: string;
  query: string;
}
//Provide Caching for access_token
//is used to fetch token from prisma, validating on failure.
const Fetch_Token = cache(async () => {
  console.log("Caching...");
  const access_token = await prisma.igdb_Token.findFirst();

  return access_token?.access_token;
});

//gets a new token from IGDB
export async function Generate_Token() {
  console.log("Generating ...");
  //Check that Client_ID is stored on server
  if (!process.env.IGDB_CLIENT_ID?.toString())
    throw Error("Client ID Error during Authorization ");
  const Client_Id = process.env.IGDB_CLIENT_ID?.toString();

  //Check that Client_Secret is stored on server
  if (!process.env.IGDB_CLIENT_SECRET?.toString())
    throw Error("Client Secret Error during Authorization ");
  const Client_Secret = process.env.IGDB_CLIENT_SECRET?.toString();

  const endPoint = new URL(
    `https://id.twitch.tv/oauth2/token?client_id=${Client_Id}&client_secret=${Client_Secret}&grant_type=client_credentials`
  );

  const response: Auth_Token = await fetch(endPoint, {
    method: "POST",
  }).then((res) => res.json());

  await prisma.igdb_Token.create({ data: { ...response } });

  return response;
}

//Validate Token in DB, if there is an error, use this to validate & refresh token
//return a status, and a token
//even when status returns as false ,a new token has been generated and returned, the false flag will be used to refetch

export async function ValidateToken() {
  console.log("Validating ...");
  //Fetch access_Token from DB
  const access_token = await prisma.igdb_Token.findFirst({
    select: { id: true, access_token: true },
  });

  //If there is no token, generate and return one
  if (!access_token) {
    const newToken = await Generate_Token();
    return { access_token: newToken.access_token };
  }

  //If there is a token Validate it and make sure it does not need to be replaced
  const isValid = await fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token.access_token}` },
    cache: "no-cache",
  }).then((res) => res.json());

  //if access_token is Invalid, Generate a new one, delete & create a new one.
  if (isValid.status == 401) {
    console.log("invalid Token");

    //delete token on server
    await prisma.igdb_Token.delete({
      where: { id: access_token?.id },
    });

    //generate new token
    const newToken = await Generate_Token();

    console.log("Generating new Token.... " + newToken?.access_token);

    return { status: false, access_token: newToken.access_token };
  }
  //if access_token is Valid
  else if (isValid.status == 200) {
    return { status: true, access_token: access_token.access_token };
  }
}

/*

Fetch and Store Low change rate Data in PrismaDB to reduce querycount 
to IGDB due to query rate limits.

*/
async function RefreshStaticData(access_token: Auth_Token) {
  const genresParams: IGDB_Request = {
    endpoint: "genres",
    query:
      "fields *; limit 100; exclude url, created_at, updated_at, checksum;",
  };

  const themesParams: IGDB_Request = {
    endpoint: "themes",
    query:
      "fields *; limit 100; exclude url, created_at, updated_at, checksum;",
  };

  const genres: IGDB_Genre[] = await IGDB_Fetch({
    ...genresParams,
  });

  const themes: Theme[] = await IGDB_Fetch({
    ...themesParams,
  });

  await prisma.igdb_Genre.createMany({
    data: genres,
  });

  await prisma.igdb_Theme.createMany({
    data: themes,
  });
}

//Fetch Function
/* 

To Dos 

  Add optional caching

*/
export async function IGDB_Fetch(request: IGDB_Request) {
  //let access_token = await Fetch_Token();
  /*if (!access_token) {
    //upon failure to fetch an access_token, Validation checks
    access_token = await ValidateToken().then((res) => {
      return res?.access_token;
    });
  }*/

  const access_token = "17et6rpa7ty9y6wjf57gf09nxacu31";
  if (!process.env.IGDB_CLIENT_ID?.toString())
    throw Error("Client ID Error during Authorization ");
  const Client_Id = process.env.IGDB_CLIENT_ID.toString();

  const header = {
    "Content-Type": "application/json",
    "Client-ID": Client_Id,
    Authorization: `Bearer ${access_token}`,
  };

  const options = {
    method: "POST",
    headers: { ...header },
    body: request.query,
  };

  const result = await fetch(baseUrl + request.endpoint, {
    ...options,
    next: { revalidate: 0 },
  }).then((res) => res.json());

  return result;
}
