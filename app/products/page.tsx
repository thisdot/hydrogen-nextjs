"use server";

import { Button } from "@/components/Button";
import { Grid } from "@/components/Grid";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader, Section } from "@/components/Text";
import { getImageLoadingPriority } from "@/lib/const";
import { getPaginationVariables } from "@/lib/getPaginationVariables";
import { getAllProducts } from "@/lib/shopify";
import { NextPageContext } from "next";

// import { useRouter } from "next/navigation";

const PAGE_BY = 8;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: NextPageContext["query"];
}) {
  // const router = useRouter();
  const data = await getAllProducts({
    variables: getPaginationVariables(searchParams, PAGE_BY),
  });
  return (
    <>
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Pagination connection={data.body}>
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
