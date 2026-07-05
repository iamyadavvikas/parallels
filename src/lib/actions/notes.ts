"use server";

import { createClient } from "@/lib/supabase/server";

export interface ServerNote {
  id: string;
  verse_id: string;
  book_id: string;
  book_title: string;
  religion: string;
  chapter_id: string;
  verse_number: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export async function saveNote(data: {
  verseId: string;
  bookId: string;
  bookTitle: string;
  religion: string;
  chapterId: string;
  verseNumber: number;
  text: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Auth not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not signed in" };

  const { data: saved, error } = await supabase
    .from("user_notes")
    .upsert({
      user_id: user.id,
      verse_id: data.verseId,
      book_id: data.bookId,
      book_title: data.bookTitle,
      religion: data.religion,
      chapter_id: data.chapterId,
      verse_number: data.verseNumber,
      text: data.text,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,verse_id" })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, id: saved.id };
}

export async function getNotes(): Promise<ServerNote[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("user_notes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return data || [];
}

export async function deleteNote(verseId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Auth not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not signed in" };

  const { error } = await supabase
    .from("user_notes")
    .delete()
    .eq("user_id", user.id)
    .eq("verse_id", verseId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
