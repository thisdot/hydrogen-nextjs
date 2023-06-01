import { PageHeader, Section } from "@/components/Text";
import { BLOG_HANDLE } from "@/lib/const";
import { getArticleByHandle } from "@/lib/shopify";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";

export default async function JournalHandlePage({
  params,
}: {
  params: { journalHandle: string };
}) {
  console.log(params);
  const data = await getArticleByHandle({
    variables: {
      articleHandle: params.journalHandle,
      blogHandle: BLOG_HANDLE,
    },
  });

  const content = sanitizeHtml(
    data.body.data.blog.articleByHandle?.contentHtml as string
  );

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
          {/* @ts-expect-error Server component */}
          <MDXRemote source={content} />
        </div>
      </Section>
    </>
  );
}
