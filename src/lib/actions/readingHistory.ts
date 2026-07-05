"use server";

import { createClient } from "@/lib/supabase/server";

export interface ServerReadingHistory {
  id: string;
  book_slug: string;
  book_title: string;
  religion: string;
  chapter_num: number;
  last_visited_at: string;
}

export async function saveReadingHistory(data: {
  bookSlug: string;
  bookTitle: string;
  religion: string;
  chapterNum: number;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Auth not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not signed in" };

  const { error } = await supabase
    .from("reading_history")
    .upsert({
      user_id: user.id,
      book_slug: data.bookSlug,
      book_title: data.bookTitle,
      religion: data.religion,
      chapter_num: data.chapterNum,
      last_visited_at: new Date().toISOString(),
    }, { onConflict: "user_id,book_slug,chapter_num" });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getReadingHistory(): Promise<ServerReadingHistory[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("reading_history")
    .select("*")
    .eq("user_id", user.id)
    .order("last_visited_at", { ascending: false })
    .limit(20);

  return data || [];
}
