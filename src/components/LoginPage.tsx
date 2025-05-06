import React, { useState } from 'react';
import Confetti from 'react-confetti';

const triviaQuestions = [
  {
    question: 'In what year was Stanford University founded?',
    answer: '1885',
  },
  {
    question: "What is the name of the iconic tower on Stanford's campus?",
    answer: 'Hoover Tower',
  },
  {
    question: 'What is the official color of Stanford University?',
    answer: 'Cardinal',
  },
];

const AcceptanceLetter = () => {
  // Get window size for confetti
  const [dimensions, setDimensions] = React.useState({ width: window.innerWidth, height: window.innerHeight });
  React.useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center py-12 relative">
      <Confetti width={dimensions.width} height={dimensions.height} colors={["#8C1515"]} numberOfPieces={250} recycle={false} />
      <div className="bg-white shadow-lg rounded-lg p-12 max-w-2xl w-full font-serif relative z-10">
        {/* Stanford Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <img src="/stanford_logo.png" alt="Stanford University Logo" className="h-20 mb-2" />
        </div>
        {/* Date and Name */}
        <div className="mb-6">
          <div className="text-sm mb-2">May 2025</div>
          <div className="text-sm mb-6">Dear Student,</div>
          <div className="text-base mb-4">
            Congratulations! It is with great pleasure that I offer you admission to the Stanford University Class of 2029.
          </div>
          <div className="text-base mb-4">
            Your thoughtful application and remarkable accomplishments convinced us that you have the intellectual energy, imagination and talent to flourish at Stanford. Among the over 20,000 applications we read, your distinguished record of academic excellence and personal achievement stood out. We are thrilled to welcome you to the Stanford community and look forward to the unique and extraordinary contributions we know you will make to the intellectual and extracurricular life of our campus.
          </div>
          <div className="text-base mb-4">
            The exciting next step is now yours. As Stanford is probably only one of several options you will consider in the coming weeks, I hope you will use the time to learn more about us. We invite you to participate in Admit Weekend 2005, a three-day program that will introduce you to the intellectual vibrancy and dynamic campus life that define Stanford. Information about that event is enclosed. Whatever decision you make, we ask that you complete the enclosed enrollment response card and return it to us by the postmark deadline of May 2, 2005. Should you decide to matriculate at Stanford — and we sincerely hope you do — we will send enrollment information to you in late May.
          </div>
          <div className="text-base mb-4">
            While we have every reason to believe you will complete this school year successfully, remember that your admission is contingent upon your continued strong academic performance in the program you presented to us in your application.
          </div>
          <div className="text-base mb-4">
            Once again, I extend my congratulations on your admission to Stanford and welcome you to the Stanford family.
          </div>
        </div>
        {/* Signature */}
        <div className="mb-8">
          <div className="mb-2">
            <img src="/signature.png" alt="Signature" className="h-8 inline" />
          </div>
          <div className="font-bold">Anna Marie Porras</div>
          <div className="text-sm">Director of Admission</div>
          <div className="mt-2 italic text-[#8C1515]">Bring your light saber to Stanford!</div>
        </div>
        {/* Footer */}
        <div className="text-xs text-gray-500 text-center border-t pt-4 mt-8">
          OFFICE OF UNDERGRADUATE ADMISSION<br />
          520 Lasuen Mall, Old Union 221, Stanford, CA 94305-3005<br />
          Tel: (650) 723-2091 · Fax: (650) 725-2846
        </div>
      </div>
    </div>
  );
};

const TriviaRecovery = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === triviaQuestions[step].answer.toLowerCase()) {
      setInput('');
      setError('');
      if (step === triviaQuestions.length - 1) {
        onSuccess();
      } else {
        setStep(step + 1);
      }
    } else {
      setError('Incorrect! Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#8C1515] mb-6">Answer these questions to recover your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-lg">{triviaQuestions[step].question}</div>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Your answer"
            autoFocus
          />
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button type="submit" className="w-full bg-[#8C1515] text-white py-2 rounded font-medium">Submit</button>
        </form>
        <div className="mt-4 text-sm text-gray-500">Question {step + 1} of {triviaQuestions.length}</div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaSuccess, setTriviaSuccess] = useState(false);

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
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
            <div className="font-bold mb-1">Important Security Information:</div>
            <p className="text-sm">
              Logging in lets you access other protected Stanford websites with this browser, not just the website you requested.
            </p>
          </div>
          <div>
            <a href="#" className="text-[#8C1515] hover:underline block mb-2">LOGIN HELP</a>
            <a href="#" className="text-[#8C1515] hover:underline block" onClick={handleForgotPassword}>FORGOT YOUR PASSWORD</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto py-8 text-center text-sm text-gray-600">
        <p>Use of this system is subject to Stanford University's rules and regulations.</p>
        <p>See the <a href="https://adminguide.stanford.edu" className="text-[#8C1515] hover:underline">Stanford Administrative Guide</a> for more information.</p>
      </div>
    </div>
  );

  const MainPage = () => (
    <div className="min-h-screen bg-[#FAF9F6] relative">
      {/* Overlay to block all interactions except 'FORGOT YOUR PASSWORD' */}
      <div className="fixed inset-0 z-30" style={{ pointerEvents: 'auto' }} />
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
          Axess will be unavailable from 5:00 AM to 8:00 AM on Saturday, May 10th while system maintenance is performed.
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
              <button 
                className="w-full bg-[#2ECC71] text-white py-3 rounded mb-4 font-medium"
              >
                Log In
              </button>

              <button className="w-full bg-[#FFB81C] text-black py-3 rounded mb-4 font-medium">
                SimpleEnroll
                <div className="text-sm font-normal">Class Enrollment for Students</div>
              </button>

              <button className="w-full bg-white text-black py-3 rounded mb-4 font-medium">
                Pay Bill
                <div className="text-sm font-normal">Parents & Authorized Users</div>
              </button>
            </div>

            {/* Right side - Info and Links */}
            <div className="w-1/2">
              <div className="bg-[#666666] p-4 rounded mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Go passwordless with Cardinal Key.</span>
                  <a href="https://uit.stanford.edu/service/cardinalkey" className="text-white underline">Learn More</a>
                </div>
              </div>

              <p className="text-white text-sm mb-6">
                Important Security Information: Logging in lets you access other protected Stanford websites with this browser, not just the website you requested.
              </p>

              <div className="mt-6 text-center">
                <a href="https://axess.stanford.edu/help" className="text-white hover:underline block mb-2">LOGIN HELP</a>
                <a
                  href="https://accounts.stanford.edu/reset-password"
                  className="text-white hover:underline block z-40 relative"
                  style={{ pointerEvents: 'auto' }}
                  onClick={handleForgotPassword}
                >
                  FORGOT YOUR PASSWORD
                </a>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="mt-8 text-white text-sm text-center">
            <p>Use of this system is subject to Stanford University's rules and regulations.</p>
            <p>See the <a href="https://adminguide.stanford.edu" className="underline">Stanford Administrative Guide</a> for more information.</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (showTrivia && triviaSuccess) return <AcceptanceLetter />;
  if (showTrivia) return <TriviaRecovery onSuccess={() => setTriviaSuccess(true)} />;
  return showLoginForm ? <LoginForm /> : <MainPage />;
};

export default LoginPage; 