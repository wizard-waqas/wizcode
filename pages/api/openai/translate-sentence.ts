import { OpenAI } from "openai";
import {NextApiRequest, NextApiResponse} from "next";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { englishSentence } = req.body;

  if (!englishSentence) {
    return res.status(400).json({ error: "Missing englishSentence" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional Spanish translator. Translate the given English sentence to Spanish and provide a word-by-word breakdown. 

Return your response in the following JSON format:
{
  "spanish": "Complete Spanish translation",
  "english": "Original English sentence",
  "words": [
    {"spanish": "Spanish word", "english": "English word/phrase"},
    {"spanish": "Next Spanish word", "english": "Next English word/phrase"}
  ],
  "category": "general"
}

Make sure the translation is accurate and natural. For the word-by-word breakdown, group related words appropriately (like "I am" -> "Soy" or "of the" -> "del").`,
        },
        { 
          role: "user", 
          content: `Translate this English sentence to Spanish with word-by-word breakdown: "${englishSentence}"` 
        },
      ],
      temperature: 0.3,
    });

    const translationResult = response.choices[0].message.content;
    
    try {
      const parsedResult = JSON.parse(translationResult);
      res.status(200).json(parsedResult);
    } catch (parseError) {
      // If JSON parsing fails, return a basic structure
      res.status(200).json({
        spanish: translationResult,
        english: englishSentence,
        words: [],
        category: "general",
        error: "Could not parse word breakdown"
      });
    }
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: "Failed to translate sentence" });
  }
}

