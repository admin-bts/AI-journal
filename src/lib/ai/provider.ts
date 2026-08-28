import type {
  AIProvider,
  JournalResponse,
  JournalResponseInput,
  JournalSummary,
  PromptInput,
  PromptResult,
  SummaryInput,
} from "@/types/ai";

// ---------------------------------------------------------------------------
// Gemini implementation — called only from server-side API routes
// ---------------------------------------------------------------------------

export class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not set");
    this.apiKey = key;
  }

  async generateJournalPrompt(input: PromptInput): Promise<PromptResult> {
    // TODO Sprint 3: implement Gemini call
    void input;
    return {
      prompt: "What is one small moment from today that you want to remember?",
      followUpQuestions: [
        "How did it make you feel?",
        "Who else was part of this moment?",
      ],
    };
  }

  async respondToJournal(input: JournalResponseInput): Promise<JournalResponse> {
    // TODO Sprint 3: implement Gemini call
    void input;
    return {
      response:
        "Thank you for sharing that. It sounds like today held something meaningful for you.",
      suggestedFollowUps: ["Tell me more.", "What would you like to remember?"],
      canAddToPage: true,
      responseType: "reflection",
    };
  }

  async summarizeJournal(input: SummaryInput): Promise<JournalSummary> {
    // TODO Sprint 3: implement Gemini call
    void input;
    return {
      overview: "Summary coming soon.",
      themes: [],
      reflection: "",
      entryCount: 0,
    };
  }
}

let _provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!_provider) _provider = new GeminiProvider();
  return _provider;
}
