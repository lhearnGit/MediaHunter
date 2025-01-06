import { PrismaClient } from "@prisma/client";
import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";

export interface IGDB_Request {
  endpoint: string;
  query: string;
}
interface Auth_Token {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
}
const prisma = new PrismaClient();

const baseUrl = "https://api.igdb.com/v4/";

export async function IGDB_Fetch<T>(request: IGDB_Request) {
  try {
    if (!process.env.IGDB_CLIENT_ID?.toString())
      throw new Error("Client ID Error during Authorization - Check ENV ");
    const client_id = process.env.IGDB_CLIENT_ID?.toString();

    const token = await Generate_Token();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": client_id,
        Authorization: `Bearer ${token.access_token}`,
      },
      body: request.query,
    };

    const response: T[] = await fetch(baseUrl + request.endpoint, {
      ...options,
      next: { revalidate: 300 }, //5minute cache
    }).then((res) => {
      if (res.status == 401) {
        throw new Error(`${res.status} : ${res.statusText}`);
      } else return res.json();
    });

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function IGDB_Fetch_Details<T>(request: IGDB_Request) {
  try {
    if (!process.env.IGDB_CLIENT_ID?.toString())
      throw new Error("Client ID Error during Authorization - Check ENV ");
    const client_id = process.env.IGDB_CLIENT_ID?.toString();

    const token = await Generate_Token();
    console.log("TOKEN---------");
    console.log(token);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": client_id,
        Authorization: `Bearer ${token.access_token}`,
      },
      body: request.query,
    };

    console.log(options);

    const response: T[] = await fetch(baseUrl + request.endpoint, {
      ...options,
      next: { revalidate: 300 }, //5minute cache
    }).then((res) => {
      if (res.status == 401) {
        throw new Error(`${res.status} : ${res.statusText}`);
      } else {
        return res.json();
      }
    });

    return response[0]; //IGDB always returns an array.
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

//gets a new token from IGDB
async function Generate_Token() {
  //Check that Client_ID is stored

  if (!process.env.IGDB_CLIENT_ID?.toString())
    throw Error("Client ID Error during Authorization ");
  const Client_Id = process.env.IGDB_CLIENT_ID.toString();
  if (!process.env.IGDB_CLIENT_SECRET?.toString())
    throw Error("Client ID Error during Authorization ");
  const Client_Secret = process.env.IGDB_CLIENT_SECRET.toString();

  const headers = {
    client_id: "eazv8jh64u2brqq6uu8wpud0q88hrp",
    client_secret: Client_Secret,
    grant_type: `client_credentials`,
  };

  const response: Auth_Token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${Client_Id}&client_secret=${Client_Secret}&grant_type=client_credentials`,
    {
      method: "POST",
      next: { revalidate: 5184000 }, //two month long cache
    }
  ).then((res) => res.json());

  return response;
}
