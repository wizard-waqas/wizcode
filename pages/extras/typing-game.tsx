import React, {useEffect, useRef, useState} from 'react';
import Keyboard from '../../components/typing-game/Keyboard';
import wordsData from "./../../public/words.json";
import toast from "react-hot-toast";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

export default function GamePage() {
    const wordChoices = [
        "adventure",
        "blossom",
        "curiosity",
        "delightful",
        "eloquent",
        "flutter",
        "glimmer",
        "harmony",
        "ingenious",
        "jovial",
        "kaleidoscope",
        "luminous",
        "mystique",
        "nebula",
        "odyssey",
        "pinnacle",
        "quirky",
        "radiant",
        "serenity",
        "tranquil",
        "utopia",
        "vibrant",
        "whimsical",
        "exquisite",
        "zenith",
        "alchemy",
        "blissful",
        "cascade",
        "dreamscape",
        "ethereal",
        "fable",
        "gallant",
        "haven",
        "iridescent",
        "jubilant",
        "kindred",
        "legacy",
        "mirage",
        "nostalgia",
        "oasis",
        "paradise",
        "quest",
        "reverie",
        "symphony",
        "tapestry",
        "universe",
        "voyage",
        "whisper",
        "xanadu",
        "yield",
        "zephyr"
    ];
    const [randomWord, setRandomWord] = useState<string>('');
    const [highlightedLetters, setHighlightedLetters] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [enteredWords, setEnteredWords] = useState<string[]>([]);
    // const [enteredWords, setEnteredWords] = useState<string[]>(["hello", "belgium", "chocolate", "porridge", "minecraft", "crafting", "crafting"]);
    const [score, setScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameOver, setIsGameOver] = useState<boolean>(true);
    const [backgroundAudio, setBackgroundAudio] = useState<any>(null);

    useEffect(() => {
        getRandomWord()
        //@ts-ignore
        setBackgroundAudio(new Audio("/audio/background1.mp3"));
    }, []);

    useEffect(() => {
        if (backgroundAudio) {
            //@ts-ignore
            backgroundAudio.volume = 0.1;
            backgroundAudio.play();
            return () => {
                //@ts-ignore
                backgroundAudio.pause();
                setBackgroundAudio(null);
            };
        }
    }, [backgroundAudio]);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsGameOver(true);
            return;
        }

        // Change the word every 10 seconds
        if (timeLeft % 10 === 0) {
            getRandomWord()
        }

        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft]);

    useEffect(() => {
        const wordInput = document.querySelector("#word-input")
        if (wordInput) {
            //@ts-ignore
            wordInput.focus()
        }
    }, [isGameOver]);

    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * wordChoices.length);
        const newRandomWord = wordChoices[randomIndex];
        setRandomWord(newRandomWord);
        setHighlightedLetters([...new Set(newRandomWord.split(''))]);
    }

    const playKeyPressSound = () => {
        const sound = new Audio('/audio/click5_1.wav');
        sound.play();
    };

    const handleInputChange = (event: any) => {
        setUserInput(event.target.value);
        playKeyPressSound();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const word = userInput.toLowerCase();
        if (word == ""){
            return
        }

        const message = validateWord(word);
        if (message) {
            // If the word is invalid, validateWord function will handle the error
            toast.error(message)
            setUserInput('');
            return;
        }

        const successSound = new Audio('/audio/success.mp3');
        successSound.play();
        setEnteredWords([...enteredWords, word]);
        setUserInput('');
        if (word === randomWord) {
            toast.success("You got the target word!");
            const wordLength = word.length;
            setScore(score + (wordLength * 2));
        } else {
            toast.success("Got one!");
            const wordLength = word.length;
            setScore(score + wordLength);
        }
    };

    function validateWord(word: string) {
        if (word.length < 3) {
            return "The word must be at least 3 letters long."
        }

        if (enteredWords.includes(word)) {
            return "You have already entered this word."
        }

        const isWordValid = word.split('').every((letter: any) => highlightedLetters.includes(letter));
        if (!isWordValid) {
            return "The word contains letters that are not available."
        }

        const firstLetter = word[0];
        // @ts-ignore
        if (!wordsData[firstLetter] || !wordsData[firstLetter].includes(word)) {
            return "The entered word does not exist."
        }

        return ""; // Word is valid
    }

    const restartGame = () => {
        setScore(0);
        setEnteredWords([]);
        getRandomWord();
        setTimeLeft(30);
        setIsGameOver(false)
    }

    return (
        <div className={"flex flex-col justify-center items-center w-full [&>*]:my-2"}>
            {isGameOver
                ? (
                    <div className={"flex flex-col items-center [&>*]:my-2"}>
                        <h1 className={"text-5xl"}>Typing Game</h1>
                        <p>Type as many words as you can using the letters highlighted in <span
                            className={"text-blue"}>BLUE</span></p>
                        <p>You have 30 seconds, click PLAY to begin.</p>
                        <button className={"bg-blue rounded-full px-4 py-2"} onClick={restartGame}>PLAY</button>
                        {enteredWords && enteredWords.length > 0 && (
                            <>
                                <div className={"text-3xl font-bold text-center"}>Game Over!</div>
                                <div className={"text-xl font-bold text-center"}>Your score:
                                    <span className={"text-gold font-fredoka font-extralight"}>&nbsp;{score}</span>
                                </div>
                                <div className={"text-xl font-bold text-center text-gold"}>Words entered:</div>
                                <EnteredWords enteredWords={enteredWords}/>
                            </>
                        )}
                    </div>
                )
                : (
                    <>
                        <CountdownCircleTimer
                            isPlaying
                            duration={30}
                            isSmoothColorTransition={true}
                            rotation={"counterclockwise"}
                            colors={["#7DB240", "#F8AA29", "#EC1933"]}
                            colorsTime={[30, 20, 10]}
                            size={90}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                        <Keyboard highlightedLetters={highlightedLetters}/>
                        <WordInputForm
                            score={score}
                            userInput={userInput}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </>
                )
            }
        </div>
    );
};

const renderTime = ({remainingTime}: any) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = true;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    // force one last re-render when the time is over to trigger the last animation
    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
            <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
                {remainingTime}
            </div>
            {prevTime.current !== null && (
                <div key={prevTime.current} className={`time ${!isTimeUp ? "down" : ""}`}>
                    {prevTime.current}
                </div>
            )}
        </div>
    );
};

type WordInputFormProps = {
    score: number;
    userInput: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function WordInputForm({score, userInput, handleInputChange, handleSubmit}: WordInputFormProps) {
    return (
        <form className={"flex mt-4"} onSubmit={handleSubmit}>
            <div className={"p-3 bg-blue rounded-lg mr-4"}>{score}</div>
            <input
                id={"word-input"}
                className={"rounded-lg p-3 text-grey-400"}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type word, click enter"
            />
        </form>
    );
}

type EnteredWordsProps = {
    enteredWords: string[];
}

function EnteredWords({enteredWords}: EnteredWordsProps) {
    return (
        <div className={"flex flex-wrap"}>
            {enteredWords.map((word, index) => (
                <div className={"flex-grow-0 flex-shrink-1 w-1/5"} key={index}>{word}</div>
            ))}
        </div>
    )
}