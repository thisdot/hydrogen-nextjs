import { Button } from "@/components/Button";
import { Grid } from "@/components/Grid";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader, Section } from "@/components/Text";
import { getImageLoadingPriority } from "@/lib/const";

export default function ProductsPage() {
  return (
    <>
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Pagination connection={products}>
          {({
            endCursor,
            hasNextPage,
            hasPreviousPage,
            nextPageUrl,
            nodes,
            prevPageUrl,
            startCursor,
            nextLinkRef,
            isLoading,
          }) => {
            const itemsMarkup = nodes.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={getImageLoadingPriority(i)}
              />
            ));

            return (
              <>
                {hasPreviousPage && (
                  <div className="flex items-center justify-center mt-6">
                    <Button
                      to={prevPageUrl}
                      variant="secondary"
                      prefetch="intent"
                      width="full"
                      disabled={!isLoading}
                      state={{
                        pageInfo: {
                          endCursor,
                          hasNextPage,
                          startCursor,
                        },
                        nodes,
                      }}
                    >
                      {isLoading ? "Loading..." : "Previous"}
                    </Button>
                  </div>
                )}
                <Grid data-test="product-grid">{itemsMarkup}</Grid>
                {hasNextPage && (
                  <div className="flex items-center justify-center mt-6">
                    <Button
                      ref={nextLinkRef}
                      to={nextPageUrl}
                      variant="secondary"
                      prefetch="intent"
                      width="full"
                      disabled={!isLoading}
                      state={{
                        pageInfo: {
                          endCursor,
                          hasPreviousPage,
                          startCursor,
                        },
                        nodes,
                      }}
                    >
                      {isLoading ? "Loading..." : "Next"}
                    </Button>
                  </div>
                )}
              </>
            );
          }}
        </Pagination>
      </Section>
    </>
  );
}
