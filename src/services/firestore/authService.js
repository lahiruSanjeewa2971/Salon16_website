import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import {collection, doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore'

const USER_COLLECTION = 'users';

export const authService = {
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },

    // register: async ()

    logout: async () => {
        await firebaseSignOut(auth);
    },

    // get user data from firestore
    getUserData: async (userId) => {
        const userRef = doc(db, USER_COLLECTION, userId);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()){
            return {id: userSnap.id, ...userSnap.data()};
        }
        return null;
    },

    // Listen for auth state changes
    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    }
}