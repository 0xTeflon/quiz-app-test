"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const QUESTIONS = {
  easy: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "HighText Machine Language",
        "Home Tool Markup Language",
      ],
      answerIndex: 0,
    },
    {
      question: "Which tag is used for the largest heading in HTML?",
      options: ["<heading>", "<h6>", "<h1>"],
      answerIndex: 2,
    },
    {
      question: "Which of these is a JavaScript data type?",
      options: ["Number", "Document", "Style"],
      answerIndex: 0,
    },
  ],
  medium: [
    {
      question: "Which company created React?",
      options: ["Google", "Facebook (Meta)", "Microsoft"],
      answerIndex: 1,
    },
    {
      question: "What hook is used for state in React?",
      options: ["useState", "useContext", "useEffect"],
      answerIndex: 0,
    },
    {
      question: "In Next.js App Router, where do you put route files?",
      options: ["pages/ folder", "app/ folder", "routes/ folder"],
      answerIndex: 1,
    },
  ],
  hard: [
    {
      question: "What does CSR stand for?",
      options: [
        "Client Side Rendering",
        "Cloud Server Rendering",
        "Code Side Rendering",
      ],
      answerIndex: 0,
    },
    {
      question: "Which HTTP code means 'Not Found'?",
      options: ["200", "301", "404"],
      answerIndex: 2,
    },
    {
      question: "In React, what are keys mainly used for?",
      options: [
        "Styling elements",
        "Helping React identify list items",
        "Importing components",
      ],
      answerIndex: 1,
    },
  ],
};

export default function Quiz({ difficulty }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const questions = QUESTIONS[difficulty] || [];

  console.log("DIFFICULTY PARAM:", difficulty);
  console.log("QUESTIONS LOADED:", questions);

  // Reset quiz whenever difficulty changes
  useEffect(() => {
    setCurrentIndex(0);
    setTimeLeft(15);
    setScore(0);
    setShowResult(false);
    setName("");
    setSaved(false);
  }, [difficulty]);

  // Simple timer for each question
  useEffect(() => {
    if (showResult) {
      return;
    }

    setTimeLeft(15);

    const intervalId = setInterval(() => {
      setTimeLeft((oldTime) => {
        if (oldTime <= 1) {
          clearInterval(intervalId);
          handleNextQuestion(false); // no answer / time out
          return 0;
        }
        return oldTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
    // we intentionally ignore handleNextQuestion in deps to keep it simple
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, showResult]);

  function handleAnswerClick(optionIndex) {
    const currentQuestion = questions[currentIndex];
    const isCorrect = optionIndex === currentQuestion.answerIndex;
    handleNextQuestion(isCorrect);
  }

  function handleNextQuestion(isCorrect) {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const lastQuestion = currentIndex === questions.length - 1;

    if (lastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setSaved(false);
    setName("");
  }

  function handleSaveScore() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const entry = {
      name: name.trim(),
      score: score,
      difficulty: difficulty,
      date: new Date().toLocaleString(),
    };

    try {
      let existing = [];
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("quiz-leaderboard");
        if (stored) {
          existing = JSON.parse(stored);
        }
        existing.push(entry);
        window.localStorage.setItem(
          "quiz-leaderboard",
          JSON.stringify(existing)
        );
      }
      setSaved(true);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  }

  if (!questions.length) {
    return (
      <div className="card">
        <p>Unknown difficulty level.</p>
        <Link href="/" className="btn btn-secondary">
          Go back home
        </Link>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="card">
        <h2>Quiz Finished</h2>
        <p>
          You scored <strong>{score}</strong> out of{" "}
          <strong>{questions.length}</strong> on{" "}
          <strong>{difficulty.toUpperCase()}</strong> difficulty.
        </p>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your name for the leaderboard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleSaveScore}
            disabled={saved}
          >
            {saved ? "Score Saved" : "Save Score"}
          </button>
        </div>

        <div className="button-row">
          <button className="btn btn-secondary" onClick={handleRestart}>
            Play Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Change Difficulty
          </Link>
          <Link href="/leaderboard" className="btn btn-primary">
            View Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="card">
      <div className="quiz-header">
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span>Time left: {timeLeft}s</span>
        <span>Score: {score}</span>
      </div>

      <div className="quiz-question">{currentQuestion.question}</div>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerClick(index)}>
            {option}
          </button>
        ))}
      </div>

      <div className="button-row">
        <button
          className="btn btn-secondary"
          onClick={() => handleNextQuestion(false)}
        >
          Skip Question
        </button>
      </div>
    </div>
  );
}
