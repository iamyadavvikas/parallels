"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, AuthError, Session } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  loading: boolean;
  supabase: ReturnType<typeof createClient>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  supabase: null as unknown as SupabaseClient,
});

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user, loading, supabase }}>
      {children}
    </UserContext.Provider>
  );
}
