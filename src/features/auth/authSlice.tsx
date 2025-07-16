import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string;
    githubId: number;
    email: string;
    roles: string[];
    departments: string[];
}

interface AuthState {
    token: string | null;
    user: any | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            },
        clearToken(state){
        state.token = null;
        state.user = null;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            },
        },
    });

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;