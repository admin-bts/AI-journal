import { NextRequest, NextResponse } from "next/server";
import type { AIPromptRequest } from "@/types/ai";
import { getAIProvider } from "@/lib/ai/provider";
import { optionalString } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AIPromptRequest;

    const provider = getAIProvider();
    const result = await provider.generateJournalPrompt({
      mood: optionalString(body.mood),
      themeId: optionalString(body.themeId),
      recentContext: optionalString(body.recentContext),
      date: new Date().toISOString().slice(0, 10),
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/ai/prompt]", err);
    return NextResponse.json({ error: "Failed to generate prompt" }, { status: 500 });
  }
}
