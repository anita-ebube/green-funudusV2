import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    get_absolute_url: string;
    description: string;
    price: string;
    get_image: string;
    get_thumbnail: string;
    stock_quantity: number;
    category_name: string;
    quantity?: number;
}

interface CartState {
    cartProduct: Product[];
}

// Get initial state from localStorage if it exists
const loadCartFromStorage = (): CartState => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : { cartProduct: [] };
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return { cartProduct: [] };
    }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.cartProduct.find(
                (item) => item.id === action.payload.id
            );

            if (existingProduct) {
                // If product exists, update quantity if provided
                if (action.payload.quantity) {
                    existingProduct.quantity = (existingProduct.quantity || 1) + action.payload.quantity;
                } else {
                    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
                }
            } else {
                // Add new product with quantity
                state.cartProduct.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                });
            }
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.cartProduct = state.cartProduct.filter(
                (item) => item.id !== action.payload.id
            );
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.cartProduct.find(
                (product) => product.id === action.payload.id
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.cartProduct = [];
            // Clear from localStorage
            localStorage.removeItem('cart');
        }
    }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;