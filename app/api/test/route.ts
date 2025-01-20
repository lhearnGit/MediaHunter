import {
  TMDB_Fetch_Details,
  TMDB_Fetch_Pages,
} from "@/services/tmdb-api-client-v2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await TMDB_Fetch_Pages({ endpoint: "movie/popular" });
  return NextResponse.json(data, { status: 200 });
}
