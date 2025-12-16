import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

const CATEGORY_COLLECTION = "categories";

// Helper function to convert Firestore Timestamps to JavaScript Dates
const convertTimestamps = (data) => {
    const converted = { ...data };
    Object.keys(converted).forEach(key => {
        // Check if the value is a Firestore Timestamp
        if (converted[key] && typeof converted[key].toDate === 'function') {
            converted[key] = converted[key].toDate();
        }
        // Handle nested objects
        else if (converted[key] && typeof converted[key] === 'object' && !Array.isArray(converted[key])) {
            converted[key] = convertTimestamps(converted[key]);
        }
    });
    return converted;
};

export const categoryService = {
    // Get all categories from firestore
    getAllCategories: async () => {
        try {
            const categoryRef = collection(db, CATEGORY_COLLECTION);
            const q = query(categoryRef, orderBy('name', 'asc'));
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...convertTimestamps(data),
                };
            });
        } catch (error) {
            console.error("Error in getAllCategories:", error);
            throw error;
        }
    },

    // Get only active categories from firestore
    getActiveCategories: async () => {
        try {
            const categoryRef = collection(db, CATEGORY_COLLECTION);
            // Try to query with isActive filter and orderBy
            try {
                const q = query(
                    categoryRef,
                    where('isActive', '==', true),
                    orderBy('name', 'asc')
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
                    console.warn('Collection: categories');
                    console.warn('Fields: isActive (Ascending), name (Ascending)');
                    
                    // Fallback: Get all categories and filter in memory
                    const allCategories = await categoryService.getAllCategories();
                    const activeCategories = allCategories.filter(cat => cat.isActive === true);
                    // Sort by name
                    activeCategories.sort((a, b) => {
                        const nameA = a.name?.toLowerCase() || '';
                        const nameB = b.name?.toLowerCase() || '';
                        return nameA.localeCompare(nameB);
                    });
                    return activeCategories;
                }
                throw indexError;
            }
        } catch (error) {
            console.error("Error in getActiveCategories:", error);
            throw error;
        }
    },
};

