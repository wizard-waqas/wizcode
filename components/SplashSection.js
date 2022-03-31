/* React JS Template using functions */
import React, {useEffect, useState} from "react"
import Tilt from 'react-parallax-tilt';
import {toast} from "react-hot-toast";
import {Bounce} from "react-awesome-reveal";

/**
 * The page you see on initial load containing the basic company info:
 *      title, descriptions, coding editor art
 */
export default function SplashSection() {
    const [email, setEmail] = useState("")  // email entered in input box
    const [hasSubmitted, setHasSubmitted] = useState(false)  // has the user already submitted their email

    /**
     * check if user already submitted email in past by checking localstorage
     */
    useEffect(() => {
        const savedEmail = localStorage.getItem("email")

        if (savedEmail) {
            setEmail(savedEmail)
            setHasSubmitted(true)
        }
    }, [])

    /**
     * send a text to myself using twilio
     */
    async function sendText() {
        const response = await fetch(`/api/twilio/${email}`)
        const data = await response.json()
    }

    /**
     * check if email is valid or not (syntactically)
     *
     * @returns {boolean}
     */
    function isValidEmail() {
        const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        return regex.test(email);
    }

    /**
     * handle email input change
     *
     * @param e
     */
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    /**
     * when user submits their email, make request to twilio
     * @param event
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isValidEmail()) {
            await sendText()
            toast.success("Success")
            localStorage.setItem("email", email)
            setHasSubmitted(true);
        } else {
            toast.error("Invalid email")
        }
    }

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

            {hasSubmitted ?
                <Bounce>
                    <div className={"text-3xl text-center mt-16"}>
                        <span className={"font-fredoka"}>Thank you! </span>
                        We will be in touch soon to
                        <span className={"text-gold font-fredoka"}> schedule an appointment</span>.

                    </div>
                </Bounce>
                :
                <div className={"mt-16"}>
                    <h3 className={"text-xl mb-4 lg:text-md"}>Sign up for a free 1-on-1 coding lesson today</h3>
                    <form className={"drop-shadow-lg"} onSubmit={handleSubmit}>
                        <input
                            className={"bg-white rounded-tl-lg rounded-bl-lg px-2 py-2 w-4/5 text-darkgrey text-sm md:w-1/2"}
                            placeholder={"Email *"} onChange={handleChange}/>
                        <input className={"w-1/5 bg-darkgold rounded-tr-lg rounded-br-lg text-sm px-2 py-2"}
                               type={"button"}
                               value={"Submit"} onClick={handleSubmit}/>
                    </form>
                </div>
            }
        </div>
    )
}
