import { useEffect } from "react";
import {useAppDispatch} from "../../store/hooks"
import { authService } from "../../services/firestore/authService";
import { checkAuthState } from "../../features/auth/authThunk";
import { setInitialized } from "../../features/auth/authSlice";

const AuthInitializer = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(checkAuthState(user));
            } else{
                dispatch(setInitialized(true));
            }
        })
        return () => unsubscribe();
    },[dispatch])

    return null;
}

export default AuthInitializer;