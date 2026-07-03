"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SignOutButtonProps {
  className?: string;
}

export default function SignOutButton({ className = "" }: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);

  const signOut = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.reload();
  }, []);

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className={`rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-muted transition-all hover:bg-bg-tertiary hover:text-text-primary disabled:opacity-50 ${className}`}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
