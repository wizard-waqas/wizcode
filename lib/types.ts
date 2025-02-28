export interface Problem {
    id: number;
    title: string;
    description: string;
    examples: { input: string; output: string }[];
    testCases: { input: string; expectedOutput: string }[];
    hints: string[];
    bonuses: string[];
    functionStub: string;
    completed: boolean;
    difficulty: string;
}

enum Difficulty {
    EASY,
    MEDIUM,
    HARD
}

export interface CodeTestCase {
    input: string;
    expectedOutput: string
}