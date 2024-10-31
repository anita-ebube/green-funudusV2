// src/store/slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces/interface';

interface ModalState {
	isModalOpen: boolean;
	modalProduct: ICard | null;
}

const initialState: ModalState = {
	isModalOpen: false,
	modalProduct: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setIsModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isModalOpen = action.payload;
		},
		setModalProduct: (state, action: PayloadAction<ICard | null>) => {
			state.modalProduct = action.payload;
		},
	},
});

export const { setIsModalOpen, setModalProduct } = modalSlice.actions;
export default modalSlice.reducer;
