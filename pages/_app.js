import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/globals.css'
import {Toaster} from "react-hot-toast";
import {useUserData} from "../lib/hooks";
import {UserContext} from "../lib/context";
import NavigationBar from "../components/NavigationBar";
import React from "react";
import {SSRProvider} from "react-bootstrap";

function MyApp({Component, pageProps}) {

    const userData = useUserData()

    return (
        <SSRProvider>
            <UserContext.Provider value={userData}>
                <Toaster/>
                <title>WizCode</title>

                <NavigationBar/>
                <Component {...pageProps} />
            </UserContext.Provider>
        </SSRProvider>
    )
}

export default MyApp
