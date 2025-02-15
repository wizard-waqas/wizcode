import React from "react";
import {FaFileAlt, FaKeyboard, FaCode, FaCar} from "react-icons/fa";
import {GiKnifeFork} from "react-icons/gi";
import {MdMenuBook, MdQuiz, MdLinkedCamera} from "react-icons/md";
import {CgDebug} from "react-icons/cg";

export default function ToolsPage() {
    const tools = [
        {
            text: "Coding Practice",
            description: "Solve coding challenges in TypeScript.",
            href: "/extras/coding-practice",
            icon: <FaCode/>,
            img: "/img/extras/codingpractice.png"
        },
        {
            text: "Wizard Installs",
            description: "Professional dashcam installation services.",
            href: "https://wizardinstalls.com/",
            icon: <FaCar/>,
            img: "/img/extras/wizardinstalls.png"
        },
        {
            text: "AI PDF Summarizer",
            description: "Quickly summarize PDFs with AI.",
            href: "/extras/parsepdf",
            icon: <FaFileAlt/>,
            img: "/img/extras/pdfsummarizer.png"
        },
        {
            text: "Typing Game",
            description: "Improve your typing speed with fun challenges.",
            href: "/extras/typing-game",
            icon: <FaKeyboard/>,
            img: "/img/extras/typinggame.png"
        },
        {
            text: "Recipe Finder",
            description: "Discover new recipes based on your ingredients.",
            href: "https://recipe-finder-335621.ue.r.appspot.com/",
            icon: <GiKnifeFork/>,
            img: "/img/extras/recipefinder.png"
        },
        {
            text: "Cheeze",
            description: "Capture and share moments effortlessly.",
            href: "https://cheeze.vercel.app/",
            icon: <MdLinkedCamera/>,
            img: "/img/extras/cheeze.png"
        },
        {
            text: "Trivvi",
            description: "Compete in multiplayer trivia challenges.",
            href: "https://trivvi.vercel.app/",
            icon: <MdQuiz/>,
            img: "/img/extras/trivvi.png"
        },
        {
            text: "DebugMe",
            description: "Test and debug your code online.",
            href: "https://debugme.vercel.app/",
            icon: <CgDebug/>,
            img: "/img/extras/debugme.png"
        },
        {
            text: "MenuMate",
            description: "Find the best menu items at restaurants.",
            href: "https://menumate.vercel.app/",
            icon: <MdMenuBook/>,
            img: "/img/extras/menumate.png"
        }
    ];

    return (
        <div className={"flex flex-col items-center justify-center min-h-screen"}>
            <h1 className={"text-4xl font-bold mb-8"}>Tools</h1>
            <p className={"text-md text-gray-300 font-bold mb-8 text-center"}>Projects, tools, and games I have built throughout the years.</p>
            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-24"}>
                {tools.map((tool, index) => (
                    <RedirectToTool key={index} {...tool}/>
                ))}
            </div>
        </div>
    );
}

function RedirectToTool({text, description, href, icon, img}) {
    return (
        <a className="flex flex-col m-2 items-center p-4 border-2 border-gray-500 hover:border-blue transition-all rounded-lg space-y-4"
           href={href}>
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-2 text-lg font-semibold">
                    <span className="text-2xl">{icon}</span>
                    <span>{text}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <img className="w-80 h-40 rounded-lg " src={img} alt={text}/>
        </a>
    );
}
