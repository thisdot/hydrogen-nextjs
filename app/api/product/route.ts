import { getProduct } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const handle = new URL(request.url).pathname;
  console.log('====================================');
  console.log(handle);
  console.log('====================================');
  // const data = await getProduct(handle);
  // return NextResponse.json({
  //   products: data.body.data.products.nodes,
  //   pageInfo: data.body.data.products.pageInfo,
  // });
}
