import { notFound } from "next/navigation";

export interface IGDB_Request {
  endpoint: string;
  query: string;
}
interface Auth_Token {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
}

const baseUrl = "https://api.igdb.com/v4/";

export async function IGDB_Fetch<T>(
  request: IGDB_Request,
  cache_timer?: number
) {
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
      next: { revalidate: cache_timer ? cache_timer : 3600 }, // default 1 hour cache on searches
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} : ${res.statusText} `);
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

    console.log(token.access_token);
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
      if (!res.ok) {
        throw new Error(`${res.status} : ${res.statusText}`);
      } else {
        return res.json();
      }
    });

    return response[0]; //IGDB always returns an array.
  } catch (error) {
    console.error(error);
    return notFound();
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

  const response: Auth_Token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${Client_Id}&client_secret=${Client_Secret}&grant_type=client_credentials`,
    {
      method: "POST",
      next: { revalidate: 5184000 }, //two month long cache
    }
  ).then((res) => res.json());

  return response;
}
