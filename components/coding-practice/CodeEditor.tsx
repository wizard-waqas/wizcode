"use client";

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import runCode from "../../lib/utils";
import {IoPlay, IoHome} from "react-icons/io5";
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
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-2"
                            onClick={handleHome}>
                        <IoHome size={24}/>
                    </button>
                </div>

                <button onClick={handleRun}
                        className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-green-100 transition tracking-wider">
                    <IoPlay className={"mr-2"} size={24}/>
                    Run
                </button>

                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        onClick={handleNext}>
                    <IoIosArrowForward size={24}/>
                </button>
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
        </div>
    );
}
