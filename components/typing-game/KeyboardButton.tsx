import {useEffect, useState} from "react";

interface KeyboardKeyProps {
    letter: string;
    letterColor: string;
}

export default function KeyboardKey({letter, letterColor}: KeyboardKeyProps) {

    return (
        <div
             className={`flex justify-center items-center w-16 h-16 m-2 rounded ${letterColor}`}>
            {letter.toUpperCase()}
        </div>
    );
};
