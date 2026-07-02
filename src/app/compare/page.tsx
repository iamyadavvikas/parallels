import CompareView from "@/components/compare/CompareView";

export default function ComparePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-text-primary font-display tracking-tight" style={{ letterSpacing: '-0.02em' }}>Compare</h1>
        <p className="mt-2 text-text-secondary font-body">
          Select books and a topic or question to see how different traditions
          address the same subject.
        </p>
      </header>

      <CompareView />
    </div>
  );
}
