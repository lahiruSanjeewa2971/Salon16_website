import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories, fetchActiveCategories } from './categoryThunk';

const initialState = {
    categories: [],
    activeCategories: [],
    isLoading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCategories: (state) => {
            state.categories = [];
        },
        clearActiveCategories: (state) => {
            state.activeCategories = [];
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchActiveCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActiveCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activeCategories = action.payload;
                // Also update categories for backward compatibility
                state.categories = action.payload;
            })
            .addCase(fetchActiveCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCategories, clearError } = categorySlice.actions;
export default categorySlice.reducer;

