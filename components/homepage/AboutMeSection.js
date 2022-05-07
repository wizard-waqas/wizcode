/* React JS Template using functions */
import React, {useState, useEffect} from "react"

export default function AboutMeSection() {
    return (
        <div className="drop-shadow-xl bg-blue p-4 my-3 rounded-2xl flex-column flex w-full items-center lg:!my-8 lg:!flex-row">
            <img src={"/img/waqas.jpg"} className={"w-40 rounded-full"}/>
            <h1>about me</h1>
        </div>
    )
}
