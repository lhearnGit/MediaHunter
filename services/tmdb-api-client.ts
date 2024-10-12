import { TMDB_Request, TMDB_Response } from "@/lib/entities/TMDB/index";

const authUrl = "https://api.themoviedb.org/3/authentication";

/*
Endpoints

discover/movie
discover/tv

*/

export class TMDB_Api_Client {
  readonly baseUrl = "https://api.themoviedb.org/3/";
  method: `GET` | `DELETE` | `POST`;
  readonly token: string;
  private isValid: boolean;

  constructor(method: `GET` | `DELETE` | `POST`) {
    const token = process.env.TMDB_READ_TOKEN?.toString();
    if (!token) throw console.log("Error creating api-client, missing token"); //check token is valid
    this.isValid = false; //assume client is always invalid by default

    this.method = method;
    this.token = `Bearer ${token}`;
  }

  async ValidateKey() {
    if (this.isValid) return true; //if the key is valid, skip validation
    const options = {
      method: this.method,
      headers: {
        accept: "application/json",
        Authorization: this.token,
      },
      next: { revalidate: 0 },
    };
    if (!process.env.TMDB_API_KEY?.toString())
      return console.log("Error TMDB API Key Not Found ");
    else {
      //check if key is valid
      const isValid = await fetch(authUrl, options).then((res) => res.json());
      if (isValid.success) {
        this.isValid = true;

        return true;
      } else {
        //refresh token here
        return false;
      }
    }
  }

  //fetch singular details
  async TMDB_Fetch_Details<T>(endpoint: string) {
    const options = {
      method: this.method,
      headers: {
        accept: "application/json",
        Authorization: this.token,
      },
      next: { revalidate: 0 },
    };
    const response: T = await fetch(
      `${this.baseUrl}/${endpoint}`,
      options
    ).then((res) => res.json());

    console.log(`${this.baseUrl}${endpoint}`);
    return { ...response };
  }

  //fetch from endpoints that return paginated data

  async TMDB_Fetch_Pages<T>(request: TMDB_Request) {
    console.log("Fetching.... " + request.endpoint);
    const options = {
      method: this.method,
      headers: {
        accept: "application/json",
        Authorization: this.token,
      },
      next: { revalidate: 0 },
    };
    const response: TMDB_Response<T> = await fetch(
      this.baseUrl + request.endpoint,
      options
    ).then((res) => res.json());

    return { ...response };
  }

  //Fetch list returns an array of objects
  async fetchList(endpoint: string) {
    const options = {
      method: this.method,
      headers: {
        accept: "application/json",
        Authorization: this.token,
      },
      next: { revalidate: 0 },
    };

    console.log(this.baseUrl + endpoint);
    const response = await fetch(this.baseUrl + endpoint, options).then((res) =>
      res.json()
    );

    return response;
  }
}
