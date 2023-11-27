import React from 'react';
import KeyboardKey from './KeyboardButton';

interface KeyboardProps {
    currentLetter: string;
    nextLetter: string;
    wrongLetter?: string;
}

export default function Keyboard({currentLetter, nextLetter, wrongLetter}: KeyboardProps) {
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    const breakAfter = ['p', 'l']; // Letters to break after

    const getLetterStyle = (letter: string) => {
        if (letter === wrongLetter) {
            return 'bg-red-500'; // Red for wrong letter
        }
        if (letter === currentLetter) {
            return 'bg-blue'; // Blue for current letter
        }
        if (letter === nextLetter) {
            return 'bg-gray-500'; // Grey for next letter
        }
        return 'bg-grey-500'; // Black for other letters
    };

    return (
        <div className="flex flex-wrap justify-center">
            {alphabet.map((letter, index) => (
                <React.Fragment key={index}>
                    <div className={"flex"}>
                        <KeyboardKey
                            letter={letter}
                            letterColor={getLetterStyle(letter)}
                        />
                    </div>
                    {breakAfter.includes(letter) && <div className="w-full"></div>}
                </React.Fragment>
            ))}
        </div>
    );
};