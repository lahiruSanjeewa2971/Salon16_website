import { collection, query, where, getDocs, orderBy, serverTimestamp, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';

const BOOKINGS_COLLECTION = 'bookings';
const BOOKING_SUMMARIES_COLLECTION = 'bookingSummaries';

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
    
    // Get all bookings in the collection
    getAllBookings: async () => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const snapshot = await getDocs(bookingsRef);

            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...convertTimestamps(data),
                };
            });
        } catch (error) {
            console.error('Error fetching all bookings:', error);
            throw error;
        }
    },

    // Get active bookings for a specific date (exclude cancelled/rejected)
    getActiveBookingsByDate: async (dateString) => {
        try {
            // Prefer reading from bookingSummaries (lighter, contains time + duration + status)
            const summariesRef = collection(db, BOOKING_SUMMARIES_COLLECTION);
            try {
                const q = query(summariesRef, where('date', '==', dateString));
                const snapshot = await getDocs(q);
                const summaries = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...convertTimestamps(data),
                    };
                });

                // Consider only active statuses (if status missing treat as active)
                const activeSummaries = summaries.filter(s => !s.status || s.status === 'pending' || s.status === 'accepted');
                console.log(`Fetched ${activeSummaries.length} active booking summaries for date ${dateString}`);
                console.log('Active summaries:', activeSummaries);

                // Sort by time
                activeSummaries.sort((a, b) => {
                    const timeA = timeToMinutes(a.time || '00:00');
                    const timeB = timeToMinutes(b.time || '00:00');
                    return timeA - timeB;
                });

                // If we found any summaries, return them
                if (activeSummaries.length > 0) return activeSummaries;
            } catch (summaryError) {
                console.warn('Failed to read from bookingSummaries, falling back to bookings collection:', summaryError);
            }

            // Fallback to original bookings collection query (preserves previous behaviour)
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const q = query(
                bookingsRef,
                where('date', '==', dateString),
                // we avoid 'in' here to reduce index requirements and filter in memory
            );
            const snapshot = await getDocs(q);
            const allBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...convertTimestamps(doc.data()) }));
            const activeBookings = allBookings.filter(booking => booking.status === 'pending' || booking.status === 'accepted');
            activeBookings.sort((a, b) => {
                const timeA = timeToMinutes(a.time || '00:00');
                const timeB = timeToMinutes(b.time || '00:00');
                return timeA - timeB;
            });
            return activeBookings;
        } catch (error) {
            console.error('Error fetching active bookings by date:', error);
            throw error;
        }
    },

    // Create a new booking (also create a compact summary document)
    createBooking: async (bookingData) => {
        try {
            const bookingsRef = collection(db, BOOKINGS_COLLECTION);
            const summariesRef = collection(db, BOOKING_SUMMARIES_COLLECTION);

            const bookingDoc = {
                ...bookingData,
                status: 'pending', // Default status
                rescheduledCount: 0, // Default rescheduled count
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            // Summary document — only the fields you requested
            const summaryDoc = {
                bookingId: null, // will set below using newBookingRef.id
                status: bookingDoc.status,
                customerName: bookingData.customerName || null,
                customerEmail: bookingData.customerEmail || null,
                date: bookingData.date || null,
                categoryId: bookingData.categoryId || null,
                categoryName: bookingData.categoryName || bookingData.categoryName || null,
                serviceDuration: bookingData.serviceDuration || null,
                serviceId: bookingData.serviceId || null,
                serviceName: bookingData.serviceName || null,
                time: bookingData.time || null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            // Use a batch so both documents are written atomically
            const batch = writeBatch(db);
            const newBookingRef = doc(bookingsRef); // auto-id
            const newSummaryRef = doc(summariesRef); // auto-id

            // set bookingId on summary so we can keep them in sync later
            summaryDoc.bookingId = newBookingRef.id;

            batch.set(newBookingRef, bookingDoc);
            batch.set(newSummaryRef, summaryDoc);

            await batch.commit();

            return {
                id: newBookingRef.id,
                ...bookingDoc,
            };
        } catch (error) {
            console.error('Error creating booking (with summary):', error);
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

            // Also update corresponding bookingSummary(s) if any
            try {
                const summariesRef = collection(db, BOOKING_SUMMARIES_COLLECTION);
                const q = query(summariesRef, where('bookingId', '==', bookingId));
                const snapshot = await getDocs(q);
                for (const sDoc of snapshot.docs) {
                    const sRef = doc(db, BOOKING_SUMMARIES_COLLECTION, sDoc.id);
                    await updateDoc(sRef, { status: 'cancelled', updatedAt: serverTimestamp() });
                }
            } catch (syncErr) {
                console.warn('Failed to update booking summary on cancel:', syncErr);
            }

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

            // Also delete corresponding bookingSummary(s)
            try {
                const summariesRef = collection(db, BOOKING_SUMMARIES_COLLECTION);
                const q = query(summariesRef, where('bookingId', '==', bookingId));
                const snapshot = await getDocs(q);
                for (const sDoc of snapshot.docs) {
                    const sRef = doc(db, BOOKING_SUMMARIES_COLLECTION, sDoc.id);
                    await deleteDoc(sRef);
                }
            } catch (syncErr) {
                console.warn('Failed to delete booking summary on delete:', syncErr);
            }

            return bookingId;
        } catch (error) {
            console.error('Error deleting booking:', error);
            throw error;
        }
    },
};

