import React, {useState, useEffect} from "react"
import {RiCloseCircleLine} from "react-icons/ri";

export default function NoteModal({handleClick, handleCloseClick}) {

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
                        <h3 className={"text-gold text-4xl"}>Intro to JavaScript</h3>
                        <h5 className={"text-grey-300 text-2xl"}>March 21, 2022</h5>
                        <iframe className="w-full h-96 my-4" src="https://replit.com/@waqasp/intro-to-javascript-DOM?lite=true"/>

                        <h4 className={"text-gold text-3xl"}>What I Learned</h4>
                        <ul className={"list-disc [&>*]:ml-12 [&>*]:my-1"}>
                            <li><p>Grab HTML objects from the DOM</p></li>
                            <li><p>Grab the text entered from an input box</p></li>
                            <li><p>Call a function when a button is clicked</p></li>
                        </ul>

                        <h4 className={"text-gold text-3xl"}>Homework</h4>
                        <ul className={"list-disc [&>*]:ml-8 [&>*]:my-2"}>
                            <li className={"flex items-center"}>
                                <button className={"w-6 h-6 mr-4 border-2 bg-grey-100 rounded-md"}></button>
                                <p>Finish the JavaScript DOM tutorial</p>
                            </li>
                            <li className={"flex items-center"}>
                                <button className={"w-6 h-6 mr-4 border-2 bg-grey-100 rounded-md"}></button>
                                <p>Center items on screen</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={handleCloseClick}/>
            </div>
        </div>
    );
}