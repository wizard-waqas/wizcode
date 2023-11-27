import React, {useState, useEffect} from "react"
import {FaFileAlt} from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";

export default function ToolsPage() {


    return (
        <div className={"flex justify-center space-x-4"}>
            <RedirectToTool text={"PDF Summarizer"} href={"/extras/parsepdf"} icon={<FaFileAlt/>}/>
            <RedirectToTool text={"Typing Game"} href={"/extras/typing-game"} icon={<FaKeyboard />}/>
        </div>
    )
}

function RedirectToTool({text, href, icon}) {
    return (
        <a className={"flex flex-col items-center p-4 border-2 hover:border-blue transition-all rounded-lg space-y-4"} href={href}>
            <span className={"font-fredoka "}>{text}</span>
            <div className={"text-2xl"}>{icon}</div>
        </a>
    )
}
