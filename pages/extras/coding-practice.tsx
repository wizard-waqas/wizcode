import {useState, useEffect} from "react";
import CodeEditor from "../../components/coding-practice/CodeEditor";
import ProblemsList from "../../components/coding-practice/ProblemsList";
import SyntaxReference from "../../components/coding-practice/SyntaxReference";

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
                <ProblemsList problems={problems} setSelectedProblemId={setSelectedProblemId}/>
            </div>
        )
    }

    return (
        <div className="flex justify-center mt-8 h-screen mx-4">
            <CodeEditor problems={problems} selectedProblemId={selectedProblemId - 1}
                        setSelectedProblemId={setSelectedProblemId}/>
            <SyntaxReference/>
        </div>
    );
}


