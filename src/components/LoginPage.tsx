import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import MusicPuzzle from "./MusicPuzzle";

const triviaQuestions = [
  // {
  //   question: 'In what year was Stanford University founded?',
  //   answer: '1885',
  // },
  {
    question: "What is the name of the iconic tower on Stanford's campus?",
    answer: "Hoover Tower",
    requiresImage: true,
  },
  {
    question:
      "Look at the document to discover the clue for the color of Stanford University.",
    answer: "8c1515",
  },
];

const AcceptanceLetter = () => {
  // Get window size for confetti
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  React.useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center py-12 relative">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        colors={["#8C1515"]}
        numberOfPieces={250}
        recycle={false}
      />
      <div className="bg-white shadow-lg rounded-lg p-12 max-w-2xl w-full font-serif relative z-10">
        {/* Stanford Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/stanford_logo.png"
            alt="Stanford University Logo"
            className="h-20 mb-2"
          />
        </div>
        {/* Date and Name */}
        <div className="mb-6">
          <div className="text-sm mb-2">May 2025</div>
          <div className="text-sm mb-6">Dear Student,</div>
          <div className="text-base mb-4">
            Congratulations! It is with great pleasure that I offer you
            admission to the Stanford University Class of 2029.
          </div>
          <div className="text-base mb-4">
            Your thoughtful application and remarkable accomplishments convinced
            us that you have the intellectual energy, imagination and talent to
            flourish at Stanford. Among the over 20,000 applications we read,
            your distinguished record of academic excellence and personal
            achievement stood out. We are thrilled to welcome you to the
            Stanford community and look forward to the unique and extraordinary
            contributions we know you will make to the intellectual and
            extracurricular life of our campus.
          </div>
          <div className="text-base mb-4">
            The exciting next step is now yours. As Stanford is probably only
            one of several options you will consider in the coming weeks, I hope
            you will use the time to learn more about us. We invite you to
            participate in Admit Weekend 2005, a three-day program that will
            introduce you to the intellectual vibrancy and dynamic campus life
            that define Stanford. Information about that event is enclosed.
            Whatever decision you make, we ask that you complete the enclosed
            enrollment response card and return it to us by the postmark
            deadline of May 2, 2005. Should you decide to matriculate at
            Stanford — and we sincerely hope you do — we will send enrollment
            information to you in late May.
          </div>
          <div className="text-base mb-4">
            While we have every reason to believe you will complete this school
            year successfully, remember that your admission is contingent upon
            your continued strong academic performance in the program you
            presented to us in your application.
          </div>
          <div className="text-base mb-4">
            Once again, I extend my congratulations on your admission to
            Stanford and welcome you to the Stanford family.
          </div>
        </div>
        {/* Signature */}
        <div className="mb-8">
          <div className="mb-2">
            <img src="/signature.png" alt="Signature" className="h-8 inline" />
          </div>
          <div className="font-bold">Anna Marie Porras</div>
          <div className="text-sm">Director of Admission</div>
          <div className="mt-2 italic text-[#8C1515]">
            Bring your light saber to Stanford!
          </div>
        </div>
        {/* Footer */}
        <div className="text-xs text-gray-500 text-center border-t pt-4 mt-8">
          OFFICE OF UNDERGRADUATE ADMISSION
          <br />
          520 Lasuen Mall, Old Union 221, Stanford, CA 94305-3005
          <br />
          Tel: (650) 723-2091 · Fax: (650) 725-2846
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = ({
  onCancel,
  onNext,
}: {
  onCancel: () => void;
  onNext: () => void;
}) => {
  const [digitsFound, setDigitsFound] = useState<{ [key: string]: boolean }>({
    "0": false, // First digit (1)
    "1": false, // Second digit (8)
    "2": false, // Third digit (8)
    "3": false, // Fourth digit (5)
  });
  const [labelFade, setLabelFade] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  // Generate the SUNet ID from the found digits
  const sunetId = [
    digitsFound["0"] ? "1" : "_",
    digitsFound["1"] ? "8" : "_",
    digitsFound["2"] ? "8" : "_",
    digitsFound["3"] ? "5" : "_",
  ].join("");

  // Set up the label fade and question reveal animation
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setLabelFade(true);

      const questionTimer = setTimeout(() => {
        setShowQuestion(true);
      }, 500); // Start showing the question after fade-out completes

      return () => clearTimeout(questionTimer);
    }, 1500); // Start fading after 1.5 seconds

    return () => clearTimeout(fadeTimer);
  }, []);

  const handleDigitFound = (position: string, digit: string) => {
    if (!digitsFound[position]) {
      const newDigitsFound = { ...digitsFound, [position]: true };
      setDigitsFound(newDigitsFound);

      // Check if all digits have been found
      if (Object.values(newDigitsFound).every((found) => found)) {
        // Simply proceed to the next screen after a short delay
        setTimeout(() => {
          onNext();
        }, 1000);
      }
    }
  };

  // CSS classes for digit reveals
  const getDigitRevealClass = (position: string) =>
    `relative group ${digitsFound[position] ? "digit-found" : ""}`;
  const hiddenDigitClass =
    "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-[#8C1515] select-none";

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* Header with hidden digit "1" */}
      <header className="bg-[#8C1515] text-white p-2 flex items-center justify-between">
        <div className="flex items-center">
          <button className={getDigitRevealClass("0")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              className={hiddenDigitClass}
              onMouseEnter={() => handleDigitFound("0", "1")}
            >
              1
            </span>
          </button>
          <div className="text-lg font-bold">Stanford | Accounts</div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            StanfordYou
          </button>
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Help
          </button>
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Sign-In
          </button>
        </div>
      </header>

      {/* Left side navigation with hidden digits */}
      <div className="flex flex-1">
        <div className="w-12 bg-gray-100 flex flex-col items-center pt-4 space-y-6">
          <a href="#" className={getDigitRevealClass("1")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span
              className={hiddenDigitClass}
              onMouseEnter={() => handleDigitFound("1", "8")}
            >
              8
            </span>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </a>
          <a href="#" className={getDigitRevealClass("2")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span
              className={hiddenDigitClass}
              onMouseEnter={() => handleDigitFound("2", "8")}
            >
              8
            </span>
          </a>
          <a href="#" className={getDigitRevealClass("3")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span
              className={hiddenDigitClass}
              onMouseEnter={() => handleDigitFound("3", "5")}
            >
              5
            </span>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </a>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-[#8C1515] p-3 rounded-lg mr-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Forgot Password</h1>
              <div className="text-sm text-gray-600 flex items-center">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>Password Management</span>
                <span className="mx-2">/</span>
                <span>Forgot Password</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm mb-6 relative">
            <div className="mb-6">
              <div className="block mb-2 font-bold relative h-6">
                <span
                  className={`absolute transition-opacity duration-500 ${
                    labelFade ? "opacity-0" : "opacity-100"
                  }`}
                >
                  * SUNet ID
                </span>
                <span
                  className={`absolute text-[#8C1515] transition-opacity duration-500 ${
                    showQuestion ? "opacity-100" : "opacity-0"
                  }`}
                >
                  When was Stanford REALLY founded?
                </span>
              </div>
              <div className="relative">
                <input
                  id="sunet-id"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded font-mono text-center text-xl tracking-widest"
                  value={sunetId}
                  readOnly
                  placeholder="_ _ _ _"
                />
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Hover around the page to find the hidden digits
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-xs font-medium">
                  {digitsFound["0"] ? (
                    <span className="text-green-600">First digit found</span>
                  ) : (
                    "Find first digit"
                  )}
                </div>
                <div className="text-xs font-medium">
                  {digitsFound["1"] ? (
                    <span className="text-green-600">Second digit found</span>
                  ) : (
                    "Find second digit"
                  )}
                </div>
                <div className="text-xs font-medium">
                  {digitsFound["2"] ? (
                    <span className="text-green-600">Third digit found</span>
                  ) : (
                    "Find third digit"
                  )}
                </div>
                <div className="text-xs font-medium">
                  {digitsFound["3"] ? (
                    <span className="text-green-600">Fourth digit found</span>
                  ) : (
                    "Find fourth digit"
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onCancel}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onNext}
                className="bg-[#00505c] hover:bg-[#003d47] text-white px-6 py-2 rounded font-medium"
                disabled={sunetId !== "1885"}
              >
                Next
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
            <div className="bg-blue-500 text-white rounded-full p-1 mr-4 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p>
                If you know your password, you should change it by visiting the{" "}
                <a href="#" className={getDigitRevealClass("0")}>
                  change password page
                  <span
                    className={hiddenDigitClass}
                    onMouseEnter={() => handleDigitFound("0", "1")}
                  >
                    1
                  </span>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for styling the found digits */}
      <style>{`
        .digit-found {
          position: relative;
        }
        .digit-found::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #10B981;
          border-radius: 50%;
          top: -5px;
          right: -5px;
        }
      `}</style>

      {/* Footer */}
      <div className="mt-auto">
        <div className="bg-[#8C1515] text-white p-5">
          <div className="flex justify-center mb-4">
            <img
              src="/stanford_logo.png"
              alt="Stanford University"
              className="h-10"
            />
          </div>
          <div className="flex justify-center space-x-4 text-sm mb-2">
            <a href="#" className="hover:underline">
              Stanford Home
            </a>
            <a href="#" className="hover:underline">
              Maps & Directions
            </a>
            <a href="#" className="hover:underline">
              Search Stanford
            </a>
            <a href="#" className="hover:underline">
              Emergency Info
            </a>
          </div>
          <div className="flex justify-center space-x-4 text-sm mb-3">
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Copyright
            </a>
            <a href="#" className="hover:underline">
              Trademarks
            </a>
            <a href="#" className="hover:underline">
              Non-Discrimination
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </div>
          <div className="text-center text-sm">
            © Stanford University, Stanford, California 94305.
          </div>
        </div>
        <div className="bg-gray-100 p-1 text-xs text-gray-600">Release 1.0</div>
      </div>
    </div>
  );
};

const TriviaRecovery = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<
    "success" | "failure" | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = triviaQuestions[step];
  const requiresImage = currentQuestion.requiresImage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (requiresImage) {
      if (analysisResult === "success") {
        // Reset for next question
        setImageUrl(null);
        setIsAnalyzing(false);
        setAnalyzingProgress(0);
        setAnalysisResult(null);

        if (step === triviaQuestions.length - 1) {
          onSuccess();
        } else {
          setStep(step + 1);
        }
      } else if (!isAnalyzing && !analysisResult) {
        setError("Please upload an image and wait for analysis to complete.");
      }
    } else if (
      input.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      setInput("");
      setError("");
      if (step === triviaQuestions.length - 1) {
        onSuccess();
      } else {
        setStep(step + 1);
      }
    } else {
      setError("Incorrect! Try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        simulateImageAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageAnalysis = () => {
    setIsAnalyzing(true);
    setAnalyzingProgress(0);
    setAnalysisResult(null);

    // Mock a progressive analysis
    const interval = setInterval(() => {
      setAnalyzingProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);

          // Simulate successful analysis 80% of the time
          // In a real implementation, this would use actual computer vision
          const isSuccess = Math.random() < 0.8;
          setAnalysisResult(isSuccess ? "success" : "failure");
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const retryAnalysis = () => {
    setAnalysisResult(null);
    setImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#8C1515] mb-6">
          Answer these questions to recover your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-lg">{currentQuestion.question}</div>

          {requiresImage ? (
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />

              {!imageUrl ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={triggerFileInput}
                >
                  <div className="text-gray-500 mb-2">
                    Click to upload a photo of the Tower
                  </div>
                  <div className="text-sm text-gray-400">
                    Take a clear photo or choose from your gallery
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-48 object-cover"
                    />

                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                        <div className="text-lg mb-2">Analyzing image...</div>
                        <div className="w-3/4 bg-gray-300 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${analyzingProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {analysisResult === "success" && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center text-white">
                        <div className="bg-white bg-opacity-90 rounded-lg p-3 text-green-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Hoover Tower recognized!
                        </div>
                      </div>
                    )}

                    {analysisResult === "failure" && (
                      <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center text-white">
                        <div className="bg-white bg-opacity-90 rounded-lg p-3 text-red-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Not recognized as Hoover Tower
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="text-gray-600 bg-gray-100 px-3 py-1 rounded text-sm"
                      onClick={triggerFileInput}
                    >
                      Change photo
                    </button>

                    {analysisResult === "failure" && (
                      <button
                        type="button"
                        className="text-white bg-blue-500 px-3 py-1 rounded text-sm"
                        onClick={retryAnalysis}
                      >
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your answer"
              autoFocus
            />
          )}

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <button
            type="submit"
            className={`w-full py-2 rounded font-medium ${
              requiresImage && analysisResult === "success"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-[#8C1515] text-white"
            }`}
          >
            {requiresImage && analysisResult === "success"
              ? "Continue"
              : "Submit"}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          Question {step + 1} of {triviaQuestions.length}
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showMusicPuzzle, setShowMusicPuzzle] = useState(false);
  const [triviaSuccess, setTriviaSuccess] = useState(false);

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleForgotPasswordCancel = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPasswordNext = () => {
    setShowForgotPassword(false);
    setShowTrivia(true);
  };

  const LoginForm = () => (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* Header */}
      <header className="bg-[#8C1515] text-white p-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold">Stanford University</div>
        </div>
      </header>

      {/* Logo Section */}
      <div className="w-full px-0 pt-8 pb-6">
        <div className="text-[#8C1515] text-4xl font-serif pl-8">
          Stanford<span className="text-black ml-2">| Login</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex max-w-5xl w-full pl-8 gap-8 ml-16">
        {/* Left side - Login Form */}
        <div className="flex-1 max-w-8xl">
          <div className="bg-[#F4F4F4] p-8 rounded">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">SUNet ID</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button className="w-full bg-[#8C1515] text-white py-3 rounded font-medium">
              Login
            </button>
          </div>
        </div>

        {/* Right side - Info */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="font-bold mb-1">
              Important Security Information:
            </div>
            <p className="text-sm">
              Logging in lets you access other protected Stanford websites with
              this browser, not just the website you requested.
            </p>
          </div>
          <div>
            <a href="#" className="text-[#8C1515] hover:underline block mb-2">
              LOGIN HELP
            </a>
            <a
              href="#"
              className="text-[#8C1515] hover:underline block"
              onClick={handleForgotPassword}
            >
              FORGOT YOUR PASSWORD
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto py-8 text-center text-sm text-gray-600">
        <p>
          Use of this system is subject to Stanford University's rules and
          regulations.
        </p>
        <p>
          See the{" "}
          <a
            href="https://adminguide.stanford.edu"
            className="text-[#8C1515] hover:underline"
          >
            Stanford Administrative Guide
          </a>{" "}
          for more information.
        </p>
      </div>
    </div>
  );

  const MainPage = () => (
    <div className="min-h-screen bg-[#FAF9F6] relative">
      {/* Overlay to block all interactions except 'FORGOT YOUR PASSWORD' */}
      <div className="fixed inset-0 z-30" style={{ pointerEvents: "auto" }} />
      {/* Header */}
      <header className="bg-[#8C1515] text-white p-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-bold">Stanford University</div>
        </div>
      </header>

      {/* Logo Section */}
      <div className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-[#8C1515] text-4xl font-serif">
            Stanford
            <span className="text-black ml-2">| Axess</span>
          </div>
        </div>
      </div>

      {/* Maintenance Notice */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="border border-[#8C1515] p-4 text-center text-[#8C1515] bg-white">
          Axess will be unavailable from 5:00 AM to 8:00 AM on Saturday, May
          10th while system maintenance is performed.
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex items-center justify-center pt-16">
        {/* Left Side - Image */}
        <div className="w-[26.25%] h-full">
          <img
            src="/hoover.png"
            alt="Stanford Campus"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-[60%] bg-[#333333] px-12 py-24 flex flex-col">
          <div className="flex gap-8 flex-1 items-center">
            {/* Left side - Buttons */}
            <div className="w-1/2">
              <button className="w-full bg-[#2ECC71] text-white py-3 rounded mb-4 font-medium">
                Log In
              </button>

              <button className="w-full bg-[#FFB81C] text-black py-3 rounded mb-4 font-medium">
                SimpleEnroll
                <div className="text-sm font-normal">
                  Class Enrollment for Students
                </div>
              </button>

              <button className="w-full bg-white text-black py-3 rounded mb-4 font-medium">
                Pay Bill
                <div className="text-sm font-normal">
                  Parents & Authorized Users
                </div>
              </button>
            </div>

            {/* Right side - Info and Links */}
            <div className="w-1/2">
              <div className="bg-[#666666] p-4 rounded mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">
                    Go passwordless with Cardinal Key.
                  </span>
                  <a
                    href="https://uit.stanford.edu/service/cardinalkey"
                    className="text-white underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <p className="text-white text-sm mb-6">
                Important Security Information: Logging in lets you access other
                protected Stanford websites with this browser, not just the
                website you requested.
              </p>

              <div className="mt-6 text-center">
                <a
                  href="https://axess.stanford.edu/help"
                  className="text-white hover:underline block mb-2"
                >
                  LOGIN HELP
                </a>
                <a
                  href="#"
                  className="text-white hover:underline block z-40 relative"
                  style={{ pointerEvents: "auto" }}
                  onClick={handleForgotPassword}
                >
                  FORGOT YOUR PASSWORD
                </a>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="mt-8 text-white text-sm text-center">
            <p>
              Use of this system is subject to Stanford University's rules and
              regulations.
            </p>
            <p>
              See the{" "}
              <a href="https://adminguide.stanford.edu" className="underline">
                Stanford Administrative Guide
              </a>{" "}
              for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (showTrivia && triviaSuccess && showMusicPuzzle)
    return <AcceptanceLetter />;
  if (showTrivia && triviaSuccess)
    return <MusicPuzzle onSuccess={() => setShowMusicPuzzle(true)} />;
  if (showTrivia)
    return <TriviaRecovery onSuccess={() => setTriviaSuccess(true)} />;
  if (showForgotPassword)
    return (
      <ForgotPassword
        onCancel={handleForgotPasswordCancel}
        onNext={handleForgotPasswordNext}
      />
    );
  return showLoginForm ? <LoginForm /> : <MainPage />;
};

export default LoginPage;
