import React from 'react';
import KeyboardKey from './KeyboardButton';

interface KeyboardProps {
    highlightedLetters: string[];
}

export default function Keyboard({highlightedLetters}: KeyboardProps) {
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    const breakAfter = ['p', 'l']; // Letters to break after

    return (
        <div className="flex flex-wrap justify-center">
            {alphabet.map((letter, index) => (
                <React.Fragment key={index}>
                    <div className={"flex"}>
                        <KeyboardKey
                            letter={letter}
                            isHighlighted={highlightedLetters.includes(letter)}
                        />
                    </div>
                    {breakAfter.includes(letter) && <div className="w-full"></div>}
                </React.Fragment>
            ))}
        </div>
    );
};