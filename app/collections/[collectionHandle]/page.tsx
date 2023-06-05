import { PageHeader, Text, Section } from '@/components/Text';
import ProductGrid from '@/components/ProductGrid';
import { Collection, Filter } from '@/lib/shopify/types';
import { SortFilter } from '@/components/SortFilter';
import { getCollectionProducts } from '@/lib/shopify';
import { flattenConnection } from '@/lib/flattenConnection';
import { handleCollectionProductsSearchParams } from '@/lib/handleCollectionProductsSearchParams';

// const seo = seoPayload.collection({ collection, url: request.url });

const PAGINATION_SIZE = 4;

type VariantFilterParam = Record<string, string | boolean>;
type PriceFiltersQueryParam = Record<'price', { max?: number; min?: number }>;
type VariantOptionFiltersQueryParam = Record<
  'variantOption',
  { name: string; value: string }
>;
export type FiltersQueryParams = Array<
  VariantFilterParam | PriceFiltersQueryParam | VariantOptionFiltersQueryParam
>;
export default async function Collection({ params, searchParams }: { params: { collectionHandle: string }, searchParams: any }) {
  // const urlSearchParams = new URLSearchParams(searchParams);

  const { sortKey,
    reverse,
    cursor,
    filters,
    appliedFilters } = handleCollectionProductsSearchParams(searchParams)


  const data = await getCollectionProducts(
    {
      variables: {
        handle: params.collectionHandle,
        pageBy: PAGINATION_SIZE,
        filters,
        sortKey,
        cursor,
        reverse
      }
    }
  );

  const collection = data.body.data.collection;
  const collections = flattenConnection(data.body.data.collections);

  return (
    <>
      <PageHeader heading={collection.title}>
        {collection?.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <Text format width="narrow" as="p" className="inline-block">
                {collection.description}
              </Text>
            </div>
          </div>
        )}
      </PageHeader>
      <Section>
        <SortFilter
          filters={collection.products.filters as Filter[]}
          appliedFilters={appliedFilters}
          collections={collections as Collection[]}
        >
          <ProductGrid
            key={collection.id}
            data-test="product-grid"
            handle={params.collectionHandle}
          />
        </SortFilter>
      </Section>
    </>
  );
}
