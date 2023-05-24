import Image from "next/image";
import { Link } from "./Link";
import { Article } from "@/lib/shopify/types";

function ArticleCard({
  blogHandle,
  article,
  loading,
}: {
  blogHandle: string;
  article: Article;
  loading?: HTMLImageElement["loading"];
}) {
  return (
    <Link href={`/${blogHandle}/${article.handle}`}>
      {article.image && (
        <div className="card-image aspect-[3/2]">
          <Image
            alt={article.image.altText || article.title}
            className="object-cover w-full"
            src={article.image.url}
            loading={loading}
            layout="fill"
          />
        </div>
      )}
      <h2 className="mt-4 font-medium">{article.title}</h2>
      <span className="block mt-1">{article.publishedAt}</span>
    </Link>
  );
}

export default ArticleCard;
