import { IGDB_Fetch, IGDB_Request } from "@/services/igdb-api-client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl.searchParams.toString());
  const params = req.nextUrl.searchParams;
  console.log(params.get("page"));
  let page: number | null | string = params.get("page");

  if (!page) page = 0;
  else page = parseInt(page);

  const offset = page;
  const request: IGDB_Request = {
    endpoint: "games",
    query: `
  fields name,cover.url; 
  limit 25; 
  offset ${offset > 1 ? offset * 25 : 0};
  sort rating_count desc;
  count;
  where (themes=[1] & genres=[31]);`,
  };

  const games = await IGDB_Fetch(request);

  console.log(request.query);

  return NextResponse.json({ games, status: 200 });
}
