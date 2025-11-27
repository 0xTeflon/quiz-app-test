"use client";

import { useSearchParams } from "next/navigation";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  const params = useSearchParams();
  const difficulty = params.get("difficulty");

  return (
    <div>
      <Quiz difficulty={difficulty} />
    </div>
  );
}
