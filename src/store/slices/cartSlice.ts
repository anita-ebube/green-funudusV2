// src/store/slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces/interface';

interface CartState {
	cartProduct: ICard[];
}

const initialState: CartState = {
	cartProduct: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICard>) => {
			const product = action.payload;
			// Check if the item already exists in the cart
			const existingItem = state.cartProduct.find((i) => i.productName === product.productName);

			if (existingItem) {
				// If item exists, update the quantity
				return;
			} else {
				// If item doesn't exist, add it to the cart
				state.cartProduct.push(product);
			}
		},
		removeFromCart: (state, action: PayloadAction<ICard>) => {
			state.cartProduct = state.cartProduct.filter(
				(product) => product.productName !== action.payload.productName
			);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
