"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useNoteStore } from "@/store/noteStore";
import { useUser } from "@/components/auth/UserProvider";
import { saveNote, deleteNote as deleteServerNote } from "@/lib/actions/notes";
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
  const { user } = useUser();
  const [text, setText] = useState(note?.text || "");
  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (!dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    // Focus the textarea after mount
    setTimeout(() => textareaRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      trapFocus(e);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, trapFocus]);

  useEffect(() => {
    if (open) return;
    // Restore focus when dialog closes
    setTimeout(() => previousFocusRef.current?.focus(), 50);
  }, [open]);

  function handleSave() {
    if (!text.trim()) return;
    if (note) {
      updateNote(note.id, text);
      if (user) {
        saveNote({
          verseId,
          bookId: bookSlug,
          bookTitle,
          religion,
          chapterId: `ch-${chapterNum}`,
          verseNumber: verseNum,
          text,
        }).catch(() => {});
      }
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
      if (user) {
        saveNote({
          verseId,
          bookId: bookSlug,
          bookTitle,
          religion,
          chapterId: `ch-${chapterNum}`,
          verseNumber: verseNum,
          text,
        }).catch(() => {});
      }
    }
    setOpen(false);
  }

  function handleDelete() {
    if (note) {
      deleteNote(note.id);
      if (user) {
        deleteServerNote(verseId).catch(() => {});
      }
    }
    setText("");
    setOpen(false);
  }

  return (
    <>
      <button
        ref={triggerRef}
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={note ? "Edit note" : "Add note"}
          ref={dialogRef}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-bg-secondary p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">
                {note ? "Edit Note" : "Add Note"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-text-muted hover:bg-bg-tertiary"
                aria-label="Close note dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <textarea
              ref={textareaRef}
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
