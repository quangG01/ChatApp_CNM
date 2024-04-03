import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("accessToken");
        },
    }
})

export const { setUser, stopLoading, logout } = slice.actions;
export default slice.reducer;
