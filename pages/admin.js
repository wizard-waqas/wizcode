import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../lib/context";
import {firestore} from "../lib/firebase";
import {
    MdTitle,
    MdDateRange,
    MdLightbulbOutline,
    MdOutlineAssignment,
    MdOutlineLink,
    MdOutlinePersonOutline
} from "react-icons/md";

export default function AdminPage() {
    const {user} = useContext(UserContext);
    const [studentEmail, setStudentEmail] = useState("")
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getLongDate());
    const [replitLink, setReplitLink] = useState('');
    const [topicsLearned, setTopicsLearned] = useState([]);
    const [homework, setHomework] = useState([]);

    useEffect(() => {

    })

    if (!user) {
        return <div>Loading...</div>
    }

    if (user.email !== 'waqaspathan00@gmail.com') {
        return <div>You must be admin to view this page</div>
    }

    const handleStudentEmailChange = (event) => {
        setStudentEmail(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleReplitLinkChange = (event) => {
        setReplitLink(event.target.value);
    };

    const handleTopicsLearnedChange = (event) => {
        const topics = event.target.value.split(',');
        setTopicsLearned(topics);
    };

    const handleHomeworkChange = (event) => {
        const hw = event.target.value.split(',');
        setHomework(hw);
    };

    const handleSubmit = () => {
        const noteID = getShortDate();
        const homeworkMap = homework.map((hw) => (
            {
                task: hw,
                complete: false,
            }
        ))

        const note = {
            title,
            date,
            replitLink,
            topicsLearned,
            homework: homeworkMap
        };

        // save note to firestore at users/user.email/notes/noteID
        const notesRef = firestore.collection(`users/${user.email}/notes`);
        notesRef.doc(noteID).set(note).then(() => {
            console.log('Note added successfully!');
        }).catch((error) => {
            console.error('Error adding note: ', error);
        });

        // reset state
        setTitle('');
        setDate(getLongDate());
        setReplitLink('');
        setTopicsLearned([]);
        setHomework([]);

    }

    return (
        <div className={"flex justify-center mt-12 w-full"}>
            <div className={"flex flex-col md:w-1/3 w-11/12 [&>*]:my-1"}>
                <h1 className={"text-center text-3xl text-gold"}>Create Lesson Notes</h1>
                <IconInputBox icon={MdOutlinePersonOutline} placeholder={"Enter student email"} state={studentEmail}
                              setState={handleStudentEmailChange}/>
                <IconInputBox icon={MdTitle} placeholder={"Add title of lesson"} state={title}
                              setState={handleTitleChange}/>
                <IconInputBox icon={MdDateRange} placeholder={"Select lesson date"} state={date}
                              setState={handleDateChange}/>
                <IconInputBox icon={MdOutlineLink} placeholder={"Include replit link (optional)"} state={replitLink}
                              setState={handleReplitLinkChange}/>
                <IconInputBox icon={MdLightbulbOutline} placeholder={"Enter topics covered in this lesson"}
                              state={topicsLearned} setState={handleTopicsLearnedChange}/>
                <IconInputBox icon={MdOutlineAssignment} placeholder={"Add homework assignments for this lesson"}
                              state={homework} setState={handleHomeworkChange}/>
                <button className={"bg-blue hover:bg-darkblue rounded-lg h-12 transition-all"}
                        onClick={handleSubmit}>Submit
                </button>
            </div>
        </div>
    );
}
const IconInputBox = ({icon: Icon, placeholder, state, handleChange}) => {

    return (
        <div className={"relative"}>
            <div className={"absolute top-1/2 h-6 w-6 p-1 left-1 -translate-y-1/2"}>
                <Icon fill={"gold"} fontSize={24}/>
            </div>
            <input
                className={"bg-grey-400 h-12 p-2 rounded-lg indent-8 w-full"}
                placeholder={placeholder}
                onChange={handleChange}
                value={state}
            />
        </div>
    );
}

// write a function to return date in this format mmddyy
function getShortDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    return `${month}${day}${year}`;
}

// function to return date in this format Month Day, Year
function getLongDate() {
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'long'});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}