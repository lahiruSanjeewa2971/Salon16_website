import {createSlice} from '@reduxjs/toolkit'
import { fetchActiveServices, fetchServices } from './serviceThunk';

const initialState = {
    services: [],
    activeServices: [],
    isLoading: false,
    error: null,
}

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        clearServices: (state) => {
            state.services = [];
        },
        clearActiveServices: (state) => {
            state.activeServices = [];
        },
        clearError: (state) => {
            state.error = null;
        },
        // below is a manual update only way for the states without calling the backend.
        // only for UI changes. It's like change local state and seperately call the database via backend to update the db with
        // the new data.

        // It's like updating local cached data.


        // updateServiceInList: (state, action) => {
        //     const updatedService = action.payload;
        //     const index = state.services.findIndex((s) => s.id === updatedService.id);
        //     if (index !== -1) {
        //       state.services[index] = updatedService;
        //     }
            
        //     // Update in activeServices if exists
        //     const activeIndex = state.activeServices.findIndex((s) => s.id === updatedService.id);
        //     if (activeIndex !== -1) {
        //       state.activeServices[activeIndex] = updatedService;
        //     }
            
        //     // Update in popularServices if exists
        //     const popularIndex = state.popularServices.findIndex((s) => s.id === updatedService.id);
        //     if (popularIndex !== -1) {
        //       state.popularServices[popularIndex] = updatedService;
        //     }
        // },
    },

    extraReducers: (builder) => {
        // for RTK, there should be only one extraReducers for a slice.
        // also a single builder,
        // instead of .addCase chain we could have separate helper functions for each main case and send the same builder to each.


        // fetch all active services
        builder
            .addCase(fetchServices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services = action.payload
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // fetch active services
            .addCase(fetchActiveServices.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActiveServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activeServices = action.payload;
            })
            .addCase(fetchActiveServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {
    clearServices,
    clearActiveServices,
    clearError,
} = serviceSlice.actions;

export default serviceSlice.reducer;