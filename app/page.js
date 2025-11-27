import DifficultySelector from "@/components/DifficultySelector";

export default function HomePage() {
  return (
    <div>
      <h2>Welcome to the Quiz App</h2>
      <p>Select a difficulty level to begin:</p>
      <DifficultySelector />
    </div>
  );
}
