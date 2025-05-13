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

  useEffect(() => {
    if (correctGuesses === 3) {
      setShowWordScramble(true);
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

  const handleScrambleSubmit = () => {
    if (scrambleAnswer.toUpperCase() === finalAnswer) {
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
              Unscramble the Letters in the Text Input below
            </h2>
            <div className="flex justify-center gap-2 mb-6">
              {["G", "F", "T", "S", "N", "R", "C", "O", "E"].map(
                (letter, index) => (
                  <span
                    key={index}
                    className="letter p-3 bg-[#8C1515] text-white rounded"
                  >
                    {letter}
                  </span>
                )
              )}
            </div>
            <div className="text-2xl mb-6 tracking-widest text-center">
              _ _ _ _ _ _ _ _ at _ _ _ _ _
            </div>
            <div className="flex justify-center gap-4">
              <input
                type="text"
                value={scrambleAnswer}
                onChange={(e) => setScrambleAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="p-3 border-2 border-[#8C1515] rounded w-64"
              />
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
