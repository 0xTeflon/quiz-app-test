"use client";

import Link from "next/link";

export default function DifficultySelector() {
  const difficulties = [
    {
      id: "easy",
      name: "Easy",
      description: "Simple questions, slower pace.",
    },
    {
      id: "medium",
      name: "Medium",
      description: "A bit more challenging.",
    },
    {
      id: "hard",
      name: "Hard",
      description: "Fast questions and less time.",
    },
  ];

  return (
    <div className="card">
      <h3>Select Difficulty</h3>
      <div className="difficulty-grid">
        {difficulties.map((item) => (
          <Link
            key={item.id}
            href={`/quiz?difficulty=${item.id}`}
            className="difficulty-card"
          >
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
