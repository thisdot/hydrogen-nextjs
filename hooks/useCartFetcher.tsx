import { CartItem } from '@/lib/shopify/types';
import useCartStore from '@/store/cart-store';
import { cookies } from 'next/headers';
import { useCookie } from 'react-use';

const useCartFetcher = () => {
	// const cartId = cookies().get("cartId")?.value;
	// If cart not created
	// if (!cartId) {
	//   const createCart = async () => {
	//     const response = await fetch(`/api/create-cart`, {
	//       method: "POST",
	//     });
	//     if (response.status === 200) {
	//       const data = await response.json();
	//       setCookie(data.cart.id, {
	//         path: "/",
	//         sameSite: "strict",
	//         secure: process.env.NODE_ENV === "production",
	//       });
	//     }
	//   };

	//   createCart();
	// }

	const getStoreCart = async () => {
		const response = await fetch(`/api/cart`, {
			method: 'GET',
		});
		if (response.status === 200) {
			const data = await response.json();
			useCartStore.setState({ cart: data.cart });
		}
	};

	const addCatItem = async ({ variantId }: { variantId: string }) => {
		const response = await fetch(`/api/cart`, {
			method: 'POST',
			body: JSON.stringify({
				merchandiseId: variantId,
			}),
		});

		if (response.status === 204) {
			getStoreCart();
		}
	};

	const editCartItem = async ({
		action,
		item,
	}: {
		action: 'plus' | 'minus';
		item: CartItem;
	}) => {
		const response = await fetch(`/api/cart`, {
			method: action === 'minus' && item.quantity - 1 === 0 ? 'DELETE' : 'PUT',
			body: JSON.stringify({
				lineId: item.id,
				variantId: item.merchandise.id,
				quantity: action === 'plus' ? item.quantity + 1 : item.quantity - 1,
			}),
		});

		if (response.status === 204) {
			getStoreCart();
		}
	};

	const deleteCartItem = async ({ item }: { item: CartItem }) => {
		const response = await fetch(`/api/cart`, {
			method: 'DELETE',
			body: JSON.stringify({
				lineId: item.id,
			}),
		});

		if (response.status === 204) {
			getStoreCart();
		}
	};

	return { editCartItem, getStoreCart, deleteCartItem, addCatItem };
};

export default useCartFetcher;
