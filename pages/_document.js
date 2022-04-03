import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href={"/manifest.json"}/>
                <link rel={"apple-touch-icon"} href={"/icons/pwa/apple-icon-180.png"}></link>
                <link rel="shortcut icon" type="image/jpg" href="/icons/pwa/apple-icon-180.png"/>
                <meta name="theme-color" content="#212529"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap"
                          rel="stylesheet"/>
            </Head>
            <body>
                <Main/>
                <NextScript/>

            </body>
        </Html>
)
}