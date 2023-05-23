"use client";

import { Link } from "@/components/Link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { Drawer, useDrawer } from "@/components/Drawer";
import { Shop } from "@/lib/shopify/types";
import { Text } from "@/components/Text";

function Header({ shop }: { shop: Shop }) {
  //Fake data, remove when real data is available
  const isHome = true;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} />

      <DesktopHeader isHome={isHome} title={shop.name} openCart={openCart} />
      <MobileHeader
        isHome={isHome}
        title={shop.name}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

export default Header;

export function MenuDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
          {/* Top level menu items */}

          <span className="block">
            <Link
              href="/collections"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "pb-1 border-b -mb-px" : "pb-1"
              }
            >
              <Text as="span" size="copy">
                Collections
              </Text>
            </Link>
          </span>

          <span className="block">
            <Link
              href="/products"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "pb-1 border-b -mb-px" : "pb-1"
              }
            >
              <Text as="span" size="copy">
                Products
              </Text>
            </Link>
          </span>

          <span className="block">
            <Link
              href="/journal"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "pb-1 border-b -mb-px" : "pb-1"
              }
            >
              <Text as="span" size="copy">
                Journal
              </Text>
            </Link>
          </span>
        </nav>
      </div>
    </Drawer>
  );
}

function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">Cart</div>
    </Drawer>
  );
}
