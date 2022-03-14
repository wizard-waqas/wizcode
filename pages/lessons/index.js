/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function LessonsPage() {
    return (
        <div>
            <Navbar/>

            <div className={"flex flex-wrap"}>
                <LessonCard link={"lessons/wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
                <LessonCard link={"wordl/"} img={"wordl.png"} title={"Wordle"}
                            description={"Build the million dollar word game"}/>
            </div>
        </div>
    )
}

function LessonCard({link, img, title, description}) {
    return (
        <div className={"bg-blue rounded-2xl overflow-hidden flex-1 basis-1/5 m-4"}>
            <Link href={link}>
                <a>
                    <img className={""} src={img}/>
                    <h2 className={"p-2"}>{title}</h2>
                    <p className={"p-2 text-lightgrey text-sm"}>{description}</p>
                </a>
            </Link>
        </div>
    )
}