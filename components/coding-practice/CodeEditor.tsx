"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import runCode from "../../lib/utils";
import {IoPlay, IoMenu, IoRefresh, IoCloseOutline} from "react-icons/io5";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Problem} from "../../lib/types";
import ProblemPrompt from "./ProblemPrompt";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";
import WhatAmIDoingWrong from "./WhatAmIDoingWrong";

interface EditorProps {
    problems: Problem[],
    selectedProblemId: number;
    setSelectedProblemId: Dispatch<SetStateAction<number | null>>;
}

export default function CodeEditor({problems, selectedProblemId, setSelectedProblemId}: EditorProps) {
    const [resetModalOn, setResetModalOn] = useState(false);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(selectedProblemId || 0);
    const currentProblem = problems[currentProblemIndex];
    const [userCode, setUserCode] = useState(currentProblem.functionStub);
    const [output, setOutput] = useState<string | null>(null);

    useEffect(() => {
        const savedCode = localStorage.getItem(`problem-${currentProblem.id}`);
        if (savedCode) {
            setUserCode(savedCode);
            return
        }
        setUserCode(currentProblem.functionStub);
    }, [currentProblemIndex]);

    const handleRun = async () => {
        localStorage.setItem(`problem-${currentProblem.id}`, userCode);

        const result = await runCode(userCode, currentProblem.testCases, currentProblem.id);
        setOutput(result);
    };

    const handleNext = () => {
        if (currentProblemIndex < problems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setOutput(null);
        }
    };

    const handleBack = () => {
        if (currentProblemIndex > 0) {
            setCurrentProblemIndex(currentProblemIndex - 1);
            setOutput(null);
        }
    };

    const handleReset = () => {
        setUserCode(currentProblem.functionStub);
        setOutput(null);
        setResetModalOn(false);
        localStorage.removeItem(`problem-${currentProblem.id}`);
    }

    const handleHome = () => {
        setSelectedProblemId(null);
        setCurrentProblemIndex(0);
    };

    return (
        <div className={"w-full lg:w-3/4 "}>
            <div className="flex justify-between items-center my-2">
                <div>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            onClick={handleBack}>
                        <IoIosArrowBack size={24}/>
                    </button>
                    <button
                        className={`bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-2 hidden lg:inline-block`}
                        onClick={handleHome}>
                        <IoMenu size={24}/>
                    </button>
                </div>

                <button onClick={handleRun}
                        className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-green-100 transition tracking-wider">
                    <IoPlay className={"mr-2"} size={24}/>
                    Run
                </button>

                <div>
                    <button
                        className={`hidden lg:inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition mr-2`}
                        onClick={() => setResetModalOn(true)}>
                        <IoRefresh
                            size={24}/>
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            onClick={handleNext}>
                        <IoIosArrowForward size={24}/>
                    </button>
                </div>
            </div>

            <div className="flex flex-col h-full lg:flex-row">
                <div className={"flex flex-col w-full lg:w-1/3"}>
                    <ProblemPrompt problem={currentProblem}/>
                    <WhatAmIDoingWrong userCode={userCode}/>
                </div>

                <div className={"lg:ml-2 w-full lg:w-3/4"}>
                    <Editor
                        className={"rounded-lg overflow-hidden"}
                        height="400px"
                        value={userCode}
                        onChange={(newValue) => setUserCode(newValue || "")}
                        defaultLanguage="typescript"
                        theme="vs-dark"
                        options={{
                            minimap: {enabled: false},
                            scrollbar: {
                                vertical: "hidden",
                                horizontal: "hidden",
                            },
                            scrollBeyondLastLine: false,
                            fontSize: 16,
                            fontFamily: "Fira Code, Consolas, 'Courier New', monospace",
                            fontLigatures: true,
                        }}
                    />

                    {output && (
                        <div className="mt-2 p-2 bg-grey-600 rounded-lg">
                            <h2 className="text-xl tracking-wide text-gray-300">Test Results:</h2>
                            <pre className={"text-gray-400"}>{output}</pre>
                        </div>
                    )}
                </div>
            </div>
            {resetModalOn && <ResetModal setModalOn={setResetModalOn} handleReset={handleReset}/>}
        </div>
    );
}

interface ResetModalProps {
    setModalOn: Dispatch<SetStateAction<boolean>>;
    handleReset: () => void;
}
function ResetModal({setModalOn, handleReset}: ResetModalProps) {
    const handleCloseClick = () => {
        setModalOn(false)
    }

    return (
        <div className="fixed z-30 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-grey-500 md:w-1/3 w-full rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-end">
                        <button onClick={handleCloseClick}>
                            <IoCloseOutline size={32}/>
                        </button>
                    </div>
                    <div className="text-gray-800 mb-4 w-full">
                        <h3 className={"text-xl"}>Are you sure you want to reset this problem?</h3>
                        <p className={"text-md text-gray-400"}>This will clear your code and test results.</p>
                        {/*make a nevermind button which will close the modal*/}
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition mt-4 mr-4"
                            onClick={handleCloseClick}>
                            Nevermind
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-4"
                            onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>
                <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={handleCloseClick}/>
            </div>
        </div>
    );
}