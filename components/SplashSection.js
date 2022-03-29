/* React JS Template using functions */
import React from "react"
import Tilt from 'react-parallax-tilt';

export default function SplashSection() {
    return (
        <div className={"w-full mt-8"}>
            <div className={"w-full flex"}>
                <div className={"w-1/2 mt-4"}>
                    <h1 className={"text-6xl mb-2"}>
                        <span className={"font-fredoka text-blue"}>Wiz</span>
                        <span className={"font-fredoka text-gold"}>Code</span>
                    </h1>

                    <h2 className={"text-xl"}>
                        Learn to teach yourself
                        <span className={"font-fredoka text-gold"}> how to code</span>.
                    </h2>

                    <h4>
                        DESCRIPTION GOES HERE
                    </h4>
                </div>

                <Tilt className={"w-1/2 self-center mt-20"}>
                    <img className={"m-4 drop-shadow-lg rounded-lg"} data-tilt src={"editorart.png"}
                         alt={"coding editor art"}/>
                </Tilt>
            </div>

            <form className={"mt-16"}>
                <h3 className={"text-xl mb-4 lg:text-md"}>Sign up for a free 1-on-1 trial today</h3>
                <div className={"drop-shadow-lg"}>
                    <input
                        className={"bg-white rounded-tl-lg rounded-bl-lg px-2 py-2 w-4/5 text-darkgrey text-sm md:w-1/2"}
                        placeholder={"Email *"}/>
                    <input className={"w-1/5 bg-darkgold rounded-tr-lg rounded-br-lg text-sm px-2 py-2"} type={"submit"}
                           value={"Submit"}/>
                </div>
            </form>
        </div>
    )
}
