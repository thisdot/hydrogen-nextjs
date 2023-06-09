import { IconBag } from '@/components/Icon';
import clsx from 'clsx';
import { useMemo } from 'react';

function CartCount({
	isHome,
	openCart,
}: {
	isHome: boolean;
	openCart: () => void;
}) {
	const cart: any = {}; // fetch real data here
	console.log(window.location.href);
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
