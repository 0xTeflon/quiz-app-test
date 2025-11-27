"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quiz-leaderboard");
      if (stored) setScores(JSON.parse(stored));
    }
  }, []);

  const handleClear = () => {
    if (confirm("Clear all leaderboard data?")) {
      localStorage.removeItem("quiz-leaderboard");
      setScores([]);
    }
  };

  return (
    <div className="card leaderboard-card">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear All
        </button>
      </div>

      {scores.length === 0 ? (
        <p>No scores saved yet.</p>
      ) : (
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
            {scores.map((item, index) => (
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
      )}
    </div>
  );
}
