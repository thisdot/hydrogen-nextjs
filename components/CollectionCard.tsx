import { Link } from "./Link"
import Image from "next/image"
import { Heading } from "./Text"
// Fix this any type once Product Card ticket is merged
const CollectionCard = (collection: any) => {
  return (<Link key={collection.id} href={`/collections/${collection.handle}`}>
    <div className="grid gap-4">
      <div className="card-image bg-primary/5 aspect-[3/2]">
        {collection?.image && (
          <Image
            alt={`Image of ${collection.title}`}
            src={collection.image.url}
            sizes="(max-width: 32em) 100vw, 33vw"
            fill
          />
        )}
      </div>
      <Heading size="copy">{collection.title}</Heading>
    </div>
  </Link>)
}