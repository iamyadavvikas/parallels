import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured. Add it to .env.local to enable AI fusion." },
      { status: 503 }
    );
  }

  const { passages, topic, question } = await req.json();

  if (!passages || !Array.isArray(passages) || passages.length === 0) {
    return Response.json({ error: "passages array is required" }, { status: 400 });
  }

  const context = topic || question || "this topic";
  const passagesBlock = passages
    .map(
      (p: { religion: string; bookTitle: string; text: string; reference: string }, i: number) =>
        `${i + 1}. [${p.religion} — ${p.bookTitle}] (${p.reference}):\n   "${p.text}"`
    )
    .join("\n\n");

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: `You are a comparative religion scholar. Analyze passages from different religious traditions on a shared theme.

For each response, provide three sections using markdown:
1. **Common Ground** — What themes, values, or insights these passages share across traditions (2-3 sentences)
2. **Distinctive Perspectives** — What makes each tradition's approach unique on this topic (1-2 sentences per tradition)
3. **Synthesis** — How these different traditions complement each other and what wisdom emerges from comparing them (2-3 sentences)

Keep the total response under 300 words. Be respectful, accurate, and scholarly. Never dismiss any tradition.`,
    prompt: `Compare these passages from different religious traditions on the topic of "${context}":

${passagesBlock}

Provide a comparative analysis showing common ground and distinctive perspectives.`,
  });

  return result.toTextStreamResponse();
}
