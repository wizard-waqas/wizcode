/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import Link from "next/link";

export default function FooterSection() {
    return (
        <div className={"w-full flex my-16 flex-col items-center"}>
            <h5 className={"text-center w-52"}>Copyright © 2022 WizCode by Waqas Pathan</h5>

            <div className={"flex justify-between w-40 my-3"}>
                <Link href={"/privacy"}>
                    <a>
                        Privacy
                    </a>
                </Link>
                <Link href={"/terms-of-service"}>
                    <a>
                        Terms
                    </a>
                </Link>
            </div>

            <div className={"flex justify-between w-32"}>
                <Link href={"https://github.com/waqaspathan00"}>
                    <a>
                        <img src={"/img/footer/github.png"} className={"w-12 rounded-full"} alt={"github logo"}/>
                    </a>
                </Link>
                <Link href={"https://www.linkedin.com/in/waqaspathan/"}>
                    <a>
                        <img src={"/img/footer/linkedin.png"} className={"w-12 rounded-full"} alt={"github logo"}/>
                    </a>
                </Link>
            </div>
        </div>
    )
}
