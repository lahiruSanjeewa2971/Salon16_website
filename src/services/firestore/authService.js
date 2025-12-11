import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import {collection, doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore'

const USER_COLLECTION = 'users';

export const authService = {
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },

    register: async (email, password, firstName, lastName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Create user document in Firestore with default values
        const userRef = doc(db, USER_COLLECTION, user.uid);
        const displayName = `${firstName || ''} ${lastName || ''}`.trim() || '';
        
        await setDoc(userRef, {
            email,
            firstName: firstName || '',
            lastName: lastName || '',
            displayName: displayName,
            photoURL: null,
            uid: user.uid,
            role: 'customer',
            phone: null,
            profileImage: null,
            isEmailVerified: false,
            adminSettings: {
                canManageCustomers: false,
                canManageServices: false,
                canViewAnalytics: false,
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        // Update user profile
        await updateProfile(user, {
            displayName: displayName,
        });

        return user;
    },

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