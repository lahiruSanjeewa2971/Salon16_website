import {createAsyncThunk} from '@reduxjs/toolkit'
import { serviceService } from '../../services/firestore/serviceService';

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async(_, {rejectWithValue}) => {
        try {
            const services = await serviceService.getAllServices();
            return services;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch services');
        }
    }
)

export const fetchActiveServices = createAsyncThunk(
    'services/getchActiveServices',
    async(_, {rejectWithValue}) => {
        try {
            const services = await serviceService.getActiveServices;
            return services;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch active services');
        }
    }
)