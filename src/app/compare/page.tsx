import CompareView from "@/components/compare/CompareView";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;

  return (
    <div className="space-y-8 page-enter">
      <header className="text-center py-4">
        <div className="mb-4 text-3xl text-accent">✦</div>
        <h1 className="text-4xl font-bold text-text-primary sm:text-5xl font-display tracking-tight" style={{ letterSpacing: '-0.03em' }}>Compare</h1>
        <p className="mt-3 max-w-2xl mx-auto text-text-secondary font-body">
          Select books and a topic or question to see how different traditions
          address the same subject.
        </p>
      </header>

      <CompareView initialQuestion={q} />
    </div>
  );
}
