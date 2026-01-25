import { createSlice } from '@reduxjs/toolkit';
import { fetchSalonHours } from './salonHoursThunk';

const initialState = {
  salonHours: [],
  isLoading: false,
  error: null,
};

const salonHoursSlice = createSlice({
  name: 'salonHours',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalonHours.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalonHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salonHours = action.payload;
      })
      .addCase(fetchSalonHours.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = salonHoursSlice.actions;
export default salonHoursSlice.reducer;