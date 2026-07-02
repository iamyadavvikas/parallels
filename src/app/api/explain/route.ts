import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured. Add it to .env.local to enable AI explanations." },
      { status: 503 }
    );
  }

  const { verse, religion, bookTitle } = await req.json();

  if (!verse || typeof verse !== "string") {
    return Response.json({ error: "verse is required" }, { status: 400 });
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: `You are a scholarly but accessible religious studies expert. When a user shares a verse from a sacred text, provide a concise explanation in 3 short sections:

1. **What this means** — Plain-English summary (2-3 sentences)
2. **Key themes** — The theological/spiritual ideas present (bullet points, 2-3 items)
3. **Cross-tradition connections** — How this connects to ideas in other faiths (2-3 sentences)

Keep the total response under 200 words. Be respectful and academic, never dismissive of any tradition. Format with markdown.`,
    prompt: `Explain this ${bookTitle ? `verse from ${bookTitle}` : "sacred text verse"}${religion ? ` (${religion} tradition)` : ""}:

"${verse}"`,
  });

  return result.toTextStreamResponse();
}
