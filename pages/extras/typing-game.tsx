import React, {useEffect, useRef, useState} from 'react';
import Keyboard from '../../components/typing-game/Keyboard';
import wordsData from "./../../public/words.json";
import toast from "react-hot-toast";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

export default function GamePage() {
    const [currentLetter, setCurrentLetter] = useState<string>('');
    const [nextLetter, setNextLetter] = useState<string>('');
    const [wrongLetter, setWrongLetter] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameOver, setIsGameOver] = useState<boolean>(true);
    const [backgroundAudio, setBackgroundAudio] = useState<any>(null);

    useEffect(() => {
        const score = localStorage.getItem("score");
        if (score) {
            setScore(parseInt(score));
        }

        setCurrentLetter(getRandomLetter());
        setNextLetter(getRandomLetter());
        setBackgroundAudio(new Audio("/audio/background1.mp3"));
    }, []);

    useEffect(() => {
        if (backgroundAudio) {
            backgroundAudio.volume = 0.1;
            // backgroundAudio.play();
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
            localStorage.setItem("score", score.toString());
            return;
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

    function getRandomLetter() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * letters.length);
        return letters[randomIndex];
    }

    const playKeyPressSound = () => {
        const sound = new Audio('/audio/click5_1.wav');
        sound.play();
    };

    const handleInputChange = (event: any) => {
        playKeyPressSound();
        const inputLetter = event.target.value.toLowerCase();

        if (inputLetter === currentLetter) {
            setCurrentLetter(nextLetter);
            setNextLetter(getRandomLetter());
            setScore(score + 1);
        } else {
            setWrongLetter(inputLetter);
            setTimeout(() => setWrongLetter(''), 500);
        }
        setUserInput('');
    };

    const restartGame = () => {
        setScore(0);
        getRandomLetter();
        setTimeLeft(30);
        setIsGameOver(false)
    }

    return (
        <div className={"flex flex-col justify-center items-center w-full [&>*]:my-2"}>
            {isGameOver
                ? (
                    <div className={"flex flex-col items-center [&>*]:my-2"}>
                        <h1 className={"text-5xl"}>Typing Game</h1>
                        <p>Type in every letter shown in<span
                            className={"text-blue"}>&nbsp;BLUE</span></p>
                        <p>You have 30 seconds, click PLAY to begin.</p>
                        <button className={"bg-blue rounded-full px-4 py-2"} onClick={restartGame}>PLAY</button>
                        {score > 0 && (
                            <div className={"text-2xl font-bold text-center"}>Previous score:
                                <span className={"text-gold font-fredoka font-extralight"}>&nbsp;{score}</span>
                            </div>
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
                            colorsTime={[20, 10, 0]}
                            size={90}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                        <Keyboard currentLetter={currentLetter} nextLetter={nextLetter} wrongLetter={wrongLetter}/>
                        <WordInputForm
                            score={score}
                            userInput={userInput}
                            handleInputChange={handleInputChange}
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
};

function WordInputForm({score, userInput, handleInputChange}: WordInputFormProps) {
    return (
        <div className={"flex mt-4"}>
            <div className={"p-3 bg-blue rounded-lg mr-4"}>{score}</div>
            <input
                id={"word-input"}
                className={"rounded-lg p-3 text-grey-400"}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type word, click enter"
            />
        </div>
    );
}
