import * as ts from "typescript";

export default async function runCode(userCode: string, testCases: { input: string; expectedOutput: string }[]) {
    try {
        // Transpile TypeScript to JavaScript
        const transpiledCode = ts.transpileModule(userCode, {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;

        // Initialize console output capture
        let consoleOutput = '';
        const captureLog = (...args: any[]) => {
            consoleOutput += args.map(arg => JSON.stringify(arg)).join(' ') + '\n';
        };

        // Construct the function wrapper
        const wrappedCode = `
      "use strict";
      // Override console.log to capture output
      const console = { log: (...args) => { captureLog(...args); } };
      
      // User code
      ${transpiledCode}
    `;

        const functionName = extractFunctionName(userCode);

        // Map over test cases and evaluate each one
        const results = testCases.map((test, index) => {
            // Create a new Function with wrappedCode and execute user's function
            const func = new Function("arr", "captureLog", `${wrappedCode} return ${functionName}(arr);`);
            const inputArray = JSON.parse(test.input); // Parse test input
            const result = func(inputArray, captureLog); // Execute the function with inputArray and captureLog

            return formatOutput(index, test, result)
        });

        let finalOutput = `\n${results.join("\n")}`;
        if (consoleOutput.trim() !== '') {
            finalOutput += `\n\nConsole Output:\n${consoleOutput}`;
        }

        return finalOutput;
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
}

function formatOutput(index: number, test: any, result: any) {
    let formattedResult = result;
    if (Array.isArray(result)) {
        formattedResult = JSON.stringify(result);
    }
    const expectedArray = JSON.parse(test.expectedOutput);
    console.log(result);
    console.log(expectedArray);
    const isPassed = valuesAreEqual(result, expectedArray);
    console.log({isPassed})
    console.log("end")
    return `Test ${index + 1}: ${isPassed ? "✅ Passed" : `❌ Failed (Expected: ${test.expectedOutput}, Got: ${formattedResult})`}`;
}

function extractFunctionName(code: string) {
    // Regex to match function name
    const functionNameRegex = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/;
    const match = code.match(functionNameRegex);

    // If a match is found, return the function name (captured group)
    if (match && match[1]) {
        return match[1];
    }

    return null;
}

function valuesAreEqual(expected: any, actual: any): boolean {
    // If both are arrays, compare them element by element
    if (Array.isArray(expected) && Array.isArray(actual)) {
        if (expected.length !== actual.length) return false;
        for (let i = 0; i < expected.length; i++) {
            if (!valuesAreEqual(expected[i], actual[i])) return false; // Recursively compare elements
        }
        return true;
    }

    // If both are objects, compare their properties
    if (typeof expected === "object" && typeof actual === "object" && expected !== null && actual !== null) {
        const expectedKeys = Object.keys(expected);
        const actualKeys = Object.keys(actual);
        if (expectedKeys.length !== actualKeys.length) return false;
        for (const key of expectedKeys) {
            if (!valuesAreEqual(expected[key], actual[key])) return false; // Recursively compare properties
        }
        return true;
    }

    // For primitive values (numbers, strings, booleans), use strict equality
    return expected === actual;
}