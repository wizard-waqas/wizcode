/* React JS Template using functions */
import React, {useState, useEffect} from "react"

export default function AboutMeSection() {
    return (
        <div className={"mt-16"}>
            <h2 className={"text-4xl"}>Your Teacher</h2>
            <div
                className="drop-shadow-xl bg-blue p-4 my-3 rounded-2xl flex-column flex w-full items-center lg:!my-8 lg:!flex-row">
                <img src={"/img/waqas.jpg"} className={"w-40 rounded-full mr-4"}/>
                <div className={""}>
                    <h3 className={"text-xl"}>About Waqas - Founder and Teacher at WizCode</h3>
                    <p className={"text-md"}>
                        Every hobby I’ve ever had like music, cooking, and programming -
                        originated from one thing - <span className={'text-gold'}>creativity</span>. Learning how to
                        program
                        took me more tries than most. However, through that struggle I’m
                        now able to better <span className={'text-gold'}>relate with new programmers</span> and help
                        them <span className={'text-gold'}>achieve their goals</span>.
                    </p>
                </div>
            </div>
        </div>
    )
}
