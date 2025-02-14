import React, {useState} from "react";
import {FaLightbulb} from "react-icons/fa";

interface WhatAmIDoingWrongProps {
    userCode: string;
}

export default function WhatAmIDoingWrong({userCode}: WhatAmIDoingWrongProps) {
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [elapsedTime, setElapsedTime] = useState("00:00s");

    async function handleClick() {
        setLoading(true);
        let startTime = performance.now();

        const timerInterval = setInterval(() => {
            let elapsed = performance.now() - startTime;
            const seconds = Math.floor(elapsed / 1000);
            const milliseconds = Math.floor((elapsed % 1000) / 10); // Get two-digit milliseconds
            setElapsedTime(`${seconds}.${milliseconds.toString().padStart(2, "0")}s`);
        }, 10);

        try {
            const response = await fetch("/api/openai/explain-code", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userCode}),
            });

            const data = await response.json();
            if (data.explanation) {
                setExplanation(data.explanation);
            } else {
                setExplanation("No explanation provided.");
            }
        } catch (error) {
            setExplanation("Something went wrong. Please try again.");
        } finally {
            clearInterval(timerInterval);
            setLoading(false);
        }
    }

    function formatExplanation(text: string) {
        // Replace text inside backticks with <code> elements
        return text.split(/(`[^`]+`)/g).map((part, index) =>
            part.startsWith("`") && part.endsWith("`") ? (
                <code key={index} className="bg-gray-700 text-lightblue px-1 rounded">
                    {part.slice(1, -1)}
                </code>
            ) : (
                part
            )
        );
    }


    return (
        <div className="flex flex-col bg-gray-700 rounded-lg my-2">
            <button
                className="flex justify-between items-center bg-blue-600 p-4 text-gray-300 rounded-lg w-full hover:bg-gray-800 transition"
                onClick={handleClick}
                disabled={loading}
            >
                <span className="flex items-center">
                    <FaLightbulb size={24} className="mr-2 fill-yellow-300"/>
                    {loading ? "Analyzing..." : "What am I doing wrong?"}
                </span>
                <span className="text-sm text-gray-400">{elapsedTime}</span>
            </button>
            {explanation && (
                <span className="rounded-lg p-4 bg-gray-600 text-gray-300">
                    {formatExplanation(explanation)}
                </span>
            )}
        </div>
    );
}
