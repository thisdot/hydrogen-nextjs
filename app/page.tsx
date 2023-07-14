export const dynamic = 'force-dynamic';
import { Hero } from '../components/Hero';
import { ProductSwimlane } from '@/components/ProductSwimlane';
import { FeaturedCollections } from '@/components/FeaturedCollection';
import {
	getFeaturedCollections,
	getFeaturedProducts,
	getHomepageSeo,
	getSecondaryHero,
	getTertiaryHero,
} from '@/lib/shopify';
import Head from 'next/head';

export default async function Homepage() {
	const seoStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Home page',
	};

	const primaryHero = await getHomepageSeo();
	const featuredProducts = await getFeaturedProducts();
	const secondaryHero = await getSecondaryHero();
	const featuredCollections = await getFeaturedCollections();
	const tertiaryHero = await getTertiaryHero();

	return (
		<>
			<Head>
				<title>Home | This Dot Demo Store</title>
				<meta
					name="description"
					content="The best place to buy snowboarding products offered by This Dot"
				/>
				<meta name="robots" content="index, follow" />
				<script type="application/ld+json">
					{JSON.stringify(seoStructuredData)}
				</script>
			</Head>
			{primaryHero && (
				<Hero {...primaryHero.body.data.hero} height="full" top />
			)}

			{featuredProducts && featuredProducts.body.data.products.nodes && (
				<ProductSwimlane
					products={featuredProducts.body.data.products.nodes}
					title="Featured Products"
					count={4}
				/>
			)}

			{secondaryHero && <Hero {...secondaryHero.body.data.hero} />}

			{featuredCollections &&
				featuredCollections.body.data.collections.nodes && (
					<FeaturedCollections
						collections={featuredCollections.body.data.collections.nodes}
						title="Collections"
					/>
				)}

			{tertiaryHero && <Hero {...tertiaryHero.body.data.hero} />}
		</>
	);
}
