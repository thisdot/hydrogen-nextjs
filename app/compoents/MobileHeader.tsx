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
        <div className="items-center gap-2 sm:flex"></div>
      </div>

      <div className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full">
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? "h1" : "h2"}
        >
          {shop.name ?? "Shop Name"}
        </Heading>
      </div>

      <div className="flex items-center justify-end w-full gap-4"></div>
    </header>
  );
}

export default MobileHeader;
