import { topics } from "@/data";
import TopicCard from "@/components/topics/TopicCard";

export default function TopicsPage() {
  return (
    <div className="space-y-10">
      <header className="relative">
        <div className="ornate-divider mb-6 max-w-xs">
          <span>✦</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary font-display" style={{ letterSpacing: '-0.03em' }}>Topics</h1>
        <p className="mt-2 max-w-2xl text-lg text-text-secondary font-body">
          Explore how different religious traditions address the same fundamental
          questions and themes.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {topics.map((topic, i) => (
          <div key={topic.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <TopicCard topic={topic} />
          </div>
        ))}
      </div>
    </div>
  );
}
