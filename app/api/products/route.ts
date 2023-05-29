import { NextResponse } from "next/server";

export function GET(request: NextResponse) {
  return NextResponse.json({
    message: "Hello from the API!",
  });
}
