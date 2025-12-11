import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/firestore/authService";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const user = await authService.login(email, password);
            const userData = await authService.getUserData(user.uid);

            return {
                id: user.uid,
                email: user.email || '',
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
                displayName: userData?.displayName || user.displayName || '',
                photoURL: userData?.photoURL || user.photoURL || '',
                role: userData?.role || 'user',
                isAdmin: userData?.isAdmin || false,
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({email, password, firstName, lastName}, {rejectWithValue}) => {
        try {
            const user = await authService.register(email, password, firstName, lastName);
            const userData = await authService.getUserData(user.uid);

            return {
                id: user.uid,
                email: user.email || '',
                firstName: userData?.firstName || firstName || '',
                lastName: userData?.lastName || lastName || '',
                displayName: userData?.displayName || `${firstName || ''} ${lastName || ''}`.trim() || '',
                photoURL: userData?.photoURL || user.photoURL || '',
                role: userData?.role || 'user',
                isAdmin: userData?.isAdmin || false,
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await authService.logout();
            return null;
        } catch (error) {
            return rejectWithValue(error.message || "Logout failed.")
        }
    }
)

// check auth state
export const checkAuthState = createAsyncThunk(
    'auth/checkAuthState',
    async (user, {rejectWithValue}) => {
        try {
            if(!user){
                return null;
            }

            const userData = await authService.getUserData(user.uid);

            return {
                id: user.uid,
                email: user.email,
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
                displayName: userData?.displayName || user.displayName || '',
                photoURL: userData?.photoURL || user.photoURL || '',
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to check auth state.')
        }
    }
)