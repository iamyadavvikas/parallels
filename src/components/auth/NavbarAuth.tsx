"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import AuthButton from "./AuthButton";
import SignOutButton from "./SignOutButton";

export default function NavbarAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    async function init() {
      const supabase = createClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);

      const { data: authData } = supabase.auth.onAuthStateChange(
        (_event: string, session: { user: User | null } | null) => {
          setUser(session?.user ?? null);
        },
      );
      subscription = authData.subscription;
    }

    init();

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div className="h-7 w-7 rounded-full bg-bg-tertiary animate-pulse" />;

  if (!user) return <AuthButton />;

  return (
    <div className="group relative">
      <button className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:bg-bg-tertiary">
        {user.user_metadata.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt=""
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
            {user.email?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <span className="hidden text-xs text-text-muted lg:block">
          {user.user_metadata.full_name ?? user.email}
        </span>
      </button>
      <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-border bg-bg-surface p-1 opacity-0 shadow-lg transition-all group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="px-3 py-2 text-xs text-text-muted border-b border-border/50 mb-1 truncate">
          {user.email}
        </div>
        <SignOutButton className="w-full text-left" />
      </div>
    </div>
  );
}
