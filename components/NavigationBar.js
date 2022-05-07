/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
import {toast} from "react-hot-toast";
import {auth, googleAuthProvider} from "../lib/firebase";
import {UserContext} from "../lib/context";
import {Navbar, Nav, Container} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { RiTShirtFill } from "react-icons/ri"
import {FaFileInvoice} from "react-icons/fa";


/**
 * Navigation bar shown at top of screen
 * Contains the routes for the application
 */
export default function NavigationBar() {
    const {user} = useContext(UserContext);

    return (
        <>
            <Navbar className={"w-full p-6"} fixed={"top"} expand={"md"}
                    bg={"dark"} variant={"dark"}>
                <Container className={"flex justify-around transition-all"}>
                    <Link href={"/"}>
                        <a>
                            <img className={"w-16 cursor-pointer drop-shadow-outline"} src="/img/navbar/logo.png" alt="logo"/>
                        </a>
                    </Link>
                    <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                    <Navbar.Collapse className={"w-full"} id={"responsive-nav-nav"}>
                        <Nav className={"w-full justify-around"}>
                            <div/>
                            <ul className={"list-none flex text-lg flex-col md:flex-row"}>
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                          href={"/"}>
                                    <AiFillHome className={"mr-2"}/> HOME
                                </Nav.Link>
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                          href={"https://www.etsy.com/listing/1114882742/wizcode-t-shirt-coding-unisex-men-and?click_key=b05d86769133b63325820913eca68044149e5746%3A1114882742&click_sum=fbaef5fe&rec_type=ss&ref=landingpage_similar_listing_top-1"}
                                          target={"_blank"}>
                                    <RiTShirtFill className={"mr-2"}/>MERCH
                                </Nav.Link>
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold flex items-center"}
                                          href={"/invoices/"}>
                                    <FaFileInvoice className={"mr-2"}/>INVOICES
                                </Nav.Link>
                            </ul>

                            {user ?
                                <SignOutButton/>
                                :
                                <SignInButton/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

/**
 * Shown when the user is not logged in
 */
const SignInButton = () => {
    const signInWithGoogle = async () => {
        auth.signInWithPopup(googleAuthProvider).then((data) => {
            toast.success("Signed in")
        });
    }

    return (
        <button className={"btn-google w-40 px-2 py-2 bg-blue rounded-lg flex justify-around items-center"}
                onClick={signInWithGoogle}>
            <img src={"/img/navbar/google.png"} className={"w-8"} alt={"google logo"}/>
            <span className={"font-fredoka"}>Sign in</span>
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
