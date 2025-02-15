import { OpenAI } from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userCode } = req.body;

  if (!userCode) {
    return res.status(400).json({ error: "Missing userCode" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at debugging code. Analyze the provided code and explain only why it is incorrect, without offering any fixed code.",
        },
        { role: "user", content: `Here is my code:\n\n${userCode}\n\nWhat am I doing wrong?` },
      ],
      temperature: 0.5,
    });

    res.status(200).json({ explanation: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
}
