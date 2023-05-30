"use server";
import { Grid } from "@/components/Grid";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader, Section } from "@/components/Text";
import { getAllProducts } from "@/lib/shopify";
import LoadMoreProducts from "./components/LoadMoreProducts";

const PAGE_BY = 8;

export default async function ProductsPage() {
  const data = await getAllProducts({
    variables: {
      first: PAGE_BY,
    },
  });

  return (
    <>
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Grid>
          {data.body.data.products.nodes.map((product, i) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        {data.body.data.products.pageInfo.hasNextPage && (
          <LoadMoreProducts
            startCursor={data.body.data.products.pageInfo.endCursor}
          />
        )}
      </Section>
    </>
  );
}
