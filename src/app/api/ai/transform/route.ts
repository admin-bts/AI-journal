import { NextRequest, NextResponse } from "next/server";
import type { AITransformRequest, AITransformResult } from "@/types/ai";
import { requireString, requireOneOf } from "@/lib/validation";

const ALLOWED_TYPES = ["poem", "letter", "haiku", "list", "title"] as const;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AITransformRequest;

    const content = requireString(body.content, "content");
    const transformType = requireOneOf(body.transformType, "transformType", ALLOWED_TYPES);

    // TODO Sprint 3: call Gemini to transform content
    void content;

    const result: AITransformResult = {
      transformed: `[${transformType} transformation coming in Phase 3]`,
      transformType,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/ai/transform]", err);
    return NextResponse.json({ error: "Failed to transform" }, { status: 500 });
  }
}
