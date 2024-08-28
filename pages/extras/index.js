import React, {useState, useEffect} from "react"
import {FaFileAlt} from "react-icons/fa";
import {FaKeyboard} from "react-icons/fa";
import {GiKnifeFork} from "react-icons/gi";
import {MdMenuBook, MdQuiz} from "react-icons/md";

export default function ToolsPage() {
    // implement flex wrap here
    return (
        <div className={"flex flex-col justify-center lg:flex-row lg:px-24"}>
            <RedirectToTool text={"PDF Summarizer"} href={"/extras/parsepdf"} icon={<FaFileAlt/>}/>
            <RedirectToTool text={"Typing Game"} href={"/extras/typing-game"} icon={<FaKeyboard/>}/>
            <RedirectToTool text={"Recipe Finder"} href={"https://recipe-finder-335621.ue.r.appspot.com/"}
                            icon={<GiKnifeFork/>}/>
            <RedirectToTool text={"MenuMate"} href={"https://menumate.vercel.app/"} icon={<MdMenuBook />}/>
            <RedirectToTool text={"Trivvi"} href={"https://trivvi.vercel.app/"} icon={<MdQuiz />}/>
        </div>
    )
}

function RedirectToTool({text, href, icon}) {
    const getImageRef = () => {
        switch (text) {
            case "PDF Summarizer":
                return "/img/extras/pdfsummarizer.png"
            case "Typing Game":
                return "/img/extras/typinggame.png";
            case "Recipe Finder":
                return "/img/extras/recipefinder.png";
            case "MenuMate":
                return "/img/extras/menumate.png";
            case "Trivvi":
                return "/img/extras/trivvi.png";
            default:
                return "/pdf.png";
        }
    }

    return (
        <a className={"flex flex-col m-2 items-center p-4 border-2 hover:border-blue transition-all rounded-lg space-y-4"}
           href={href}>
            <div className={"flex"}>
                <span className={"text-2xl mr-2"}>{icon}</span>
                <span>{text}</span>
            </div>
            <img className={"w-80 h-40"} src={getImageRef(text)}/>
        </a>
    )
}
