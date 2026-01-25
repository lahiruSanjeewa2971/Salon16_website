import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const SALONHOURS_COLLECTION = 'salonHours';

export const salonHoursService = {
    // Get salon hours for all days
    getSalonHours: async () => {
        try {
            const salonHoursRef = collection(db, SALONHOURS_COLLECTION);
            const snapshot = await getDocs(salonHoursRef);

            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                };
            });
        } catch (error) {
            console.error('Error fetching salon hours:', error);
            throw error;
        }
    }
}