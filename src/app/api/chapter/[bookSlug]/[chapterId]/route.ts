import { NextRequest, NextResponse } from "next/server";
import { books } from "@/data";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookSlug: string; chapterId: string }> }
) {
  const { bookSlug, chapterId } = await params;
  const book = books.find((b) => b.slug === bookSlug);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const chapter = book.chapters.find((ch) => ch.id === chapterId);
  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: chapter.id,
    number: chapter.number,
    title: chapter.title,
    verses: chapter.verses,
  });
}
