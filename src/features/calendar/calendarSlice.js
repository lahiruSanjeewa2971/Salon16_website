import { createSlice } from "@reduxjs/toolkit"
import { fetchAllSalonHours } from "./calendarThunk";

const initialState = {
    salonHours: [],
    salonHoursByDate: {},
    isLoading: false,
    error: null,
    lastFetch: null,
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSalonHours: (state) => {
            state.salonHours = [];
            state.salonHoursByDate = {};
            state.lastFetch = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSalonHours.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllSalonHours.fulfilled, (state, action) => {
                state.isLoading = false;
                state.salonHours = action.payload;
                state.lastFetch = Date.now().toString();
                
                // Create a lookup object for quick date-based access
                state.salonHoursByDate = {};
                action.payload.forEach((hour) => {
                    if (hour.id) {
                        state.salonHoursByDate[hour.id] = hour;
                    }
                });
            })
            .addCase(fetchAllSalonHours.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { clearError, clearSalonHours } = calendarSlice.actions;
export default calendarSlice.reducer;