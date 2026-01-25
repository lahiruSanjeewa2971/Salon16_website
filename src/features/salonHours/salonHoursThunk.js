import { createAsyncThunk } from "@reduxjs/toolkit";
import { salonHoursService } from "../../services/firestore/salonHoursService";

export const fetchSalonHours = createAsyncThunk(
    'salonHours/fetchSalonHours',
    async (_, {rejectWithValues}) => {
        try {
            const salonHours = await salonHoursService.getSalonHours();
            return salonHours;
        } catch (error) {
            return rejectWithValues(error.message || 'Failed to fetch salon hours');
        }
    }
)