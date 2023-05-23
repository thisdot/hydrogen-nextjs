import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Heading } from "@/components/Text";
import { Shop } from "@/lib/shopify/types";

function MobileHeader({ isHome, shop }: { isHome: boolean; shop: Shop }) {
  return (
    <header
      role="banner"
      className={`${
        isHome
          ? "bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader"
          : "bg-contrast/80 text-primary"
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <form
          method="get"
          action={"/search"}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            {/* <IconSearch /> */}
          </button>
          <Input
            className={
              isHome
                ? "focus:border-contrast/20 dark:focus:border-primary/20"
                : "focus:border-primary/20"
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        href="/"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? "h1" : "h2"}
        >
          {shop.name}
        </Heading>
      </Link>
    </header>
  );
}

export default MobileHeader;
