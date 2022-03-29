import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'
import {Toaster} from "react-hot-toast";
import {useUserData} from "../lib/hooks";
import {UserContext} from "../lib/context";
import NavigationBar from "../components/NavigationBar";
import React from "react";

function MyApp({Component, pageProps}) {

    const userData = useUserData()

    return (
        <UserContext.Provider value={userData}>
            <title>WizCode</title>

            <NavigationBar/>
            <Component {...pageProps} />
            <Toaster/>
        </UserContext.Provider>
    )
}

export default MyApp
