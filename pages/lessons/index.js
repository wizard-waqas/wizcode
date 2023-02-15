/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import Link from "next/link";

import { firestore, dataToJSON } from "../../lib/firebase";

/**
 * before the page loads, get available lessons from firestore
 */
export async function getServerSideProps(){
    const lessonsQuery = firestore
        .collectionGroup("lessons")

    const lessons = (await lessonsQuery.get()).docs.map(dataToJSON)

    return {
        props: { lessons }
    }
}

/**
 * display lessons fetched from firestore
 */
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

/**
 * a lesson card that will link to another page where the user can interact
 * this card is just an image, title, and description
 */
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