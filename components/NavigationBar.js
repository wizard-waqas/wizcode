/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
import {toast} from "react-hot-toast";
import {auth, googleAuthProvider, yahooAuthProvider, signInWithProvider} from "../lib/firebase";
import {UserContext} from "../lib/context";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import Link from "next/link";
import {AiFillHome} from "react-icons/ai";
import {RiTShirtFill} from "react-icons/ri"
import {FaFileInvoice} from "react-icons/fa";
import {BsFileEarmarkCodeFill} from "react-icons/bs";


/**
 * Navigation bar shown at top of screen
 * Contains the routes for the application
 */
export default function NavigationBar() {
    const {user} = useContext(UserContext);

    return (
        <>
            <Navbar className={"z-10 w-full p-6"} fixed={"top"} expand={"md"}
                    bg={"dark"} variant={"dark"}>
                <Container className={"flex justify-around transition-all"}>
                    <Link href={"/"}>
                        <a>
                            <img className={"w-16 cursor-pointer drop-shadow-outline"} src="/img/navbar/logo.png"
                                 alt="logo"/>
                        </a>
                    </Link>
                    <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                    <Navbar.Collapse className={"w-full"} id={"responsive-nav-nav"}>
                        <Nav className={"w-full justify-around"}>
                            <div/>
                            <ul className={"list-none flex text-lg flex-col md:flex-row"}>
                                <Nav.Link
                                    className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                    href={"/"}>
                                    <AiFillHome fill={"gold"} className={"mr-2"}/> HOME
                                </Nav.Link>
                                <Nav.Link
                                    className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                    href={"/notes/"}>
                                    <BsFileEarmarkCodeFill fill={"gold"} className={"mr-2"}/>NOTES
                                </Nav.Link>
                                <Nav.Link
                                    className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                    href={"https://www.etsy.com/listing/1114882742/wizcode-t-shirt-coding-unisex-men-and?click_key=b05d86769133b63325820913eca68044149e5746%3A1114882742&click_sum=fbaef5fe&rec_type=ss&ref=landingpage_similar_listing_top-1"}
                                    target={"_blank"}>
                                    <RiTShirtFill fill={"gold"} className={"mr-2"}/>MERCH
                                </Nav.Link>
                                <Nav.Link
                                    className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                    href={"/invoices/"}>
                                    <FaFileInvoice fill={"gold"} className={"mr-2"}/>INVOICES
                                </Nav.Link>
                            </ul>

                            {user ?
                                <SignOutButton/>
                                :
                                <SignInOptions/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

/**
 * show different sign in options using our providers
 * - google
 * - yahoo
 */
const SignInOptions = () => {

    return (
        <NavDropdown className={"btn-google w-32 bg-blue rounded-lg flex justify-around items-center"}
                     title="Sign In" id="collapsible-nav-dropdown" menuVariant={"dark"}>
            <NavDropdown.Item><SignInWithGoogle/></NavDropdown.Item>
            <NavDropdown.Item><SignInWithYahoo/></NavDropdown.Item>
        </NavDropdown>
    )
}

/**
 * button to sign in with google
 */
const SignInWithGoogle = () => {
    return (
        <button className={"btn-google w-40 px-2 py-2 bg-white rounded-lg flex justify-around items-center"}
                onClick={() => {
                    signInWithProvider(googleAuthProvider)
                }}>
            <img src={"/img/navbar/google.png"} className={"w-8"} alt={"google logo"}/>
            <span className={"font-fredoka text-black text-xl"}>Sign in</span>
        </button>
    )
}

/**
 * button to sign in with yahoo
 */
const SignInWithYahoo = () => {

    return (
        <button className={"btn-google w-40 px-2 py-2 bg-purple rounded-lg flex justify-around items-center"}
                onClick={() => {
                    signInWithProvider(yahooAuthProvider)
                }}>
            <img src={"/img/navbar/yahoo.png"} className={"w-8"} alt={"yahoo logo"}/>
            <span className={"font-fredoka text-xl"}>Sign in</span>
        </button>
    )
}

/**
 * Shown when the user is logged in
 */
const SignOutButton = () => {
    const signOutwithGoogle = async () => {
        await auth.signOut()
        toast.success("Successfully signed out")
    }

    return <button className={"px-4 py-2 w-40 bg-blue rounded-lg"} onClick={signOutwithGoogle}>Sign Out</button>
}
