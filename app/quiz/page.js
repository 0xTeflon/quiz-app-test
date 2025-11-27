export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = false;

import QuizClient from "./QuizClient";

export default function QuizPage() {
  return <QuizClient />;
}
