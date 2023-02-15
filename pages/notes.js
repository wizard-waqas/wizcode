import React, {useContext, useEffect, useState} from "react"
import NoteModal from "../components/NoteModal";
import {UserContext} from "../lib/context";
import {firestore} from "../lib/firebase";

export default function NotesPage() {
    const {user} = useContext(UserContext);
    const [notes, setNotes] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let doc = await firestore.collection(`users/${user.email}/notes`).get();
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
            {notes && notes.map((note) => (
                <ViewNoteCard note={note}/>
            ))}
        </div>
    )
}

const ViewNoteCard = ({note}) => {
    const [modalOn, setModalOn] = useState(false)

    return (
        <>
            <div className={"flex flex-col items-center bg-blue m-3 p-2 rounded-xl"}>
                <h2 className={""}>{note.title}</h2>
                <p className={""}>{note.date}</p>
                <img className={"my-2 w-32"} src={"/img/notes/online-lesson.png"}/>
                <button onClick={(q) => {
                    console.log(note)
                    setModalOn(true)
                }} className={"bg-gold text-black my-2 p-1 w-2/3 rounded-lg"}>VIEW
                </button>
            </div>
            {modalOn ?
                <div className={"grid p-2 justify-items-center"}>
                    <NoteModal note={note} setModalOn={setModalOn}/>
                </div>
                : null
            }
        </>
    )
}
