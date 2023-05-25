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

export default async function Homepage() {

  const primaryHero = await getHomepageSeo()
  const featuredProducts = await getFeaturedProducts()
  const secondaryHero = await getSecondaryHero()
  const featuredCollections = await getFeaturedCollections()
  const tertiaryHero = await getTertiaryHero()


  return (
    <>
      {primaryHero && (
        <Hero {...primaryHero.body.data.hero} height="full" top loading="eager" />
      )}

      {featuredProducts && featuredProducts.body.data.products.nodes && (
        <ProductSwimlane
          products={featuredProducts.body.data.products.nodes}
          title="Featured Products"
          count={4}
        />
      )}

      {secondaryHero && (
        <Hero {...secondaryHero.body.data.hero} />
      )}

      {featuredCollections && featuredCollections.body.data.collections.nodes && (
        <FeaturedCollections
          collections={featuredCollections.body.data.collections.nodes}
          title="Collections"
        />
      )}

      {tertiaryHero && (
        <Hero {...tertiaryHero.body.data.hero} />
      )}
    </>
  );
};
