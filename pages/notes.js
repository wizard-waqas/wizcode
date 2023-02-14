import React, {useContext, useEffect, useState} from "react"
import NoteModal from "../components/NoteModal";
import {UserContext} from "../lib/context";
import {firestore} from "../lib/firebase";

export default function NotesPage() {
    const {user} = useContext(UserContext);
    const [modalOn, setModalOn] = useState(false)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let doc = await firestore.collection(`users/${user.uid}/notes`).get();
                const notes = doc.docs.map((doc) => doc.data());
                console.log(notes)
                return notes
            } catch (e) {
                console.log(e)
            }
        }

        // only fetch data if there is a user logged in
        if (user !== null) {
            fetchData().then(data => setNotes(data))
        }
    }, [user])

    if (!notes) {
        return <div>Loading...</div>
    }

    return (
        <div className={"flex flex-wrap"}>
            {notes && notes.map((note) => {
                return (
                    <ViewNoteCard note={note} modalOn={modalOn} setModalOn={setModalOn}/>
                )
            })}

            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}
            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}
            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}
            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}
            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}
            {/*<ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick}*/}
            {/*              handleCloseClick={handleCloseClick}/>*/}

        </div>
    )
}

const ViewNoteCard = ({note, modalOn, setModalOn}) => {
    return (
        <>
            <div className={"flex flex-col items-center bg-blue m-3 p-2 rounded-xl"}>
                <h2 className={""}>{note.title}</h2>
                <p className={""}>{note.date}</p>
                <img className={"my-2 w-32"} src={"/img/notes/online-lesson.png"}/>
                <button onClick={(q) => {
                    setModalOn(true)
                }} className={"bg-gold text-black my-2 p-1 w-2/3 rounded-lg"}>VIEW
                </button>
            </div>

            <div className={"grid w-full p-2 justify-items-center"}>
                {modalOn ? <NoteModal note={note} setModalOn={setModalOn}/> : null}
            </div>
        </>
    )
}

// function to get todays date in this format: Month Day, Year
function getTodaysDate() {
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'long'});
    const day = date.getDate();
    const year = date.getFullYear();
    return month + " " + day + ", " + year;
    // example output: "September 13, 2021"
}

// function to get todays date in this format: mmddyy, only the last 2 numbers of year, padded with 0 if needed
function getTodaysDateShort() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2);
    return month + day + year;
    // example output: "091321"
}