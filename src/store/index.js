import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import serviceReducer from '../features/services/serviceSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        services: serviceReducer,
    },
    
    // below is to ignore the serializable check for the persist/PERSIST action.
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['persist/PERSIST'],
            }
        })
})