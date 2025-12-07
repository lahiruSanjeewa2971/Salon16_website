import {configureStore} from '@reduxjs/toolkit'
// import authReducer from '../features/auth/'
import serviceReducer from '../features/services/serviceSlice'

export const store = configureStore({
    reducer: {
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