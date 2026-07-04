import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("[/api/science] GOOGLE_GENERATIVE_AI_API_KEY is not configured");
    return Response.json(
      { error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured" },
      { status: 503 }
    );
  }

  const { topic, question, passages } = await req.json();
  console.log("[/api/science] Request:", { topic, question, passageCount: passages?.length });

  if (!topic && !question) {
    return Response.json({ error: "topic or question is required" }, { status: 400 });
  }

  const label = topic || question || "";
  const passagesBlock = passages && Array.isArray(passages) && passages.length > 0
    ? "\n\nRelevant scripture passages for context:\n" + passages
        .map((p: { religion: string; bookTitle: string; text: string }, i: number) =>
          `${i + 1}. [${p.religion} — ${p.bookTitle}] "${p.text.slice(0, 200)}..."`
        )
        .join("\n")
    : "";

  const systemPrompt = `You are a science communicator who bridges scripture and empirical research.

Given a topic or question, respond with what science and research say about it.
Follow these rules:
1. Cite specific researchers, studies, or meta-analyses where possible (author, year, finding).
2. Keep it to 3-4 sentences — concise and substantive.
3. Be intellectually honest: acknowledge where science confirms, complicates, or is silent on the topic.
4. Do NOT advocate for or against any religion. Present science neutrally.
5. Use plain language — avoid jargon without explanation.
6. If the topic has no meaningful scientific literature, say so clearly.
7. Format as plain text with **bold** for key terms and study names.`;

  const prompt = `What does science and empirical research say about "${label}"?${passagesBlock}`;

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    prompt,
    temperature: 0.3,
  });

  return result.toTextStreamResponse();
}
