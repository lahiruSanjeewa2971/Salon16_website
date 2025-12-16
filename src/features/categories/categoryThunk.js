import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '../../services/firestore/categoryService';

export const fetchAllCategories = createAsyncThunk(
    'categories/fetchAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const categories = await categoryService.getAllCategories();
            return categories;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch categories');
        }
    }
);

export const fetchActiveCategories = createAsyncThunk(
    'categories/fetchActiveCategories',
    async (_, { rejectWithValue }) => {
        try {
            const categories = await categoryService.getActiveCategories();
            return categories;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch active categories');
        }
    }
);

