"use client";
import { Input } from "@/components/Input";
import { PageHeader, Heading } from "@/components/Text";
import useLoadSearchData from "@/hooks/useLoadSearchData";
import { useSearchParam } from "react-use";
import NoSearchResults from "./components/NoSearchResults";
import SearchResult from "./components/SearchResult";

export default function SearchPage() {
  const searchTerm = useSearchParam("q");

  const { products, pageInfo, featuredProducts, featuredCollections } =
    useLoadSearchData();

  return (
    <>
      <PageHeader>
        <Heading as="h1" size="copy">
          Search
        </Heading>
        <form
          method="get"
          action="/search"
          className="relative flex w-full text-heading"
        >
          <Input
            defaultValue={searchTerm}
            name="q"
            placeholder="Search…"
            type="search"
            variant="search"
          />
          <button className="absolute right-0 py-2" type="submit">
            Go
          </button>
        </form>
      </PageHeader>
      {searchTerm === undefined || products.length === 0 ? (
        <NoSearchResults
          featuredProducts={featuredProducts}
          featuredCollections={featuredCollections}
        />
      ) : (
        <SearchResult products={products} pageInfo={pageInfo} />
      )}
    </>
  );
}
