import { NextRequest, NextResponse } from "next/server";
import type { AIRespondRequest } from "@/types/ai";
import { getAIProvider } from "@/lib/ai/provider";
import { requireString, requireOneOf } from "@/lib/validation";

const ALLOWED_REQUEST_TYPES = ["reflect", "question", "encourage", "transform"] as const;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AIRespondRequest;

    const entryContent = requireString(body.entryContent, "entryContent");
    const requestType = requireOneOf(body.requestType, "requestType", ALLOWED_REQUEST_TYPES);

    const provider = getAIProvider();
    const result = await provider.respondToJournal({
      currentEntry: entryContent,
      requestType,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/ai/respond]", err);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
