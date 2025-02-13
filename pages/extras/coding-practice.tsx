import {useState, useEffect} from "react";
import CodeEditor from "../../components/coding-practice/CodeEditor";
import {Problem} from "../../lib/types";
import { FaStar } from "react-icons/fa";

export default function CodingPractice() {
    const [selectedProblemId, setSelectedProblemId] = useState<any>(null);
    const [problems, setProblems] = useState<any>(null);

    useEffect(() => {
        fetch("/problems.json")
            .then((res) => res.json())
            .then((data) => setProblems(data));
    }, []);

    if (!problems) return <p>Loading...</p>;

    if (!selectedProblemId) {
        return (
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-2xl font-bold text-center">Select a problem to solve</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {problems.map((problem: Problem) => (
                        <button
                            key={problem.id}
                            className="flex justify-between items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            onClick={() => setSelectedProblemId(problem.id)}
                        >
                            <div className={"flex justify-start items-center"}>
                                <DifficultyBadge difficulty={problem.difficulty}/>
                                <span className={""}>{problem.title}</span>
                            </div>
                            <CompletedBadge completed={problem.completed}/>
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center mt-8 h-screen mx-4">
            <CodeEditor problems={problems} selectedProblemId={selectedProblemId}/>
        </div>
    );
}

const DifficultyBadge = ({difficulty}: { difficulty: string }) => {
    let color = "gray";
    if (difficulty === "EASY") color = "green";
    if (difficulty === "MEDIUM") color = "yellow";
    if (difficulty === "HARD") color = "red";

    return (
        <div className={`w-4 h-4 rounded-full bg-${color}-500 mr-2`}/>
    )
}

const CompletedBadge = ({completed}: { completed: boolean }) => {
    if (completed) {
        return <FaStar className={"fill-yellow-300"} size={20}/>
    }
    return null;
}