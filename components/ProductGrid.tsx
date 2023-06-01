'use client'
import { Collection } from '@/lib/shopify/types';
import { Link } from './Link';
import { Grid } from './Grid';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import LoadMoreCollectionProducts from '@/app/collections/components/LoadMoreCollectionProducts';
import { AppliedFilter, SortParam } from './SortFilter';

export default function ProductGrid({
  collection,
  appliedFilters,
  ...props
}: {
  collection: Collection;
  appliedFilters: AppliedFilter[];
  sortKey: string;
  reverse: boolean;
  handle: string
}) {

  const [initialProducts, setInitialProducts] = useState(
    collection?.products?.nodes || [],
  );

  const [products, setProducts] = useState(initialProducts);

  const productProps = collection?.products?.nodes || [];
  if (initialProducts !== productProps) {
    setInitialProducts(productProps);
    setProducts(productProps);
  }


  const haveProducts = initialProducts.length > 0;

  if (!haveProducts) {
    return (
      <>
        <p>No products found on this collection</p>
        <Link href="/products">
          <p className="underline">Browse catalog</p>
        </Link>
      </>
    );
  }

  return (
    <>
      <Grid layout="products" {...props}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </Grid>

      {/* {collection?.products?.pageInfo?.hasNextPage && (
        <LoadMoreCollectionProducts
          appliedFilters={appliedFilters}
          sortKey={props.sortKey}
          reverse={props.reverse}
          handle={props.handle}
          startCursor={collection.products.pageInfo.endCursor}
        />
      )} */}
    </>
  );
}
