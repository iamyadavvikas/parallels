import { topics } from "@/data";
import TopicCard from "@/components/topics/TopicCard";

export default function TopicsPage() {
  return (
    <div className="space-y-10 page-enter">
      <header className="relative text-center py-4">
        <div className="mb-4 text-3xl text-accent">✦</div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl font-display">
          Topics
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-text-secondary font-body">
          Explore how different religious traditions address the same fundamental
          questions and themes.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {topics.map((topic, i) => (
          <div key={topic.id} className="stagger-in opacity-0" style={{ animationDelay: `${i * 0.05}s` }}>
            <TopicCard topic={topic} />
          </div>
        ))}
      </div>
    </div>
  );
}
