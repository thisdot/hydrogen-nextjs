import { PageHeader, Section } from "@/components/Text";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

export default async function JournalHandlePage() {
  return (
    <>
      <PageHeader heading="Blog post title" variant="blogPost">
        <span>Date here &middot; auther name here</span>
      </PageHeader>

      <Section as="article" padding="x">
        {/* {image && (
          <Image
            src={image}
            className="w-full mx-auto mt-8 md:mt-16 max-w-7xl"
            sizes="90vw"
            loading="eager"
          />
        )} */}
        <div className="article">
          {/* @ts-expect-error Server Component */}
          <MDXRemote
            source={`
        # Hello, world!
        `}
          />
        </div>
      </Section>
    </>
  );
}
