/* React JS Template using functions */
import React from "react"
import Link from "next/link";

export default function Navbar() {
    return (
        <header className={"flex p-6 justify-between items-center"}>
            <img className={"w-16 cursor-pointer"} src="logo.png" alt="logo"/>

            <ul className={"list-none flex text-lg"}>
                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="/">
                        <a className={""}>
                            HOME
                        </a>
                    </Link>
                </li>

                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="lessons/">
                        <a className={""}>
                            LESSONS
                        </a>
                    </Link>
                </li>

                <li className={"px-4 py-2 transition-all hover:border-b-2 hover:border-b-gold"}>
                    <Link href="#">
                        <a className={""}>
                            MERCH
                        </a>
                    </Link>
                </li>
            </ul>

            <a href="#">
                <button className={"px-4 py-4 bg-darkgold rounded-lg"} >LOGIN | REGISTER</button>
            </a>
        </header>

    )
}
