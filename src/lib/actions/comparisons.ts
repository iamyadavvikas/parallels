"use server";

import { createClient } from "@/lib/supabase/server";

export interface SavedComparison {
  id: string;
  question_id: string | null;
  question_text: string;
  topic_id: string | null;
  topic_name: string | null;
  selected_books: string[];
  synthesis: string | null;
  passages: unknown[];
  created_at: string;
}

export async function saveComparison(data: {
  questionId?: string;
  questionText: string;
  topicId?: string;
  topicName?: string;
  selectedBooks: string[];
  synthesis?: string;
  passages: unknown[];
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Auth not configured" };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not signed in" };

  const { data: saved, error } = await supabase
    .from("saved_comparisons")
    .insert({
      user_id: user.id,
      question_id: data.questionId || null,
      question_text: data.questionText,
      topic_id: data.topicId || null,
      topic_name: data.topicName || null,
      selected_books: data.selectedBooks,
      synthesis: data.synthesis || null,
      passages: data.passages,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, id: saved.id };
}

export async function getSavedComparisons(): Promise<SavedComparison[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("saved_comparisons")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return data || [];
}

export async function deleteComparison(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  if (!supabase) return { success: false, error: "Auth not configured" };

  const { error } = await supabase
    .from("saved_comparisons")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
