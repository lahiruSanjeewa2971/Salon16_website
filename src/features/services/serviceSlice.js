import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    services: [],
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
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const {
    clearServices,
    clearError,
} = serviceSlice.actions;

export default serviceSlice.reducer;