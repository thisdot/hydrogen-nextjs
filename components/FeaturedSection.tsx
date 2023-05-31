import { FeaturedCollections } from "./FeaturedCollection";
import { ProductSwimlane } from "./ProductSwimlane";

interface Iprops {
  featuredCollections: any[];
  featuredProducts: any[];
}
export function FeaturedSection({ featuredCollections = [], featuredProducts = [] }: Iprops) {
  
  return (
    <>
      {(featuredCollections.length < 4 && featuredCollections.length !== 0) && (
        <FeaturedCollections
          title="Popular Collections"
          collections={featuredCollections}
        />
      )}
      <ProductSwimlane products={featuredProducts} />
    </>
  );
}
