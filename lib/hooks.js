import {useState, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "./firebase";

export function useUserData(){
    const [user] = useAuthState(auth);

    return { user }
}