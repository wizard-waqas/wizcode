import {useState} from "react";
import {Problem} from "../../lib/types";

interface ProblemPromptProps {
    problem: Problem;
}
export default function ProblemPrompt({problem}: ProblemPromptProps) {
    const [showHints, setShowHints] = useState(false);
    const [showBonuses, setShowBonuses] = useState(false);

    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow w-full lg:w-1/2">
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <p className="mb-4 mt-2">{problem.description}</p>

            <div className="mb-2">
                <p>Examples:</p>
                {problem.examples.map((ex, index) => (
                    <p key={index}>
                        <strong>Input:</strong> {ex.input} → <strong>Output:</strong> {ex.output}
                    </p>
                ))}
            </div>

            <button
                className="mt-4 text-blue-500 underline"
                onClick={() => setShowHints(!showHints)}
            >
                {showHints ? "Hide Hints" : "Show Hints"}
            </button>
            {showHints && (
                <ul className="mt-2 bg-white p-2 rounded shadow">
                    {problem.hints.map((hint, index) => (
                        <li key={index} className="text-gray-700">
                            - {hint}
                        </li>
                    ))}
                </ul>
            )}

            <br/>
            <button
                className="mt-4 text-green-500 underline"
                onClick={() => setShowBonuses(!showBonuses)}
            >
                {showBonuses ? "Hide Bonuses" : "Show Bonuses"}
            </button>
            {showBonuses && (
                <ul className="mt-2 bg-white p-2 rounded shadow">
                    {problem.bonuses.map((bonus, index) => (
                        <li key={index} className="text-gray-700">
                            - {bonus}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
