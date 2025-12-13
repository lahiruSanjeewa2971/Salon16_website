import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'

const SALON_HOURS_COLLECTION = "salonHours";

// Helper function to convert firestore timestamps to js
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

// Get All salon hours
export const calendarService = {
    getAllSalonHours: async () => {
        const salonHoursRef = collection(db, SALON_HOURS_COLLECTION)
        const newQuery = query(salonHoursRef, orderBy('date', 'asc'));
        const snapshot = await getDocs(newQuery);
        console.log("snapshot of salon hours", snapshot);

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...convertTimestamps(data),
            }
        })
    }
}