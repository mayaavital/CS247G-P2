import React, { useState, useEffect, useRef } from "react";

interface AudioTiming {
  start: number;
  end: number;
}

interface AudioTimings {
  [key: string]: AudioTiming;
}

type PerformanceId = "performance1" | "performance2" | "performance3";

const correctAnswers = {
  performance1: "grateful-dead",
  performance2: "louis-armstrong",
  performance3: "doechii",
} as const;

const highlightLetters = {
  "grateful-dead": ["g", "f", "t"],
  "louis-armstrong": ["s", "n", "r"],
  doechii: ["c", "o", "e"],
};

const finalAnswer = "CONCERTS AT FROST";

const audioTimings: AudioTimings = {
  performance1: { start: 430, end: 780 },
  performance2: { start: 0, end: 65 },
  performance3: { start: 15, end: 200 },
};

interface MusicPuzzleProps {
  onSuccess: () => void;
}

const MusicPuzzle: React.FC<MusicPuzzleProps> = ({ onSuccess }) => {
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [showWordScramble, setShowWordScramble] = useState(false);
  const [scrambleAnswer, setScrambleAnswer] = useState("");
  const [scrambleResult, setScrambleResult] = useState("");
  const [scrambleResultClass, setScrambleResultClass] = useState("");
  const [results, setResults] = useState<{ [key: string]: string }>({});
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [filledLetters, setFilledLetters] = useState<string[]>([]);
  const [blankPositions, setBlankPositions] = useState<number[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (correctGuesses === 3) {
      setShowWordScramble(true);
      // Initialize available letters and blank positions
      const allLetters = [
        "C",
        "O",
        "N",
        "C",
        "E",
        "R",
        "T",
        "S",
        "A",
        "T",
        "F",
        "R",
        "O",
        "S",
        "T",
      ];
      setAvailableLetters(shuffleArray(allLetters));
      setFilledLetters(Array(15).fill("")); // 14 positions for "CONCERTS AT FROST"
      setBlankPositions([0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]); // Positions for blanks (excluding space at 8)
    }
  }, [correctGuesses]);

  const handleAudioPlay = (
    audio: HTMLAudioElement,
    performanceId: PerformanceId
  ) => {
    const timing = audioTimings[performanceId];
    audio.currentTime = timing.start;
  };

  const handleAudioTimeUpdate = (
    audio: HTMLAudioElement,
    performanceId: PerformanceId
  ) => {
    const timing = audioTimings[performanceId];
    if (audio.currentTime >= timing.end) {
      audio.pause();
      audio.currentTime = timing.start;
    }
  };

  const handleGuess = (
    performanceId: PerformanceId,
    selectedAnswer: string
  ) => {
    if (selectedAnswer === correctAnswers[performanceId]) {
      const letters = highlightLetters[selectedAnswer];
      const secretLettersMessage = `Correct! Secret letters: ${letters.join(
        ", "
      )}`;

      setResults((prev) => ({
        ...prev,
        [performanceId]: secretLettersMessage,
      }));

      setDisabledButtons((prev) => ({
        ...prev,
        [selectedAnswer]: true,
      }));

      setCorrectGuesses((prev) => prev + 1);
    } else {
      setResults((prev) => ({
        ...prev,
        [performanceId]: "Try again!",
      }));
    }
  };

  const handleLetterClick = (letter: string, index: number) => {
    // Find the first empty position
    const emptyIndex = filledLetters.findIndex((letter) => letter === "");
    if (emptyIndex !== -1) {
      const newFilledLetters = [...filledLetters];
      newFilledLetters[emptyIndex] = letter;
      setFilledLetters(newFilledLetters);

      // Remove the letter from available letters
      const newAvailableLetters = [...availableLetters];
      newAvailableLetters.splice(index, 1);
      setAvailableLetters(newAvailableLetters);

      // Update the scramble answer
      setScrambleAnswer(newFilledLetters.join(""));
    }
  };

  const handleFilledLetterClick = (index: number) => {
    if (filledLetters[index] !== "") {
      // Add the letter back to available letters
      setAvailableLetters([...availableLetters, filledLetters[index]]);

      // Remove the letter from filled letters
      const newFilledLetters = [...filledLetters];
      newFilledLetters[index] = "";
      setFilledLetters(newFilledLetters);

      // Update the scramble answer
      setScrambleAnswer(newFilledLetters.join(""));
    }
  };

  const handleScrambleSubmit = () => {
    // Insert spaces at the correct positions (after "CONCERTS" and "AT")
    const answerWithSpaces = filledLetters
      .map((letter, index) => {
        if (index === 8 || index === 10) {
          return " " + letter;
        }
        return letter;
      })
      .join("")
      .trim();

    if (answerWithSpaces.toUpperCase() === finalAnswer) {
      setScrambleResult("Congratulations! You solved the puzzle!");
      setScrambleResultClass("scramble-result correct");
      onSuccess();
    } else {
      setScrambleResult("Not quite right. Try again!");
      setScrambleResultClass("scramble-result incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center py-12">
      <div className="container max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">
          Guess the Artist of each performance & unscramble the secret word
        </h1>

        {/* Performance 1 */}
        <div className="performance-section mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Performance 1</h2>
          <audio
            controls
            onPlay={(e) => handleAudioPlay(e.currentTarget, "performance1")}
            onTimeUpdate={(e) =>
              handleAudioTimeUpdate(e.currentTarget, "performance1")
            }
          >
            <source src="/audio/grateful-dead.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className={`option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors ${
                disabledButtons["grateful-dead"]
                  ? "bg-[#8C1515] text-white"
                  : ""
              }`}
              onClick={() => handleGuess("performance1", "grateful-dead")}
              disabled={disabledButtons["grateful-dead"]}
            >
              The Grateful Dead
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance1", "wrong1")}
            >
              Jefferson Airplane
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance1", "wrong2")}
            >
              Bob Dylan
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance1", "wrong3")}
            >
              Phish
            </button>
          </div>
          {results["performance1"] && (
            <div
              className={`mt-4 p-3 rounded ${
                results["performance1"].includes("Correct")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {results["performance1"]}
            </div>
          )}
        </div>

        {/* Performance 2 */}
        <div className="performance-section mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Performance 2</h2>
          <audio
            controls
            onPlay={(e) => handleAudioPlay(e.currentTarget, "performance2")}
            onTimeUpdate={(e) =>
              handleAudioTimeUpdate(e.currentTarget, "performance2")
            }
          >
            <source src="/audio/louis-armstrong.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance2", "wrong4")}
            >
              Ray Charles
            </button>
            <button
              className={`option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors ${
                disabledButtons["louis-armstrong"]
                  ? "bg-[#8C1515] text-white"
                  : ""
              }`}
              onClick={() => handleGuess("performance2", "louis-armstrong")}
              disabled={disabledButtons["louis-armstrong"]}
            >
              Louis Armstrong
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance2", "wrong5")}
            >
              Nat King Cole
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance2", "wrong6")}
            >
              Frank Sinatra
            </button>
          </div>
          {results["performance2"] && (
            <div
              className={`mt-4 p-3 rounded ${
                results["performance2"].includes("Correct")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {results["performance2"]}
            </div>
          )}
        </div>

        {/* Performance 3 */}
        <div className="performance-section mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Performance 3</h2>
          <audio
            controls
            onPlay={(e) => handleAudioPlay(e.currentTarget, "performance3")}
            onTimeUpdate={(e) =>
              handleAudioTimeUpdate(e.currentTarget, "performance3")
            }
          >
            <source src="/audio/doechii.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance3", "wrong7")}
            >
              Doja Cat
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance3", "wrong8")}
            >
              SZA
            </button>
            <button
              className={`option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors ${
                disabledButtons["doechii"] ? "bg-[#8C1515] text-white" : ""
              }`}
              onClick={() => handleGuess("performance3", "doechii")}
              disabled={disabledButtons["doechii"]}
            >
              Doechii
            </button>
            <button
              className="option p-3 border-2 border-[#8C1515] rounded hover:bg-[#8C1515] hover:text-white transition-colors"
              onClick={() => handleGuess("performance3", "wrong9")}
            >
              Flo Milli
            </button>
          </div>
          {results["performance3"] && (
            <div
              className={`mt-4 p-3 rounded ${
                results["performance3"].includes("Correct")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {results["performance3"]}
            </div>
          )}
        </div>

        {/* Word Scramble Section */}
        {showWordScramble && (
          <div className="word-scramble-section p-8 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-center">
              What do these three artists have in common?
            </h2>
            <div className="flex justify-center gap-2 mb-6">
              {availableLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleLetterClick(letter, index)}
                  className="letter p-3 bg-[#8C1515] text-white rounded hover:bg-[#6B0F0F] transition-colors cursor-pointer"
                >
                  {letter}
                </button>
              ))}
            </div>
            <div className="text-2xl mb-6 tracking-widest text-center flex justify-center gap-2">
              {filledLetters.map((letter, index) => (
                <React.Fragment key={index}>
                  {index === 8 && <div className="w-4" />}
                  {index === 10 && <div className="w-4" />}
                  <span
                    onClick={() => handleFilledLetterClick(index)}
                    className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
                      letter
                        ? "bg-[#8C1515] text-white rounded"
                        : "border-b-2 border-gray-400"
                    }`}
                  >
                    {letter || "_"}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleScrambleSubmit}
                className="p-3 bg-[#8C1515] text-white rounded hover:bg-[#6B0F0F] transition-colors"
              >
                Submit
              </button>
            </div>
            {scrambleResult && (
              <div
                className={`mt-4 p-3 rounded ${scrambleResultClass} text-center`}
              >
                {scrambleResult}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPuzzle;
