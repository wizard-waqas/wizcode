import React, {useState, useEffect} from "react"
import {RiCloseCircleLine} from "react-icons/ri";

export default function NoteModal({note, setModalOn}) {
    console.log(note)

    const handleCloseClick = () => {
        setModalOn(false)
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-grey-500 w-1/3 rounded-lg shadow-lg p-6 z-50">
                    <div className="flex justify-end">
                        <button onClick={handleCloseClick}>
                            <RiCloseCircleLine fill={"red"} size={32}/>
                        </button>
                    </div>
                    <div className="text-lg font-bold text-gray-800 mb-4 w-full">
                        <h3 className={"text-gold text-4xl"}>{note.title}</h3>
                        <h5 className={"text-grey-300 text-2xl"}>{note.date}</h5>
                        {note.replitLink ?
                            <iframe className="w-full h-96 my-4" src={`${note.replitLink}?lite=true`}/> : null}

                        <h4 className={"text-gold text-3xl mt-4"}>What I Learned</h4>
                        <ul className={"list-disc [&>*]:ml-12 [&>*]:my-1"}>
                            {note.topicsLearned.map((item) => (
                                <li key={item}><p>{item}</p></li>
                            ))}
                        </ul>

                        <h4 className={"text-gold text-3xl"}>Homework</h4>
                        <ul className={"list-disc [&>*]:ml-8 [&>*]:my-2"}>
                            {note.homework.map((item) => (
                                    <li key={item.task} className={"flex items-center"}>
                                        <button className={"w-6 h-6 mr-4 bg-grey-100 rounded-md"}></button>
                                        <p>{item.task}</p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={handleCloseClick}/>
            </div>
        </div>
    );
}