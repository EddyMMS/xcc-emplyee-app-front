import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string;
    githubId?: number;
    email?: string;
    roles: string[];
    departments: string[];
}

interface AuthState {
    token: string | null;
    user: any | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLoading: false,
    error: null,
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
        loginSuccess(state, action: PayloadAction<{ token: string; username: string; roles: string[]; departments: string[] }>) {
            state.token = action.payload.token;
            state.user = {
                username: action.payload.username,
                roles: action.payload.roles,
                departments: action.payload.departments,
            };
        },
    },
});

export const { setToken, clearToken, setUser, loginSuccess } = authSlice.actions;
export default authSlice.reducer;