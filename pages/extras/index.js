import React from "react";
import {FaFileAlt, FaKeyboard, FaCode, FaCar} from "react-icons/fa";
import {GiKnifeFork} from "react-icons/gi";
import {MdMenuBook, MdQuiz, MdLinkedCamera} from "react-icons/md";
import {CgDebug} from "react-icons/cg";

export default function ToolsPage() {
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-24"}>
            <RedirectToTool text="Coding Practice" description="Solve coding challenges in TypeScript."
                            href="/extras/coding-practice" icon={<FaCode/>}/>
            <RedirectToTool text="Wizard Installs" description="Professional dashcam installation services."
                            href="https://wizardinstalls.com/" icon={<FaCar/>}/>
            <RedirectToTool text="Trivvi" description="Generate multiplayer trivia challenges on any topic."
                            href="https://trivvi.vercel.app/" icon={<MdQuiz/>}/>
            <RedirectToTool text="AI PDF Summarizer" description="Quickly summarize PDFs with AI."
                            href="/extras/parsepdf" icon={<FaFileAlt/>}/>
            <RedirectToTool text="Typing Game" description="Improve your typing speed with fun challenges."
                            href="/extras/typing-game" icon={<FaKeyboard/>}/>
            <RedirectToTool text="Recipe Finder" description="Discover new recipes based on your ingredients."
                            href="https://recipe-finder-335621.ue.r.appspot.com/" icon={<GiKnifeFork/>}/>
            <RedirectToTool text="Cheeze" description="Capture and share moments effortlessly. (Snapchat clone)"
                            href="https://cheeze.vercel.app/" icon={<MdLinkedCamera/>}/>
            <RedirectToTool text="DebugMe" description="Test and debug your code online."
                            href="https://debugme.vercel.app/" icon={<CgDebug/>}/>
            <RedirectToTool text="MenuMate" description="Find the best menu items at restaurants."
                            href="https://menumate.vercel.app/" icon={<MdMenuBook/>}/>
        </div>
    );
}

function RedirectToTool({text, description, href, icon}) {
    const getImageRef = () => {
        switch (text) {
            case "Coding Practice":
                return "/img/extras/codingpractice.png";
            case "AI PDF Summarizer":
                return "/img/extras/pdfsummarizer.png";
            case "Typing Game":
                return "/img/extras/typinggame.png";
            case "Recipe Finder":
                return "/img/extras/recipefinder.png";
            case "DebugMe":
                return "/img/extras/debugme.png";
            case "Cheeze":
                return "/img/extras/cheeze.png";
            case "Wizard Installs":
                return "/img/extras/wizardinstalls.png";
            case "MenuMate":
                return "/img/extras/menumate.png";
            case "Trivvi":
                return "/img/extras/trivvi.png";
            default:
                return "/pdf.png";
        }
    };

    return (
        <a className={"flex flex-col m-2 items-center p-4 border-2 hover:border-blue transition-all rounded-lg space-y-4"}
           href={href}>
            <div className={"flex flex-col items-center text-center"}>
                <div className={"flex items-center space-x-2 text-lg font-semibold"}>
                    <span className={"text-2xl"}>{icon}</span>
                    <span>{text}</span>
                </div>
                <p className={"text-sm text-gray-600 mt-1"}>{description}</p>
            </div>
            <img className={"w-80 h-40"} src={getImageRef(text)} alt={text}/>
        </a>
    );
}
