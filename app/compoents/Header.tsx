'use client';
import { Link } from '@/components/Link';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { Drawer } from '@/components/Drawer';
import { ShopifyHeaderMenu } from '@/lib/shopify/types';
import { Cart } from '@/components/Cart';
import useAppStore from '@/store/app-store';

function Header({ menu, title, isUser }: { menu: ShopifyHeaderMenu; title: string; isUser: boolean }) {
	const isHome = true;

	return (
		<>
			<CartDrawer />

			<MenuDrawer menu={menu} />

			<DesktopHeader isHome={isHome} title={title} menu={menu} isUser={isUser}/>
			<MobileHeader menu={menu} isHome={isHome} title={title} />
		</>
	);
}

export default Header;

export function MenuDrawer({ menu }: { menu: ShopifyHeaderMenu }) {
	const openMenuDrawer = useAppStore(state => state.openMenuDrawer);
	return (
		<Drawer
			open={openMenuDrawer}
			onClose={() => useAppStore.setState({ openMenuDrawer: false })}
			openFrom="left"
			heading="Menu"
		>
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

function CartDrawer() {
	const openCartDrawer = useAppStore(state => state.openCartDrawer);
	return (
		<Drawer
			open={openCartDrawer}
			onClose={() => useAppStore.setState({ openCartDrawer: false })}
			heading="Cart"
			openFrom="right"
		>
			<div className="grid">
				<Cart layout="drawer" />
			</div>
		</Drawer>
	);
}
