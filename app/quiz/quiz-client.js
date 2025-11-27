"use client";

import { useSearchParams } from "next/navigation";
import Quiz from "@/components/Quiz";

export default function QuizPageClient() {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get("difficulty");

  if (!difficulty) {
    return (
      <div className="card">
        <p>No difficulty selected.</p>
        <a href="/" className="btn btn-secondary">
          Go Back Home
        </a>
      </div>
    );
  }

  return <Quiz difficulty={difficulty} />;
}
