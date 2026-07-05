"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Note } from "@/lib/types";

interface NoteState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  getNoteForVerse: (verseId: string) => Note | undefined;
  syncFromServer: (serverNotes: Note[]) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) =>
        set((state) => ({ notes: [note, ...state.notes] })),
      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, text, updatedAt: new Date().toISOString() } : n,
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      getNoteForVerse: (verseId) =>
        get().notes.find((n) => n.verseId === verseId),
      syncFromServer: (serverNotes) =>
        set((state) => {
          const localMap = new Map(state.notes.map((n) => [n.verseId, n]));
          for (const sn of serverNotes) {
            const local = localMap.get(sn.verseId);
            if (!local || new Date(sn.updatedAt) > new Date(local.updatedAt)) {
              localMap.set(sn.verseId, sn);
            }
          }
          return { notes: Array.from(localMap.values()).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) };
        }),
    }),
    { name: "parallels-notes" },
  ),
);
