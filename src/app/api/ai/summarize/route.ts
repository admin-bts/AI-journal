import { NextRequest, NextResponse } from "next/server";
import type { AISummarizeRequest } from "@/types/ai";
import { getAIProvider } from "@/lib/ai/provider";
import { requireString } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AISummarizeRequest;

    const month = requireString(body.month, "month");
    const year = Number(body.year);
    if (!Number.isInteger(year) || year < 2000) {
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    }

    const provider = getAIProvider();
    const result = await provider.summarizeJournal({ entries: [], month, year });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/ai/summarize]", err);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
