"use client";

import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import runCode from "../../lib/utils";
import {IoPlay} from "react-icons/io5";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Problem} from "../../lib/types";
import ProblemPrompt from "./ProblemPrompt";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";

interface EditorProps {
    problems: Problem[],
    selectedProblemId?: number;
}

export default function CodeEditor({problems, selectedProblemId}: EditorProps) {
    const [currentProblemIndex, setCurrentProblemIndex] = useState(selectedProblemId || 0);
    const currentProblem = problems[currentProblemIndex];
    const [userCode, setUserCode] = useState(currentProblem.functionStub);
    const [output, setOutput] = useState<string | null>(null);

    useEffect(() => {
        setUserCode(currentProblem.functionStub);
    }, [currentProblemIndex]);

    const handleRun = async () => {
        const result = await runCode(userCode, currentProblem.testCases);
        setOutput(result);
    };

    const handleNext = () => {
        if (currentProblemIndex < problems.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentProblemIndex > 0) {
            setCurrentProblemIndex(currentProblemIndex - 1);
        }
    };

    return (
        <div className={"w-full lg:w-3/4 "}>
            <div className="flex justify-between items-center my-2">
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        onClick={handleBack}>
                    <IoIosArrowBack size={24}/>
                </button>

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


            <div className="flex flex-col lg:flex-row">
                <ProblemPrompt problem={currentProblem}/>

                <div className={"lg:ml-4 w-full lg:w-1/2"}>
                    <Editor
                        className={"rounded-lg overflow-hidden"}
                        height="200px"
                        value={userCode}
                        onChange={(newValue) => setUserCode(newValue || "")}
                        defaultLanguage="typescript"
                        options={{
                            minimap: {enabled: false},  // Disable minimap
                            scrollbar: {
                                vertical: "hidden",  // Hide vertical scrollbar
                                horizontal: "hidden", // Hide horizontal scrollbar
                            },
                            scrollBeyondLastLine: false, // Prevent scrolling beyond the last line
                            fontSize: 16,
                            fontFamily: "Fira Code, Consolas, 'Courier New', monospace",
                            fontLigatures: true,
                        }}
                    />

                    {output && (
                        <div className="mt-4 p-2 bg-gray-100 rounded-lg">
                            <h2 className="text-xl tracking-wide text-gray-800">Test Results:</h2>
                            <pre className={"text-black"}>{output}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
