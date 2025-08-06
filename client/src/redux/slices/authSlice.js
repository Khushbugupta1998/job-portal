import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    role: null, // for role-based routing later
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true,
                state.user = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer