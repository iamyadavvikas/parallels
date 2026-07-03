import AuthButton from "@/components/auth/AuthButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-surface p-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-text-primary font-display tracking-tight">
          Sign in to Parallels
        </h1>
        <p className="mb-8 text-sm text-text-muted">
          Sync your bookmarks, search history, and saved passages across devices.
        </p>
        <AuthButton className="w-full justify-center" />
      </div>
    </div>
  );
}
