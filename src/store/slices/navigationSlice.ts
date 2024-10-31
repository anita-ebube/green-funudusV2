// src/store/slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
	activePage: string;
	isOpen: boolean;
}

const initialState: NavigationState = {
	activePage: 'Home', // default page
	isOpen: false,
};

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setActivePage: (state, action: PayloadAction<string>) => {
			state.activePage = action.payload;
		},
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { setActivePage, setIsOpen } = navigationSlice.actions;
export default navigationSlice.reducer;
