import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingService } from '../../services/firestore/bookingService';

export const fetchBookingsByDate = createAsyncThunk(
    'bookings/fetchBookingsByDate',
    async (dateString, { rejectWithValue }) => {
        try {
            const bookings = await bookingService.getBookingsByDate(dateString);
            return { dateString, bookings };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch bookings for date');
        }
    }
);

export const fetchActiveBookingsByDate = createAsyncThunk(
    'bookings/fetchActiveBookingsByDate',
    async (dateString, { rejectWithValue }) => {
        try {
            const bookings = await bookingService.getActiveBookingsByDate(dateString);
            return { dateString, bookings };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch active bookings for date');
        }
    }
);

export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (bookingData, { rejectWithValue }) => {
        try {
            const booking = await bookingService.createBooking(bookingData);
            return booking;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create booking');
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    'bookings/fetchUserBookings',
    async (userId, { rejectWithValue }) => {
        try {
            const bookings = await bookingService.getUserBookings(userId);
            console.log("bookings from thunk", bookings);
            return bookings;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch user bookings');
        }
    }
);

export const cancelBooking = createAsyncThunk(
    'bookings/cancelBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            await bookingService.cancelBooking(bookingId);
            return bookingId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to cancel booking');
        }
    }
);

export const deleteBooking = createAsyncThunk(
    'bookings/deleteBooking',
    async (bookingId, { rejectWithValue }) => {
        try {
            await bookingService.deleteBooking(bookingId);
            return bookingId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete booking');
        }
    }
);

