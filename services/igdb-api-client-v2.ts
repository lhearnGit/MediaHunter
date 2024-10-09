import { IGDB_Request } from "./igdb-api-client";

export class IGDB_API_CLIENT {
  private baseUrl = "https://api.igdb.com/v4/";
  private client_id: string;
  private access_token: string;

  constructor() {
    if (!process.env.IGDB_CLIENT_ID?.toString())
      throw console.log("CLIENT ID ERROR - FATAL");
    this.access_token = "c3b3b2ycuo2ygyovb95p9x1o7g38yk";
    this.client_id = process.env.IGDB_CLIENT_ID.toString();
    console.log(this.client_id);
    console.log(this.access_token);
  }

  async IGDB_Fetch(request: IGDB_Request) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": this.client_id,
        Authorization: `Bearer ${this.access_token}`,
      },
      body: request.query,
    };
    return await fetch(this.baseUrl + request.endpoint, { ...options });
  }
}
