import { FiltersQueryParams } from "@/app/collections/[collectionHandle]/page";
import {  getCollectionProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const params = new URL(request.url).searchParams;
  console.log(params)
  const data = await getCollectionProducts({
    variables: {
      pageBy: 2,
      cursor: params.get("cursor") ?? null,
      filters: [],
      sortKey: params.get("sortkey") ?? 'RELEVANCE',
      handle: params.get("handle") ?? '',
    },
  });
  console.log(data)
  return NextResponse.json({
    products: data.body.data.collection.products.nodes,
    pageInfo: data.body.data.collection.products.pageInfo,
  });
}
