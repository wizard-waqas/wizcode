/* React JS Template using functions */
import React from "react"
// import styles from '../styles/SplashSection.module.css'
import Tilt from 'react-parallax-tilt';

export default function SplashSection() {
    return (
        <div className={"flex w-full mt-8"}>
            <div className={"w-1/2"}>
                <h1 className={"text-6xl mb-2"}>
                    <span className={"text-blue"}>Wiz</span>
                    <span className={"text-gold"}>Code</span>
                </h1>

                <h2 className={"text-xl"}>
                    Learn to teach yourself
                    <span className={"text-gold"}> anything</span>.
                    </h2>

                <form className={"mt-16"}>
                    <h3 className={"text-xl mb-2"}>Sign up for a free 1-on-1 trial today</h3>
                    <input className={"bg-white rounded-lg px-4 py-2 w-4/5 text-darkgrey text-sm"} placeholder={"Email *"}/>
                </form>
            </div>

            <Tilt className={"w-1/2 self-center"}>
                <img className={"m-4 drop-shadow-lg rounded-lg"} data-tilt src={"editorart.png"}/>
            </Tilt>
        </div>
    )
}
