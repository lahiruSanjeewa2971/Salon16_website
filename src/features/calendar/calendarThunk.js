import {createAsyncThunk} from "@reduxjs/toolkit"
import { calendarService } from "../../services/firestore/calendarService";

export const fetchAllSalonHours = createAsyncThunk(
    'calendar/fetchAllSalonHours',
    async(_, {rejectWithValue}) => {
        try {
            const salonHours = await calendarService.getAllSalonHours();
            console.log("salonHours from thunk", salonHours);
            return salonHours;
        } catch (error) {
            console.error("fetchAllSalonHours thunk - Error caught:", error);
            return rejectWithValue(error.message || 'Failed to fetch salon hours');
        }
    }
)