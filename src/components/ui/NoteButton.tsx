"use client";

import { useState } from "react";
import { useNoteStore } from "@/store/noteStore";
import { FileText, X } from "lucide-react";
import type { Note } from "@/lib/types";

interface NoteButtonProps {
  verseId: string;
  bookSlug: string;
  bookTitle: string;
  religion: string;
  chapterNum: number;
  verseNum: number;
}

export default function NoteButton({
  verseId,
  bookSlug,
  bookTitle,
  religion,
  chapterNum,
  verseNum,
}: NoteButtonProps) {
  const [open, setOpen] = useState(false);
  const note = useNoteStore((s) => s.getNoteForVerse(verseId));
  const addNote = useNoteStore((s) => s.addNote);
  const updateNote = useNoteStore((s) => s.updateNote);
  const deleteNote = useNoteStore((s) => s.deleteNote);
  const [text, setText] = useState(note?.text || "");

  function handleSave() {
    if (!text.trim()) return;
    if (note) {
      updateNote(note.id, text);
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        verseId,
        bookSlug,
        bookTitle,
        religion: religion as Note["religion"],
        chapterNum,
        verseNum,
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addNote(newNote);
    }
    setOpen(false);
  }

  function handleDelete() {
    if (note) deleteNote(note.id);
    setText("");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => {
          setText(note?.text || "");
          setOpen(true);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-bg-tertiary ${
          note ? "text-accent" : "text-text-muted hover:text-accent"
        }`}
        aria-label={note ? "Edit note" : "Add note"}
      >
        <FileText className={`h-4 w-4 ${note ? "fill-accent/20" : ""}`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-bg-secondary p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">
                {note ? "Edit Note" : "Add Note"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-text-muted hover:bg-bg-tertiary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts on this verse..."
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-bg-primary p-3 text-sm text-text-primary outline-none transition-colors focus:border-accent"
            />
            <div className="mt-4 flex items-center justify-between">
              {note && (
                <button
                  onClick={handleDelete}
                  className="rounded-lg px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Delete
                </button>
              )}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-4 py-1.5 text-sm text-text-muted transition-colors hover:bg-bg-tertiary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!text.trim()}
                  className="rounded-lg bg-accent px-4 py-1.5 text-sm text-void transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
