import React, {useContext, useEffect, useState} from "react"
import NoteModal from "../components/NoteModal";
import {UserContext} from "../lib/context";
import {firestore} from "../lib/firebase";
import {toast} from "react-hot-toast";

export default function NotesPage() {
    const {user} = useContext(UserContext);
    const [notes, setNotes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const toastID = toast.loading('Saving note...');
            try {
                let doc = await firestore.collection(`users/${user.email}/notes`).get();
                const notes = doc.docs.map((doc) => doc.data());
                notes.sort((a, b) => (
                    new Date(b.date) - new Date(a.date)
                ))
                toast.success('Notes retrieved!')
                return notes
            } catch (e) {
                toast.error("Something went retrieving notes")
                console.error('Error: ', e);
            }
            toast.dismiss(toastID);
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
        <div className={"flex flex-wrap justify-around w-full md:justify-start md:[&>*]:mx-4"}>
            {notes && notes.map((note) => (
                <ViewNoteCard note={note} key={note.title}/>
            ))}
        </div>
    )
}

const ViewNoteCard = ({note}) => {
    const [modalOn, setModalOn] = useState(false)

    return (
        <>
            <div className={"flex flex-col w-fit items-center bg-blue p-2 rounded-xl my-2"}>
                <h2 className={""}>{note.title}</h2>
                <p className={""}>{note.date}</p>
                <img alt={"online lesson image"} className={"my-2 w-32"} src={"/img/notes/online-lesson.png"}/>
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
