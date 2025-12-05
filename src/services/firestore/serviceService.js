import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebase'

const SERVICE_COLLECTION = "services";

export const serviceService = {
    // Get all services from firestore
    getAllServices: async () => {
        const serviceRef = collection(db, SERVICE_COLLECTION);
        const newQuery = query(serviceRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(newQuery);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    },

    // Get active services from firestore
    getActiveServices: async () => {
        const serviceRef = collection(db, SERVICE_COLLECTION);
        const newQuery = query(
            serviceRef,
            where('isActive', '==', true),
            orderBy('createdAt', 'desc'),
        );
        const snapshot = await getDocs(newQuery);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
}