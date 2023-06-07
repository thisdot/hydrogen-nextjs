import ProductGallery from "@/components/ProductGallery";
import { Heading, Section, Text } from "@/components/Text";

export default  async function Product({ params, searchParams }: { params: { collectionHandle: string }, searchParams: Record<string, string> }) {
    return (
      <>
        <Section className="px-0 md:px-8 lg:px-12">
          <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
            <ProductGallery media={[]} className="w-full lg:col-span-2" />
            <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
              <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
                <div className="grid gap-2">
                  <Heading as="h1" className="whitespace-normal">
                    {/* {title} */}
                  </Heading>
                  {/* {vendor && (
                    <Text className={"opacity-50 font-medium"}>{vendor}</Text>
                  )} */}
                </div>


              </section>
            </div>
          </div>
        </Section>
      </>
    );
  }


  const ProductOptions = () => {

    return (
      null
    );
  }
  