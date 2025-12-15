import { createSlice } from '@reduxjs/toolkit';
import { fetchBookingsByDate, fetchActiveBookingsByDate, createBooking, fetchUserBookings, cancelBooking, deleteBooking } from './bookingThunk';

const initialState = {
    bookingsByDate: {}, // Object with date strings as keys, arrays of bookings as values
    userBookings: [], // Array of all bookings for the logged-in user
    isLoading: false,
    isCreating: false, // Loading state for creating booking
    isDeleting: false, // Loading state for deleting booking
    error: null,
};

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearBookings: (state) => {
            state.bookingsByDate = {};
        },
        clearBookingsForDate: (state, action) => {
            const dateString = action.payload;
            delete state.bookingsByDate[dateString];
        },
    },
    extraReducers: (builder) => {
        // Fetch bookings by date
        builder
            .addCase(fetchBookingsByDate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBookingsByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                const { dateString, bookings } = action.payload;
                state.bookingsByDate[dateString] = bookings;
            })
            .addCase(fetchBookingsByDate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch active bookings by date
            .addCase(fetchActiveBookingsByDate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActiveBookingsByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                const { dateString, bookings } = action.payload;
                state.bookingsByDate[dateString] = bookings;
            })
            .addCase(fetchActiveBookingsByDate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create booking
            .addCase(createBooking.pending, (state) => {
                state.isCreating = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isCreating = false;
                const booking = action.payload;
                const dateString = booking.date;
                
                // Add booking to the bookingsByDate object
                if (!state.bookingsByDate[dateString]) {
                    state.bookingsByDate[dateString] = [];
                }
                state.bookingsByDate[dateString].push(booking);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isCreating = false;
                state.error = action.payload;
            })
            // Fetch user bookings
            .addCase(fetchUserBookings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userBookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Cancel booking
            .addCase(cancelBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                const bookingId = action.payload;
                // Update booking status in userBookings
                const booking = state.userBookings.find(b => b.id === bookingId);
                if (booking) {
                    booking.status = 'cancelled';
                    booking.updatedAt = new Date();
                }
                // Also update in bookingsByDate if it exists
                Object.keys(state.bookingsByDate).forEach(dateString => {
                    const bookingInDate = state.bookingsByDate[dateString].find(b => b.id === bookingId);
                    if (bookingInDate) {
                        bookingInDate.status = 'cancelled';
                        bookingInDate.updatedAt = new Date();
                    }
                });
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete booking
            .addCase(deleteBooking.pending, (state) => {
                state.isDeleting = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isDeleting = false;
                const bookingId = action.payload;
                // Remove booking from userBookings
                state.userBookings = state.userBookings.filter(b => b.id !== bookingId);
                // Also remove from bookingsByDate if it exists
                Object.keys(state.bookingsByDate).forEach(dateString => {
                    state.bookingsByDate[dateString] = state.bookingsByDate[dateString].filter(b => b.id !== bookingId);
                });
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isDeleting = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearBookings, clearBookingsForDate } = bookingSlice.actions;
export default bookingSlice.reducer;

