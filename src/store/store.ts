// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

import navigationReducer from './slices/navigationSlice';
import modalReducer from './slices/modalSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
	reducer: {
		navigation: navigationReducer, // Add reducers here as you create slices
		modal: modalReducer,
		cart: cartReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
