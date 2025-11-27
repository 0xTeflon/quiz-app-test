"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Quiz from "@/components/Quiz";

function QuizPageContent() {
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

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading quiz…</div>}>
      <QuizPageContent />
    </Suspense>
  );
}
