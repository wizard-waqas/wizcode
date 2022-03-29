/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import Link from "next/link";

import { firestore, lessonToJSON } from "../../lib/firebase";

export async function getServerSideProps(){
    const lessonsQuery = firestore
        .collectionGroup("lessons")

    const lessons = (await lessonsQuery.get()).docs.map(lessonToJSON)

    return {
        props: { lessons }
    }
}

export default function LessonsPage(props) {
    const lessons = props.lessons;

    return (
        <div>
            <div className={"flex flex-wrap"}>
                {lessons.map((lesson) => (
                    <LessonCard key={lesson.title} link={lesson.link} img={lesson.img} title={lesson.title}
                            description={lesson.description}/>
                ))}
            </div>
        </div>
    )
}

function LessonCard({link, img, title, description}) {
    return (
        <div className={"bg-blue rounded-2xl overflow-hidden flex-1 basis-1/5 m-4"}>
            <Link href={"/lessons/"+link}>
                <a>
                    <img className={""} src={"/lessons/"+img} alt={"lesson image"}/>
                    <h2 className={"p-2"}>{title}</h2>
                    <p className={"p-2 text-lightgrey text-sm"}>{description}</p>
                </a>
            </Link>
        </div>
    )
}