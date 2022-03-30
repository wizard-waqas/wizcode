/* React JS Template using functions */
import React, {useContext, useEffect} from "react"
import {toast} from "react-hot-toast";
import {auth, googleAuthProvider} from "../lib/firebase";
import {UserContext} from "../lib/context";
import {Navbar, Nav, Container} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";

export default function NavigationBar() {
    const {user} = useContext(UserContext);

    return (
        <>
            <Navbar className={"w-full p-6"} fixed={"top"} expand={"md"}
                    bg={"dark"} variant={"dark"}>
                <Container className={"flex justify-around transition-all"}>
                    <img className={"w-16 cursor-pointer"} src="/logo.png" alt="logo"/>
                    <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                    <Navbar.Collapse className={"w-full"} id={"responsive-nav-nav"}>
                        <Nav className={"w-full justify-around"}>
                            <div/>
                            <ul className={"list-none flex text-lg flex-col md:flex-row"}>
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold"}
                                          href={"/"}>
                                    HOME
                                </Nav.Link>
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold"}
                                          href={"/lessons/"}>
                                    LESSONS
                                </Nav.Link>
                                {/*<Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold"}*/}
                                {/*          href={"https://www.etsy.com/listing/1114882742/wizcode-t-shirt-coding-unisex-men-and?click_key=b05d86769133b63325820913eca68044149e5746%3A1114882742&click_sum=fbaef5fe&rec_type=ss&ref=landingpage_similar_listing_top-1"}>*/}
                                {/*    MERCH*/}
                                {/*</Nav.Link>*/}
                                <Nav.Link className={"px-4 my-2 transition-all hover:border-b-2 hover:border-b-gold"}
                                          href={"/invoices/"}>
                                    INVOICES
                                </Nav.Link>
                            </ul>

                            <a href="#">
                                {user ?
                                    <SignOutButton/>
                                    :
                                    <SignInButton/>
                                }
                            </a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

const SignInButton = () => {
    const signInWithGoogle = async () => {
        auth.signInWithPopup(googleAuthProvider).then((data) => {
            toast.success("Signed in")
        });
    }

    return (
        <button className={"btn-google w-40 px-2 py-2 bg-blue rounded-lg flex justify-around items-center"}
                onClick={signInWithGoogle}>
            <img src={"google.png"} className={"w-8"}/>
            <span className={"font-fredoka"}>Sign in</span>
        </button>
    )
}

const SignOutButton = () => {
    const signOutwithGoogle = async () => {
        await auth.signOut()
        toast.success("Successfully signed out")
    }

    return <button className={"px-4 py-2 bg-blue rounded-lg"} onClick={signOutwithGoogle}>Sign Out</button>
}
