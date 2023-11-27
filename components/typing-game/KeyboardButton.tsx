import {useEffect, useState} from "react";

interface KeyboardKeyProps {
    letter: string;
    isHighlighted: boolean;
}

export default function KeyboardKey({letter, isHighlighted}: KeyboardKeyProps) {
    const highlightStyle = isHighlighted ? 'bg-blue' : 'bg-grey-500';

    return (
        <div
             className={`flex justify-center items-center w-16 h-16 m-2 rounded ${highlightStyle}`}>
            {letter.toUpperCase()}
        </div>
    );
};
