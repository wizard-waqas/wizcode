import {useState} from "react";
import {Disclosure} from "@headlessui/react";
import {FaChevronUp} from "react-icons/fa"; // Import from react-icons
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


const syntaxTopics = [
    {
        title: "Variables",
        syntax: "const VAR_NAME = VALUE;",
        example: "const age = 25;"
    },
    {
        title: "If Statements",
        syntax: "if (CONDITION) { ACTION; } else { ELSE_ACTION; }",
        example: "if (age >= 18) { console.log(\"Adult\"); } else { console.log(\"Minor\"); }"
    },
    {
        title: "For Loops",
        syntax: "for (let i = START; i < END; i++) { ACTION; }",
        example: "for (let i = 0; i < 5; i++) { console.log(i); }"
    },
    {
        title: "Array Map",
        syntax: "ARRAY.map((ITEM) => { ACTION; });",
        example: "const doubled = [1, 2, 3].map(num => num * 2);"
    }
];

export default function SyntaxReference() {
    const [search, setSearch] = useState("");

    const filteredTopics = syntaxTopics.filter(topic =>
        topic.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside
            className="hidden lg:block w-80 bg-gray-900 text-white p-4 h-screen overflow-y-auto border-l border-gray-700">
            <h2 className="text-xl font-semibold mb-3">Syntax Reference</h2>
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-2">
                {filteredTopics.map((topic, index) => (
                    <Disclosure key={index}>
                        {({open}) => (
                            <div className="border border-gray-700 rounded overflow-hidden">
                                <Disclosure.Button
                                    className="flex justify-between w-full p-3 bg-gray-800 hover:bg-gray-700">
                                    <span>{topic.title}</span>
                                    <FaChevronUp
                                        className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="p-3 bg-gray-850">
                                    <p className="text-gray-400">Syntax:</p>
                                    <SyntaxHighlighter language="javascript" style={atomOneDark}>
                                        {topic.syntax}
                                    </SyntaxHighlighter>
                                    <p className="text-gray-400 mt-2">Example:</p>
                                    <SyntaxHighlighter language="javascript" style={atomOneDark}>
                                        {topic.example}
                                    </SyntaxHighlighter>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </aside>
    );
}
