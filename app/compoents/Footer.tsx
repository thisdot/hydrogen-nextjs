"use client";

import { Shop, ShopifyFooterMenu } from "@/lib/shopify/types";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { IconCaret } from "@/components/Icon";
import { Suspense } from "react";
import { Link } from "@/components/Link";
import { Heading, Section } from "@/components/Text";

function Footer({ shop }: { shop?: Shop }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menu = shop?.footerMenu as ShopifyFooterMenu;
  const itemsCount = menu?.items?.length || 0;

  return (
    <Section
      divider={isHome ? "none" : "top"}
      as="footer"
      role="contentinfo"
      className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
          bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`}
    >
      <FooterMenu />
      {/* <CountrySelector /> */}
      <div className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-4`}>
        &copy; {new Date().getFullYear()} / This Dot Labs, Inc. Hydrogen Next.js
        13 Template is an MIT Licensed Open Source project.
      </div>
    </Section>
  );
}

const FooterLink = ({ item, href }: { item: string; href: string }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {item}
    </a>
  );
};

function FooterMenu() {
  const styles = {
    section: "grid gap-4",
    nav: "grid gap-2 pb-6",
  };

  return (
    <>
      <section className={styles.section}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="text-left md:cursor-default">
                <Heading className="flex justify-between" size="lead" as="h3">
                  Community
                  <span className="md:hidden">
                    <IconCaret direction={open ? "up" : "down"} />
                  </span>
                </Heading>
              </Disclosure.Button>

              <div
                className={`${
                  open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                } overflow-hidden transition-all duration-300`}
              >
                <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                  <Disclosure.Panel static>
                    <nav className={styles.nav}>
                      <FooterLink item="Link 1" href="https://github.com/" />
                      <FooterLink item="Link 2" href="https://github.com/" />
                      <FooterLink item="Link 3" href="https://github.com/" />
                    </nav>
                  </Disclosure.Panel>
                </Suspense>
              </div>
            </>
          )}
        </Disclosure>
      </section>
    </>
  );
}

export default Footer;
