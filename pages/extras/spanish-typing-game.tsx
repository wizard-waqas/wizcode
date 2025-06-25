import React, { useState, useEffect, useRef } from 'react';
import { FaCheck, FaTimes, FaRedo, FaPlay, FaVolumeUp } from 'react-icons/fa';

// Spanish sentence database
const sentenceDatabase = [
  // Dashcam related sentences
  {
    id: 1,
    category: "dashcam",
    spanish: "La cámara del tablero graba todo el viaje",
    english: "The dashboard camera records the entire trip",
    words: [
      { spanish: "La", english: "The" },
      { spanish: "cámara", english: "camera" },
      { spanish: "del", english: "of the" },
      { spanish: "tablero", english: "dashboard" },
      { spanish: "graba", english: "records" },
      { spanish: "todo", english: "all" },
      { spanish: "el", english: "the" },
      { spanish: "viaje", english: "trip" }
    ]
  },
  {
    id: 2,
    category: "dashcam",
    spanish: "Mi dashcam tiene visión nocturna muy clara",
    english: "My dashcam has very clear night vision",
    words: [
      { spanish: "Mi", english: "My" },
      { spanish: "dashcam", english: "dashcam" },
      { spanish: "tiene", english: "has" },
      { spanish: "visión", english: "vision" },
      { spanish: "nocturna", english: "night" },
      { spanish: "muy", english: "very" },
      { spanish: "clara", english: "clear" }
    ]
  },
  {
    id: 3,
    category: "dashcam",
    spanish: "La grabación ayuda con los seguros de auto",
    english: "The recording helps with car insurance",
    words: [
      { spanish: "La", english: "The" },
      { spanish: "grabación", english: "recording" },
      { spanish: "ayuda", english: "helps" },
      { spanish: "con", english: "with" },
      { spanish: "los", english: "the" },
      { spanish: "seguros", english: "insurance" },
      { spanish: "de", english: "of" },
      { spanish: "auto", english: "car" }
    ]
  },
  {
    id: 4,
    category: "dashcam",
    spanish: "Necesito revisar las imágenes del accidente",
    english: "I need to review the accident footage",
    words: [
      { spanish: "Necesito", english: "I need" },
      { spanish: "revisar", english: "to review" },
      { spanish: "las", english: "the" },
      { spanish: "imágenes", english: "images" },
      { spanish: "del", english: "of the" },
      { spanish: "accidente", english: "accident" }
    ]
  },
  {
    id: 5,
    category: "car",
    spanish: "Voy a llenar el tanque de gasolina",
    english: "I'm going to fill the gas tank",
    words: [
      { spanish: "Voy", english: "I'm going" },
      { spanish: "a", english: "to" },
      { spanish: "llenar", english: "fill" },
      { spanish: "el", english: "the" },
      { spanish: "tanque", english: "tank" },
      { spanish: "de", english: "of" },
      { spanish: "gasolina", english: "gasoline" }
    ]
  },
  {
    id: 6,
    category: "car",
    spanish: "Los frenos necesitan mantenimiento urgente",
    english: "The brakes need urgent maintenance",
    words: [
      { spanish: "Los", english: "The" },
      { spanish: "frenos", english: "brakes" },
      { spanish: "necesitan", english: "need" },
      { spanish: "mantenimiento", english: "maintenance" },
      { spanish: "urgente", english: "urgent" }
    ]
  },
  {
    id: 7,
    category: "conversation",
    spanish: "¿Cómo está el tráfico esta mañana?",
    english: "How is the traffic this morning?",
    words: [
      { spanish: "¿Cómo", english: "How" },
      { spanish: "está", english: "is" },
      { spanish: "el", english: "the" },
      { spanish: "tráfico", english: "traffic" },
      { spanish: "esta", english: "this" },
      { spanish: "mañana?", english: "morning?" }
    ]
  },
  {
    id: 8,
    category: "conversation",
    spanish: "Tengo que llegar temprano al trabajo",
    english: "I have to arrive early to work",
    words: [
      { spanish: "Tengo", english: "I have" },
      { spanish: "que", english: "to" },
      { spanish: "llegar", english: "arrive" },
      { spanish: "temprano", english: "early" },
      { spanish: "al", english: "to the" },
      { spanish: "trabajo", english: "work" }
    ]
  }
];

const GAME_PHASES = {
  MENU: 'menu',
  WORD_TYPING: 'word_typing',
  SENTENCE_TYPING: 'sentence_typing',
  REVERSE_TRANSLATION: 'reverse_translation',
  COMPLETED: 'completed'
};

