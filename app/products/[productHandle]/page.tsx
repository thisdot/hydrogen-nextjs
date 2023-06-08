import { IconClose } from "@/components";
import ProductGallery from "@/components/ProductGallery";
import { ProductSwimlane } from "@/components/ProductSwimlane";
import { Heading, Section, Text } from "@/components/Text";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import ProductDetail from "../components/ProductDetails";
import { getExcerpt } from "@/lib/utils";

export default  async function Product({
  params,
  searchParams,
}: {
  params: { productHandle: string };
  searchParams: Record<string, string>;
}) {
  // const searchParams = new URL(request?.url).searchParams;

  const selectedOptions: any[] = [];
  // searchParams.forEach((value, name) => {
  //   selectedOptions.push({ name, value });
  // });
  const { shop, product } = await getProduct(
    params.productHandle,
    selectedOptions
  );

  const { media, title, vendor, descriptionHtml, id } = product;
  console.log('====================================');
  console.log(product.options);
  console.log('====================================');
  const { shippingPolicy, refundPolicy } = shop;
  const relatedProducts = await getProductRecommendations(id);

  return (
    <>
      <Section className="px-0 md:px-8 lg:px-12">
        <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <ProductGallery
            media={media.nodes}
            className="w-full lg:col-span-2"
          />
          <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
              <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal">
                  {title}
                </Heading>
                {vendor && (
                  <Text className={"opacity-50 font-medium"}>{vendor}</Text>
                )}
              </div>

              <div className="grid gap-4 py-4">
                {descriptionHtml && (
                  <ProductDetail
                    title="Product Details"
                    content={descriptionHtml}
                  />
                )}
                {shippingPolicy?.body && (
                  <ProductDetail
                    title="Shipping"
                    content={getExcerpt(shippingPolicy.body)}
                    learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                )}
                {refundPolicy?.body && (
                  <ProductDetail
                    title="Returns"
                    content={getExcerpt(refundPolicy.body)}
                    learnMore={`/policies/${refundPolicy.handle}`}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </Section>
      {relatedProducts && (
        <ProductSwimlane title="Related Products" products={relatedProducts} />
      )}
    </>
  );
}





  const ProductOptions = () => {

    return (
      null
    );
  }
  