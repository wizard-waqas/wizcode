import React, {useState} from "react"
import NoteModal from "../components/NoteModal";

export default function NotesPage() {
    const [modalOn, setModalOn] = useState(false)
    const [choice, setChoice] = useState(false)

    const handleCloseClick = () => {
        setChoice(false)
        setModalOn(false)
    }

    const handleClick = () => {
        setModalOn(true)
    }

    return (
        <div className={"flex flex-wrap"}>

            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />
            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />
            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />
            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />
            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />
            <ViewNoteCard title={"Codinewavdsavdg Lesson"} date={getTodaysDate()} handleClick={handleClick} handleCloseClick={handleCloseClick} />

            <div className={"grid w-full p-2 justify-items-center"}>
                {modalOn ? <NoteModal handleCloseClick={handleCloseClick} /> : null}
            </div>
        </div>
    )
}

const ViewNoteCard = ({title, date, handleClick}) => {


    return (
        <div className={"flex flex-col items-center bg-blue m-3 p-2 rounded-xl"}>
            <h2 className={""}>{title}</h2>
            <p className={""}>{date}</p>
            <img className={"my-2 w-32"} src={"/img/notes/online-lesson.png"}/>
            <button onClick={handleClick} className={"bg-gold text-black my-2 p-1 w-2/3 rounded-lg"}>VIEW</button>
        </div>
    )
}

// function to get todays date in this format: Month Day, Year
function getTodaysDate() {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return month + " " + day + ", " + year;
    // example output: "September 13, 2021"
}