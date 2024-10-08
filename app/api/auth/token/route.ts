import { ValidateToken } from "@/services/igdb-api-client";
import { NextRequest, NextResponse } from "next/server";

//Validate and fetch token
//Potentially elevated to middleware function
async function GET(req: NextRequest) {
  const response = await ValidateToken();
  const access_Token = response?.access_token;
  return NextResponse.json({ access_Token }, { status: 200 });
}
