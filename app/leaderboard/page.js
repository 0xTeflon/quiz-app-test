"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    try {
      let saved = [];

      // Dummy data that appears if localStorage is empty
      const sampleData = [
        { name: "John Doe", score: 3, difficulty: "easy", date: "2024-01-01" },
        {
          name: "Aisha Bello",
          score: 2,
          difficulty: "medium",
          date: "2024-01-02",
        },
        {
          name: "Michael Obi",
          score: 1,
          difficulty: "hard",
          date: "2024-01-03",
        },
      ];

      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("quiz-leaderboard");

        if (stored) {
          saved = JSON.parse(stored);
        } else {
          // First time visiting → seed with dummy data
          window.localStorage.setItem(
            "quiz-leaderboard",
            JSON.stringify(sampleData)
          );
          saved = sampleData;
        }
      }

      // Sort by score (highest goes first)
      saved.sort((a, b) => b.score - a.score);

      setEntries(saved);
    } catch (error) {
      console.log("Error loading leaderboard", error);
    }
  }, []);

  function clearAll() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("quiz-leaderboard");
    }
    setEntries([]);
  }

  if (entries.length === 0) {
    return (
      <div className="card">
        <p>No scores found.</p>
        <button className="btn btn-secondary" onClick={clearAll}>
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Leaderboard</h3>
        <button className="btn btn-secondary" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Difficulty</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
              <td>{item.difficulty}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
