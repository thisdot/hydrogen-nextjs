import { getAllProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

const PAGE_BY = 8;

export async function GET(request: NextResponse) {
  const params = new URL(request.url).searchParams;

  const data = await getAllProducts({
    variables: {
      first: PAGE_BY,
      endCursor: params.get("cursor") || undefined,
    },
  });

  console.log(data);
  return NextResponse.json({
    products: data.body.data.products.nodes,
  });
}
