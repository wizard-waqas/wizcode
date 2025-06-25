import React, { useState } from 'react';
import { FaPlus, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

interface Word {
  spanish: string;
  english: string;
}

interface TranslationResult {
  spanish: string;
  english: string;
  words: Word[];
  category: string;
  error?: string;
}

export default function SentenceInputSection() {
  const [inputSentence, setInputSentence] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTranslate = async () => {
    if (!inputSentence.trim()) {
      setError('Please enter a sentence to translate');
      return;
    }

    setIsTranslating(true);
    setError('');
    setTranslationResult(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/openai/translate-sentence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          englishSentence: inputSentence.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const result: TranslationResult = await response.json();
      setTranslationResult(result);
      
      // Save to localStorage for the Spanish typing game
      const existingSentences = JSON.parse(localStorage.getItem('customSentences') || '[]');
      const newSentence = {
        id: Date.now(),
        category: 'custom',
        spanish: result.spanish,
        english: result.english,
        words: result.words.length > 0 ? result.words : [
          { spanish: result.spanish, english: result.english }
        ]
      };
      
      existingSentences.push(newSentence);
      localStorage.setItem('customSentences', JSON.stringify(existingSentences));
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setInputSentence('');
        setTranslationResult(null);
      }, 3000);

    } catch (err) {
      setError('Failed to translate sentence. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTranslating) {
      handleTranslate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Add Custom Sentences</h2>
        <p className="text-gray-300">
          Enter an English sentence and we'll translate it to Spanish for your typing practice!
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an English sentence to translate..."
              className="flex-1 p-4 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
              disabled={isTranslating}
            />
            <button
              onClick={handleTranslate}
              disabled={isTranslating || !inputSentence.trim()}
              className="px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              {isTranslating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Sentence
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
              <FaTimes />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-400 bg-green-900/20 p-3 rounded-lg">
              <FaCheck />
              Sentence added successfully! You can now practice it in the Spanish Typing Game.
            </div>
          )}

          {translationResult && !success && (
            <div className="bg-gray-700 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">English:</h3>
                <p className="text-white">{translationResult.english}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Spanish Translation:</h3>
                <p className="text-blue-400 text-lg font-medium">{translationResult.spanish}</p>
              </div>
              {translationResult.words && translationResult.words.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Word Breakdown:</h3>
                  <div className="flex flex-wrap gap-2">
                    {translationResult.words.map((word, index) => (
                      <div key={index} className="bg-gray-600 rounded-lg p-2 text-sm">
                        <div className="text-blue-300 font-medium">{word.spanish}</div>
                        <div className="text-gray-400 text-xs">{word.english}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {translationResult.error && (
                <div className="text-yellow-400 text-sm">
                  Note: {translationResult.error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          Added sentences will be available in the{' '}
          <a href="/extras/spanish-typing-game" className="text-blue-400 hover:text-blue-300 underline">
            Spanish Typing Game
          </a>
        </p>
      </div>
    </div>
  );
}

