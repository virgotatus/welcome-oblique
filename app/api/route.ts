import { NextRequest, NextResponse } from "next/server";
import { parseTally, processTally } from "@/actions/ling"

export async function POST(request: NextRequest) {
  const body = await request.json();

  const tally = parseTally(body);
  const job = processTally(tally).then(() => {
    console.log("finish processing Tally!");
  });
  return NextResponse.json({ status: 200 });
}

export function GET(request: NextRequest) {
  return NextResponse.json({ hello: "hello" });
}