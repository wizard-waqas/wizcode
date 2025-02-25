import React from "react"
import {Problem} from "../../lib/types";
import {FaStar} from "react-icons/fa";

export default function ProblemsList({problems, setSelectedProblemId}: {
    problems: Problem[],
    setSelectedProblemId: (id: number) => void
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {problems.map((problem: Problem) => (
                <button
                    key={problem.id}
                    className="flex justify-between items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => setSelectedProblemId(problem.id)}
                >
                    <div className={"flex justify-start items-center"}>
                        <DifficultyBadge difficulty={problem.difficulty}/>
                        <span>{problem.title}</span>
                    </div>
                    <CompletedBadge completed={problem.completed}/>
                </button>
            ))}
        </div>
    )
}


const DifficultyBadge = ({difficulty}: { difficulty: string }) => {
    let color = "gray";
    if (difficulty === "EASY") color = "bg-green-500";
    if (difficulty === "MEDIUM") color = "bg-yellow-500";
    if (difficulty === "HARD") color = "bg-red-500";

    return (
        <div className={`w-4 h-4 rounded-full ${color} mr-2`}/>
    )
}

const CompletedBadge = ({completed}: { completed: boolean }) => {
    if (completed) {
        return <FaStar className={"fill-yellow-300"} size={20}/>
    }
    return null;
}