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
    'services/fetchActiveServices',
    async(_, {rejectWithValue}) => {
        try {
            const services = await serviceService.getActiveServices();
            console.log("services from thunk", services);
            return services;
        } catch (error) {
            console.error("fetchActiveServices thunk - Error caught:", error);
            console.error("Error details:", {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            
            // Check for index error specifically
            if (error.code === 'failed-precondition') {
                console.error("⚠️ Firestore composite index required!");
            }
            
            return rejectWithValue(error.message || 'Failed to fetch active services');
        }
    }
)