'use client';

import { Link } from '@/components/Link';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { Drawer, useDrawer } from '@/components/Drawer';
import { ShopifyHeaderMenu } from '@/lib/shopify/types';

function Header({ menu, title }: { menu: ShopifyHeaderMenu; title: string }) {
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

			<MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />

			<DesktopHeader
				isHome={isHome}
				title={title}
				openCart={openCart}
				menu={menu}
			/>
			<MobileHeader
				menu={menu}
				isHome={isHome}
				title={title}
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
	menu,
}: {
	isOpen: boolean;
	onClose: () => void;
	menu: ShopifyHeaderMenu;
}) {
	return (
		<Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
			<div className="grid">
				<nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
					{/* Top level menu items */}
					{menu.items.map(item => {
						const pathname = new URL(item.url).pathname;
						return (
							<span className="block" key={item.id}>
								<Link
									href={pathname}
									className={({ isActive }) =>
										isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
									}
								>
									{item.title}
								</Link>
							</span>
						);
					})}
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
