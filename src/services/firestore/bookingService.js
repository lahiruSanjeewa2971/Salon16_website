import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const BOOKINGS_COLLECTION = 'bookings';

// Helper function to convert time string to minutes
const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to convert Firestore Timestamps to JavaScript Dates
const convertTimestamps = (data) => {
    const converted = { ...data };
    Object.keys(converted).forEach(key => {
        if (converted[key] && typeof converted[key].toDate === 'function') {
            converted[key] = converted[key].toDate();
        }
        else if (converted[key] && typeof converted[key] === 'object' && !Array.isArray(converted[key])) {
            converted[key] = convertTimestamps(converted[key]);
        }
    });
    return converted;
};

export const bookingService = {
    // Get bookings for a specific date
    getBookingsByDate: async (dateString) => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const q = query(
                bookingsRef,
                where('date', '==', dateString),
                // orderBy('time', 'asc')
            );
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...convertTimestamps(data),
                };
            });
        } catch (error) {
            console.error('Error fetching bookings by date:', error);
            throw error;
        }
    },

    // Get active bookings for a specific date (exclude cancelled/rejected)
    getActiveBookingsByDate: async (dateString) => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            // Try composite query first
            try {
                const q = query(
                    bookingsRef,
                    where('date', '==', dateString),
                    where('status', 'in', ['pending', 'accepted']),
                    // orderBy('time', 'asc')
                );
                const snapshot = await getDocs(q);
                
                return snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...convertTimestamps(data),
                    };
                });
            } catch (indexError) {
                // If composite index doesn't exist, fallback to simpler query
                if (indexError.code === 'failed-precondition') {
                    console.warn('Composite index not ready. Using fallback query...');
                    console.warn('Please create a composite index in Firebase Console:');
                    console.warn('Collection: bookings');
                    console.warn('Fields: date (Ascending), status (Ascending), time (Ascending)');
                    const indexLink = indexError.message.match(/https:\/\/[^\s]+/)?.[0];
                    if (indexLink) {
                        console.warn('Direct link to create index:', indexLink);
                    }
                    
                    // Fallback: Get all bookings for date and filter in memory
                    const allBookings = await bookingService.getBookingsByDate(dateString);
                    const activeBookings = allBookings.filter(booking => 
                        booking.status === 'pending' || booking.status === 'accepted'
                    );
                    // Sort by time
                    activeBookings.sort((a, b) => {
                        const timeA = timeToMinutes(a.time);
                        const timeB = timeToMinutes(b.time);
                        return timeA - timeB;
                    });
                    return activeBookings;
                }
                throw indexError;
            }
        } catch (error) {
            console.error('Error fetching active bookings by date:', error);
            throw error;
        }
    },

    // Create a new booking
    createBooking: async (bookingData) => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const bookingDoc = {
                ...bookingData,
                status: 'pending', // Default status
                rescheduledCount: 0, // Default rescheduled count
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            const docRef = await addDoc(bookingsRef, bookingDoc);
            return {
                id: docRef.id,
                ...bookingDoc,
            };
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    // Get all bookings for a specific user
    getUserBookings: async (userId) => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const q = query(
                bookingsRef,
                where('customerId', '==', userId),
                orderBy('createdAt', 'desc')
            );
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...convertTimestamps(data),
                };
            });
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            // If index doesn't exist, fallback to simpler query
            if (error.code === 'failed-precondition') {
                console.warn('Composite index not ready. Using fallback query...');
                const allBookingsRef = collection(db, BOOKINGS_COLLECTION);
                const allSnapshot = await getDocs(allBookingsRef);
                const allBookings = allSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...convertTimestamps(data),
                    };
                });
                // Filter by userId and sort in memory
                const userBookings = allBookings.filter(booking => booking.customerId === userId);
                userBookings.sort((a, b) => {
                    const aTime = a.createdAt?.getTime?.() || a.createdAt || 0;
                    const bTime = b.createdAt?.getTime?.() || b.createdAt || 0;
                    return bTime - aTime; // Descending order
                });
                return userBookings;
            }
            throw error;
        }
    },

    // Cancel a booking (update status to 'cancelled')
    cancelBooking: async (bookingId) => {
        try {
            const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
            await updateDoc(bookingRef, {
                status: 'cancelled',
                updatedAt: serverTimestamp(),
            });
            return bookingId;
        } catch (error) {
            console.error('Error cancelling booking:', error);
            throw error;
        }
    },

    // Delete a booking (remove from Firestore)
    deleteBooking: async (bookingId) => {
        try {
            const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
            await deleteDoc(bookingRef);
            return bookingId;
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw error;
        }
    },
};

