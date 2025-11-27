"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("quiz-leaderboard");
        if (stored) {
          const parsed = JSON.parse(stored);
          // sort by score (highest first)
          parsed.sort((a, b) => b.score - a.score);
          setEntries(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    }
  }, []);

  function handleClear() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("quiz-leaderboard");
    }
    setEntries([]);
  }

  if (entries.length === 0) {
    return (
      <div className="card">
        <p>No scores saved yet. Play a quiz and save your score.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3>Saved Scores</h3>
        <button className="btn btn-secondary" onClick={handleClear}>
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
