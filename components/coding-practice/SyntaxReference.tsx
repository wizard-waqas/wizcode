import {useState} from "react";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type SyntaxItem = {
    title: string;
    syntax: string;
    example: string;
    color: string;
};

const syntaxData: SyntaxItem[] = [
    {
        title: "Primitive Data Types",
        syntax: `let VARIABLE_NAME: TYPE = VALUE;`,
        example: `let age: number = 25;\nlet username: string = "JohnDoe";\nlet isAdmin: boolean = false;`,
        color: "border-lightblue",
    },
    {
        title: "Dynamic Data Types",
        syntax: `let VARIABLE_NAME: TYPE[] = [VALUES];\nlet VARIABLE_NAME: Map<KEY_TYPE, VALUE_TYPE> = new Map();`,
        example: `let scores: number[] = [90, 85, 88];\nlet userRoles: Map<string, string> = new Map([["John", "admin"], ["Alice", "user"]]);`,
        color: "border-green-400",
    },
    {
        title: "Variables",
        syntax: "const VAR_NAME = VALUE;",
        example: "const age = 25;",
        color: "border-yellow-400",
    },
    {
        title: "If Statements",
        syntax: "if (CONDITION) {\n\tACTION;\n} else {\n\tELSE_ACTION;\n}",
        example: "if (age >= 18) {\n\tconsole.log(\"Adult\");\n} else {\n\tconsole.log(\"Minor\");\n}",
        color: "border-red-400",
    },
    {
        title: "For Loops",
        syntax: "for (let i = START; i < END; i++) {\n\tACTION;\n}",
        example: "for (let i = 0; i < 5; i++) {\n\tconsole.log(i);\n}",
        color: "border-gold",
    },
    {
        title: "Array Map",
        syntax: "ARRAY.map((ITEM) => { ACTION; });",
        example: "const doubled = [1, 2, 3].map(num => num * 2);",
        color: "border-pink-400",
    }, {
        title: "Conditional Operators",
        syntax: `a < b // true when a is less than b
a > b // true when a is greater than b
a >= b // true when a is greater than or equal to b
a <= b // true when a is less than or equal to b
a === b // true when a and b are equal
a !== b // true when a and b are not equal`,
        example: `if (age >= 18) {\n\tconsole.log("You can vote.");\n} else {\n\tconsole.log("You are too young to vote.");\n}`,
        color: "border-indigo-400",
    },
    {
        title: "While Loop",
        syntax: `while (CONDITION) {\n  // CODE\n}`,
        example: `let count = 0;\nwhile (count < 5) {\n\tconsole.log(count);\n\tcount += 1;\n}`,
        color: "border-orange-400",
    },
];

export default function SyntaxReference() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [search, setSearch] = useState("");

    const toggleSection = (title: string) => {
        setOpenSections((prev) => ({...prev, [title]: !prev[title]}));
    };

    const filteredData = syntaxData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside
            className="hidden lg:block w-96 p-3 bg-gray-700 rounded-lg mt-2 lg:ml-2 text-white h-fit overflow-y-auto border-l border-gray-700">
            <h2 className="text-lg font-semibold mb-2 text-gray-200">Syntax Reference</h2>
            <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-3 mb-3 bg-gray-600 border border-gray-500 rounded-lg text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-3">
                {filteredData.map((item, index) => (
                    <div
                        key={item.title}
                        className={`border-l-4 ${item.color} ${
                            index % 2 === 0 ? "bg-gray-600" : "bg-gray-600"
                        } rounded-lg overflow-hidden shadow-md`}
                    >
                        <button
                            className="w-full p-3 flex justify-between items-center text-left text-gray-200 font-medium transition-all duration-200 hover:bg-gray-500"
                            onClick={() => toggleSection(item.title)}
                        >
                            <span className="text-gray-200">{item.title}</span>
                            {openSections[item.title] ? <FiChevronUp/> : <FiChevronDown/>}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openSections[item.title] ? "max-h-screen p-2" : "max-h-0 p-0"
                            }`}
                        >
                            {openSections[item.title] && (
                                <div className="border-t border-gray-600">
                                    <p className="text-sm text-gray-300 font-semibold">Syntax:</p>
                                    <SyntaxHighlighter language="typescript" style={atomOneDark}
                                                       className="bg-gray-800 p-2 rounded-md">
                                        {item.syntax}
                                    </SyntaxHighlighter>
                                    <p className="text-sm text-gray-300 font-semibold mt-2">Example:</p>
                                    <SyntaxHighlighter language="typescript" style={atomOneDark}
                                                       className="bg-gray-800 p-2 rounded-md">
                                        {item.example}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </aside>
    );
}
