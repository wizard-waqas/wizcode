import '../styles/globals.css'
import { Toaster } from "react-hot-toast";
import {useUserData} from "../lib/hooks";
import {UserContext} from "../lib/context";
import Navbar from "../components/Navbar";
import React from "react";

function MyApp({Component, pageProps}) {

    const userData = useUserData()

    return (
        <UserContext.Provider value={ userData }>
            <Navbar/>
            <Component {...pageProps} />
            <Toaster/>
        </UserContext.Provider>
    )
}

export default MyApp
