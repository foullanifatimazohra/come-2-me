// /app/api/categories/route.ts (Next.js 13+ app router)
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://74.50.97.6:8080/api/categories/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}
