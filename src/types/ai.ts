// ---------------------------------------------------------------------------
// AI provider interface — keeps the app decoupled from Gemini
// ---------------------------------------------------------------------------

export interface AIProvider {
  generateJournalPrompt(input: PromptInput): Promise<PromptResult>;
  respondToJournal(input: JournalResponseInput): Promise<JournalResponse>;
  summarizeJournal(input: SummaryInput): Promise<JournalSummary>;
}

// ---------------------------------------------------------------------------
// Prompt generation
// ---------------------------------------------------------------------------

export interface PromptInput {
  mood?: string;
  recentContext?: string;
  themeId?: string;
  date: string;
}

export interface PromptResult {
  prompt: string;
  followUpQuestions?: string[];
}

// ---------------------------------------------------------------------------
// Journal response (AI reacts to what user wrote)
// ---------------------------------------------------------------------------

export interface JournalResponseInput {
  currentEntry: string;
  recentEntries?: string[];
  mood?: string;
  requestType: "reflect" | "question" | "encourage" | "transform";
}

export interface JournalResponse {
  response: string;
  suggestedFollowUps?: string[];
  canAddToPage: boolean;
  responseType: "reflection" | "prompt" | "encouragement" | "question";
}

// ---------------------------------------------------------------------------
// Summarization
// ---------------------------------------------------------------------------

export interface SummaryInput {
  entries: Array<{ date: string; content: string; mood?: string }>;
  month: string;
  year: number;
}

export interface JournalSummary {
  overview: string;
  themes: string[];
  moodSummary?: string;
  reflection: string;
  entryCount: number;
}

// ---------------------------------------------------------------------------
// API route payloads (request/response shapes for Next.js routes)
// ---------------------------------------------------------------------------

export interface AIPromptRequest {
  mood?: string;
  themeId?: string;
  recentContext?: string;
}

export interface AIRespondRequest {
  entryContent: string;
  mood?: string;
  requestType: JournalResponseInput["requestType"];
}

export interface AISummarizeRequest {
  month: string;
  year: number;
}

export interface AITransformRequest {
  content: string;
  transformType: "poem" | "letter" | "haiku" | "list" | "title";
}

export interface AITransformResult {
  transformed: string;
  transformType: AITransformRequest["transformType"];
}
