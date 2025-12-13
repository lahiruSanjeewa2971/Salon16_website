import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase'

const SERVICE_COLLECTION = "services";

// Helper function to convert Firestore Timestamps to JavaScript Dates
const convertTimestamps = (data) => {
    const converted = { ...data };
    Object.keys(converted).forEach(key => {
        // Check if the value is a Firestore Timestamp
        if (converted[key] && typeof converted[key].toDate === 'function') {
            converted[key] = converted[key].toDate();
        }
        // Handle nested objects (like category)
        else if (converted[key] && typeof converted[key] === 'object' && !Array.isArray(converted[key])) {
            converted[key] = convertTimestamps(converted[key]);
        }
    });
    return converted;
};

export const serviceService = {
    // Get all services from firestore
    getAllServices: async () => {
        const serviceRef = collection(db, SERVICE_COLLECTION);
        const newQuery = query(serviceRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(newQuery);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...convertTimestamps(data),
            };
        });
    },

    // Get active services from firestore
    getActiveServices: async () => {
        try {
            const serviceRef = collection(db, SERVICE_COLLECTION);
            
            const newQuery = query(
                serviceRef,
                where('isActive', '==', true),
                // orderBy('createdAt', 'desc'),
            );

            const snapshot = await getDocs(newQuery);
            
            const services = snapshot.docs.map((doc) => {
                const data = doc.data();
                return { 
                    id: doc.id, 
                    ...convertTimestamps(data)
                };
            });
            
            return services;
        } catch (error) {
            console.error("Error in getActiveServices:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            throw error; // Re-throw to be caught by thunk
        }
    }
}