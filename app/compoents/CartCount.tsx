import { IconBag } from '@/components/Icon';
import useCartFetcher from '@/hooks/useCartFetcher';
import useCartStore from '@/store/cart-store';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useCookie } from 'react-use';

function CartCount({
	isHome,
	openCart,
}: {
	isHome: boolean;
	openCart: () => void;
}) {
	const [cookie, setCookie] = useCookie('cartId');
	const { getStoreCart } = useCartFetcher();
	const cart = useCartStore(state => state.cart);

	useEffect(() => {
		// If cart not created
		if (!cookie) {
			const createCart = async () => {
				const response = await fetch(`/api/create-cart`, {
					method: 'POST',
				});
				if (response.status === 200) {
					const data = await response.json();
					setCookie(data.cart.id, {
						path: '/',
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
					});
				} else {
					console.error(response.statusText);
				}
			};

			createCart();
		}
	}, []);

	useEffect(() => {
		if (cookie) {
			getStoreCart();
		}
	}, [cookie]);

	return (
		<Badge dark={isHome} openCart={openCart} count={cart?.totalQuantity || 0} />
	);
}

function Badge({
	openCart,
	dark,
	count,
}: {
	count: number;
	dark: boolean;
	openCart: () => void;
}) {
	const BadgeCounter = useMemo(
		() => (
			<>
				<IconBag />
				<div
					className={clsx(
						'absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px',
						{
							'text-primary bg-contrast dark:text-contrast dark:bg-primary':
								dark,
							'text-contrast bg-primary': !dark,
						}
					)}
				>
					<span>{count || 0}</span>
				</div>
			</>
		),
		[count, dark]
	);

	return (
		<button
			onClick={openCart}
			className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
		>
			{BadgeCounter}
		</button>
	);
}

export default CartCount;
