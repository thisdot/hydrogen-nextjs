import { Cart } from '@/lib/shopify/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ICartProps {
	cart: Cart | null;
}

const initialState: ICartProps = {
	cart: null,
};

const useCartStore = create(
	devtools<ICartProps>(() => initialState, { name: 'cart-store' })
);
export default useCartStore;
