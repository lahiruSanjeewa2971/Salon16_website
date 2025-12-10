import { createSlice } from "@reduxjs/toolkit";
import { checkAuthState, loginUser, logoutUser } from "./authThunk";

const initialState = {
    user: null,
    isLoading: false,
    isInitialized: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setInitialized: (state, action) => {
            console.log("Setting initialized to", action.payload);
            state.isInitialized = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkAuthState.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
                state.isInitialized = true;
            })
            .addCase(checkAuthState.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload;
                state.isInitialized = true;
            })
    }
})

export const { clearError, setInitialized } = authSlice.actions;
export default authSlice.reducer;