interface Word {
  spanish: string;
  english: string;
}

interface Sentence {
  id: number;
  category: string;
  spanish: string;
  english: string;
  words: Word[];
}

const getRandomSentence = (): Sentence => {
  // Get custom sentences from localStorage
  const customSentences = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('customSentences') || '[]') 
    : [];
  
  // Combine default and custom sentences
  const allSentences = [...sentenceDatabase, ...customSentences];
  
  if (allSentences.length === 0) {
    // Fallback to default sentences if no sentences available
    return sentenceDatabase[0];
  }
  
  const randomIndex = Math.floor(Math.random() * allSentences.length);
  return allSentences[randomIndex];
};

export default function SpanishTypingGame() {
  const [gamePhase, setGamePhase] = useState(GAME_PHASES.MENU);
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedWords, setCompletedWords] = useState<Word[]>([]);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintTimer, setHintTimer] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    successAudioRef.current = new Audio('/audio/success.mp3');
    successAudioRef.current.volume = 0.3; // Soft volume
  }, []);

  useEffect(() => {
    if (inputRef.current && gamePhase !== GAME_PHASES.MENU && gamePhase !== GAME_PHASES.COMPLETED) {
      inputRef.current.focus();
    }
  }, [gamePhase, currentWordIndex]);

  // Hint timer for phase 3
  useEffect(() => {
    if (gamePhase === GAME_PHASES.REVERSE_TRANSLATION && !showHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 3000);
      setHintTimer(timer);
      
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [gamePhase, currentWordIndex, userInput]);

  // Reset hint when user types
  useEffect(() => {
    if (userInput && hintTimer) {
      clearTimeout(hintTimer);
      setHintTimer(null);
    }
  }, [userInput, hintTimer]);

  // Text-to-Speech function
  const speakSpanish = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Spanish language
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  // Play success sound
  const playSuccessSound = () => {
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0; // Reset to start
      successAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const startGame = () => {
    const sentence = getRandomSentence();
    setCurrentSentence(sentence);
    setGamePhase(GAME_PHASES.WORD_TYPING);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setCompletedWords([]);
    setErrors(0);
    setStartTime(Date.now());
    setEndTime(null);
    setShowHint(false);
    
    // Auto-speak the first word
    setTimeout(() => {
      speakSpanish(sentence.words[0].spanish);
    }, 500);
  };

  const resetGame = () => {
    setGamePhase(GAME_PHASES.MENU);
    setCurrentSentence(null);
    setCurrentWordIndex(0);
    setUserInput('');
    setIsCorrect(null);
    setCompletedWords([]);
    setErrors(0);
    setStartTime(null);
    setEndTime(null);
    setShowHint(false);
    if (hintTimer) {
      clearTimeout(hintTimer);
      setHintTimer(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setIsCorrect(null);
    
    // Reset hint when user starts typing in phase 3
    if (gamePhase === GAME_PHASES.REVERSE_TRANSLATION && showHint) {
      setShowHint(false);
    }
  };

  const checkAnswer = () => {
    if (!currentSentence) return;

    let expectedAnswer = '';
    
    if (gamePhase === GAME_PHASES.WORD_TYPING) {
      expectedAnswer = currentSentence.words[currentWordIndex].spanish;
    } else if (gamePhase === GAME_PHASES.SENTENCE_TYPING) {
      expectedAnswer = currentSentence.spanish;
    } else if (gamePhase === GAME_PHASES.REVERSE_TRANSLATION) {
      expectedAnswer = currentSentence.words[currentWordIndex].spanish;
    }

    const isAnswerCorrect = userInput.trim().toLowerCase() === expectedAnswer.toLowerCase();
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      playSuccessSound(); // Play success sound
      setTimeout(() => {
        moveToNext();
      }, 1000);
    } else {
      setErrors(errors + 1);
      setTimeout(() => {
        setIsCorrect(null);
        setUserInput('');
      }, 1500);
    }
  };

  const moveToNext = () => {
    if (gamePhase === GAME_PHASES.WORD_TYPING) {
      const newCompletedWords = [...completedWords, currentSentence!.words[currentWordIndex]];
      setCompletedWords(newCompletedWords);
      
      if (currentWordIndex + 1 < currentSentence!.words.length) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
        setIsCorrect(null);
        // Auto-speak the next word
        setTimeout(() => {
          speakSpanish(currentSentence!.words[currentWordIndex + 1].spanish);
        }, 500);
      } else {
        setGamePhase(GAME_PHASES.SENTENCE_TYPING);
        setUserInput('');
        setIsCorrect(null);
        // Auto-speak the complete sentence
        setTimeout(() => {
          speakSpanish(currentSentence!.spanish);
        }, 500);
      }
    } else if (gamePhase === GAME_PHASES.SENTENCE_TYPING) {
      setGamePhase(GAME_PHASES.REVERSE_TRANSLATION);
      setCurrentWordIndex(0);
      setUserInput('');
      setIsCorrect(null);
      setShowHint(false);
    } else if (gamePhase === GAME_PHASES.REVERSE_TRANSLATION) {
      if (currentWordIndex + 1 < currentSentence!.words.length) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput('');
        setIsCorrect(null);
        setShowHint(false);
      } else {
        setGamePhase(GAME_PHASES.COMPLETED);
        setEndTime(Date.now());
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const getProgressPercentage = () => {
    if (!currentSentence) return 0;
    
    if (gamePhase === GAME_PHASES.WORD_TYPING) {
      return (currentWordIndex / currentSentence.words.length) * 33;
    } else if (gamePhase === GAME_PHASES.SENTENCE_TYPING) {
      return 33;
    } else if (gamePhase === GAME_PHASES.REVERSE_TRANSLATION) {
      return 66 + (currentWordIndex / currentSentence.words.length) * 34;
    }
    return 100;
  };

  const getGameTime = () => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    return Math.round((end - startTime) / 1000);
  };

  const getHintText = () => {
    if (!showHint || !currentSentence) return '';
    return currentSentence.words[currentWordIndex].spanish.charAt(0);
  };

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Spanish Typing Game</h1>
        <p className="text-gray-300 mb-8">
          Learn Spanish vocabulary through typing practice with dashcam, car, and everyday conversation topics.
        </p>
        <div className="text-sm text-gray-400 mb-8">
          <p><strong>How to play:</strong></p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Type each Spanish word individually with English translation shown</li>
            <li>Type the complete Spanish sentence</li>
            <li>Translate English words back to Spanish</li>
          </ol>
          <p className="mt-4 text-xs text-gray-500">
            🔊 Voice reading and sound effects included for enhanced learning!
          </p>
        </div>
        <button 
          onClick={startGame} 
          className="bg-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors flex items-center mx-auto"
        >
          <FaPlay className="mr-2" />
          Start Game
        </button>
      </div>
    </div>
  );

  const renderWordTyping = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Phase 1: Word by Word</h2>
          <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
            {currentWordIndex + 1} / {currentSentence!.words.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-blue h-2 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        <div className="text-center space-y-6">
          <div className="text-sm text-gray-400">English Translation:</div>
          <div className="text-xl font-medium text-blue">
            {currentSentence!.words[currentWordIndex].english}
          </div>
          <div className="text-sm text-gray-400">Type the Spanish word:</div>
          <div className="text-3xl font-bold flex items-center justify-center gap-4">
            {currentSentence!.words[currentWordIndex].spanish}
            <button
              onClick={() => speakSpanish(currentSentence!.words[currentWordIndex].spanish)}
              className="text-blue hover:text-blue-400 transition-colors"
              title="Listen to pronunciation"
            >
              <FaVolumeUp className="text-xl" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          <input
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type the Spanish word here..."
            className={`w-full text-center text-lg p-4 rounded-lg bg-gray-800 border-2 ${
              isCorrect === true ? 'border-green-500' : 
              isCorrect === false ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-blue`}
          />
          
          {isCorrect !== null && (
            <div className={`flex items-center justify-center space-x-2 ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? <FaCheck /> : <FaTimes />}
              <span>{isCorrect ? 'Correct!' : 'Try again!'}</span>
            </div>
          )}
          
          <button 
            onClick={checkAnswer} 
            className="w-full bg-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
            disabled={!userInput.trim()}
          >
            Check Answer
          </button>
        </div>

        {completedWords.length > 0 && (
          <div className="mt-8">
            <div className="text-sm text-gray-400 mb-2">Completed words:</div>
            <div className="flex flex-wrap gap-2">
              {completedWords.map((word, index) => (
                <span key={index} className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {word.spanish}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSentenceTyping = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Phase 2: Complete Sentence</h2>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-blue h-2 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        <div className="text-center space-y-6">
          <div className="text-sm text-gray-400">English Translation:</div>
          <div className="text-xl font-medium text-blue">
            {currentSentence!.english}
          </div>
          <div className="text-sm text-gray-400">Type the complete Spanish sentence:</div>
          <div className="text-2xl font-bold flex items-center justify-center gap-4">
            {currentSentence!.spanish}
            <button
              onClick={() => speakSpanish(currentSentence!.spanish)}
              className="text-blue hover:text-blue-400 transition-colors"
              title="Listen to pronunciation"
            >
              <FaVolumeUp className="text-xl" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          <input
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type the complete Spanish sentence here..."
            className={`w-full text-center p-4 rounded-lg bg-gray-800 border-2 ${
              isCorrect === true ? 'border-green-500' : 
              isCorrect === false ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-blue`}
          />
          
          {isCorrect !== null && (
            <div className={`flex items-center justify-center space-x-2 ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? <FaCheck /> : <FaTimes />}
              <span>{isCorrect ? 'Perfect!' : 'Check your spelling and try again!'}</span>
            </div>
          )}
          
          <button 
            onClick={checkAnswer} 
            className="w-full bg-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
            disabled={!userInput.trim()}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );

  const renderReverseTranslation = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Phase 3: Reverse Translation</h2>
          <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
            {currentWordIndex + 1} / {currentSentence!.words.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-blue h-2 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        <div className="text-center space-y-6">
          <div className="text-sm text-gray-400">Translate this English word to Spanish:</div>
          <div className="text-3xl font-bold text-blue">
            {currentSentence!.words[currentWordIndex].english}
          </div>
          {showHint && (
            <div className="text-sm text-yellow-400">
              💡 Hint: Starts with "{getHintText()}"
            </div>
          )}
        </div>
        
        <div className="space-y-4 mt-8">
          <input
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type the Spanish translation here..."
            className={`w-full text-center text-lg p-4 rounded-lg bg-gray-800 border-2 ${
              isCorrect === true ? 'border-green-500' : 
              isCorrect === false ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:border-blue`}
          />
          
          {isCorrect !== null && (
            <div className={`flex items-center justify-center space-x-2 ${
              isCorrect ? 'text-green-400' : 'text-red-400'
            }`}>
              {isCorrect ? <FaCheck /> : <FaTimes />}
              <span>
                {isCorrect ? 'Excellent!' : `Correct answer: ${currentSentence!.words[currentWordIndex].spanish}`}
              </span>
            </div>
          )}
          
          <button 
            onClick={checkAnswer} 
            className="w-full bg-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
            disabled={!userInput.trim()}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );

  const renderCompleted = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">¡Felicidades! Game Completed!</h2>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div className="bg-green-500 h-2 rounded-full w-full"></div>
        </div>

        <div className="space-y-6">
          <div className="text-lg">
            <strong>Sentence practiced:</strong>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <div className="text-xl font-medium flex items-center justify-center gap-4">
              {currentSentence!.spanish}
              <button
                onClick={() => speakSpanish(currentSentence!.spanish)}
                className="text-blue hover:text-blue-400 transition-colors"
                title="Listen to pronunciation"
              >
                <FaVolumeUp className="text-lg" />
              </button>
            </div>
            <div className="text-sm text-gray-400 mt-2">{currentSentence!.english}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue">{getGameTime()}s</div>
              <div className="text-sm text-gray-400">Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{errors}</div>
              <div className="text-sm text-gray-400">Errors</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          <button 
            onClick={startGame} 
            className="w-full bg-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <FaPlay className="mr-2" />
            Play Again
          </button>
          <button 
            onClick={resetGame} 
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <FaRedo className="mr-2" />
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {gamePhase === GAME_PHASES.MENU && renderMenu()}
      {gamePhase === GAME_PHASES.WORD_TYPING && renderWordTyping()}
      {gamePhase === GAME_PHASES.SENTENCE_TYPING && renderSentenceTyping()}
      {gamePhase === GAME_PHASES.REVERSE_TRANSLATION && renderReverseTranslation()}
      {gamePhase === GAME_PHASES.COMPLETED && renderCompleted()}
      
      {gamePhase !== GAME_PHASES.MENU && gamePhase !== GAME_PHASES.COMPLETED && (
        <div className="fixed bottom-4 right-4">
          <button 
            onClick={resetGame} 
            className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
          >
            <FaRedo />
          </button>
        </div>
      )}
    </div>
  );
}

