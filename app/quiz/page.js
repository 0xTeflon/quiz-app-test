"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizClient />
    </Suspense>
  );
}
