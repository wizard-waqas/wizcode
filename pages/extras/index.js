import React, {useState, useEffect} from "react"
import {FaFileAlt} from "react-icons/fa";
import {FaKeyboard} from "react-icons/fa";
import {GiKnifeFork} from "react-icons/gi";
import {MdMenuBook} from "react-icons/md";

export default function ToolsPage() {


    return (
        <div className={"flex justify-center space-x-4"}>
            <RedirectToTool text={"PDF Summarizer"} href={"/extras/parsepdf"} icon={<FaFileAlt/>}/>
            <RedirectToTool text={"Typing Game"} href={"/extras/typing-game"} icon={<FaKeyboard/>}/>
            <RedirectToTool text={"Recipe Finder"} href={"https://recipe-finder-335621.ue.r.appspot.com/"}
                            icon={<GiKnifeFork/>}/>
            <RedirectToTool text={"MenuMate"} href={"https://menumate.vercel.app/"} icon={<MdMenuBook />}/>
        </div>
    )
}

function RedirectToTool({text, href, icon}) {
    return (
        <a className={"flex flex-col items-center p-4 border-2 hover:border-blue transition-all rounded-lg space-y-4"}
           href={href}>
            <span className={"font-fredoka "}>{text}</span>
            <div className={"text-2xl"}>{icon}</div>
        </a>
    )
}
