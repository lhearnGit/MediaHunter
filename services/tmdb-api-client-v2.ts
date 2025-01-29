export interface TMDB_Response<T> {
  page?: number;
  results?: T[];
  total_pages?: number;
  total_results?: number;
}
export interface TMDB_Request {
  endpoint: string;
  id?: number;
}

const baseUrl = "https://api.themoviedb.org/3/";

export async function TMDB_Fetch_Details<T>(req: TMDB_Request) {
  const token = process.env.TMDB_READ_TOKEN?.toString();

  if (!token) throw console.log("Error creating api-client, missing token"); //check token is valid
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 600 }, //cache time of 10 minutes
  };
  const response: T = await fetch(`${baseUrl}/${req.endpoint}`, options).then(
    (res) => res.json()
  );

  return { ...response };
}

export async function TMDB_Fetch_Pages<T>(request: TMDB_Request) {
  const token = process.env.TMDB_READ_TOKEN?.toString();
  if (!token) throw console.log("Error creating api-client, missing token"); //check token is valid
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 }, //cache time of 1 hour
  };

  const response: TMDB_Response<T> = await fetch(
    baseUrl + request.endpoint,
    options
  ).then((res) => res.json());

  return { ...response };
}

//Cache time is set to 1 week as the current uses have very low chance of changing values, year,countries, genres
export async function TMDB_Fetch_List(endpoint: string) {
  const token = process.env.TMDB_READ_TOKEN?.toString();
  if (!token) throw console.log("Error creating api-client, missing token"); //check token is valid
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 604800,
    }, //cache time of 1 Week
  };
  const response = await fetch(baseUrl + endpoint, options).then((res) =>
    res.json()
  );

  return response;
}
