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

            <SignUpForTrial/>
        </div>
    )
}

const SignUpForTrial = () => {
    const [email, setEmail] = useState("")  // email entered in input box
    const [hasSubmitted, setHasSubmitted] = useState(false)  // has the user already submitted their email
    const [isDisabled, setIsDisabled] = useState(false)

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
        try {
            setIsDisabled(true)
            const response = await fetch(`/api/twilio/${email}`)
            const data = await response.json()
            setIsDisabled(false)
            return data
        } catch (e) {
            setIsDisabled(false)
            throw 400
        }
    }

    /**
     * check if email is valid or not (syntactically)
     *
     * @returns {boolean}
     */
    function isValidEmail() {
        const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        const isValid = regex.test(email);

        // return false if invalid email entry
        if (!isValid) {
            toast.error("Invalid email")
            return false
        }

        // send a text and show a toast message accordingly
        toast.promise(sendText(), {
            loading: "Processing",
            success: "Success",
            error: "Sorry, something went wrong"
        })

        setHasSubmitted(true);  // hide inputs
        localStorage.setItem("email", email)  // save the email for future loads

        return isValid
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

        }
    }

    // if user has previously submitted an email then show a "Thank you" message
    if (hasSubmitted) {
        return (
            <Bounce>
                <div className={"text-3xl text-center mt-16"}>
                    <span className={"font-fredoka"}>Thank you! </span>
                    We will be in touch soon to
                    <span className={"text-gold font-fredoka"}> schedule an appointment</span>.
                </div>
            </Bounce>
        )
    }

    // otherwise (normally), show an input box asking for user email
    return (
        <div className={"mt-16"}>
            <h3 className={"text-xl mb-4 lg:text-md"}>Sign up for a free 1-on-1 coding lesson today</h3>
            <form className={"drop-shadow-lg"} onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={"bg-white rounded-tl-lg rounded-bl-lg px-2 py-2 w-4/5 text-darkgrey text-sm md:w-1/2"}
                    placeholder={"Email *"} onChange={(e) => handleChange(e)}/>
                <input
                    className={"w-1/5 rounded-tr-lg rounded-br-lg text-sm px-2 py-2 touch-manipulation " + (!isDisabled ? "bg-darkgold" : "bg-gold")}
                    type={"button"} disabled={isDisabled}
                    value={"Submit"} onClick={(e) => handleSubmit(e)}/>
            </form>
        </div>
    )
}