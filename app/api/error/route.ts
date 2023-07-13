import { getFeaturedProducts, getFeaturedCollections } from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	return NextResponse.json({
		featuredProductsResponse,
		featuredCollectionsResponse,
	});
}
