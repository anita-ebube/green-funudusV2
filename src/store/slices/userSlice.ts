// src/store/slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IUser {
	name: string;
	email?: string;
	password: string;
}

interface UserState {
	user: IUser;
}

const initialState: UserState = {
	user: { name: '', email: '', password: '' },
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
