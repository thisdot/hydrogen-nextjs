"use client";
import { IconSearch } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Shop } from "@/lib/shopify/types";

import { useWindowScroll } from "react-use";

function DesktopHeader({ isHome, shop }: { isHome: boolean; shop: Shop }) {
  const { y } = useWindowScroll();

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? "bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader"
          : "bg-contrast/80 text-primary"
      } ${
        !isHome && y > 50 && "shadow-lightHeader"
      } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex gap-12">
        <Link className="font-bold" href="/">
          {shop.name}
        </Link>
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(shop.headerMenu?.items || []).map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={({ isActive }) =>
                isActive ? "pb-1 border-b -mb-px" : "pb-1"
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          method="get"
          action={"/search"}
          className="flex items-center gap-2"
        >
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
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </form>
      </div>
    </header>
  );
}

export default DesktopHeader;
