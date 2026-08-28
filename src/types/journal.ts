import type { Timestamp } from "firebase/firestore";

// ---------------------------------------------------------------------------
// Object types
// ---------------------------------------------------------------------------

export type JournalObjectType =
  | "text"
  | "drawing"
  | "image"
  | "sticker"
  | "icon"
  | "widget"
  | "ai-response";

export interface BaseJournalObject {
  id: string;
  type: JournalObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity?: number;
  zIndex: number;
}

export interface TextObject extends BaseJournalObject {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: "normal" | "bold";
  alignment: "left" | "center" | "right";
  color: string;
  lineHeight: number;
}

export interface DrawingObject extends BaseJournalObject {
  type: "drawing";
  strokes: Stroke[];
}

export interface Stroke {
  id: string;
  points: StrokePoint[];
  color: string;
  width: number;
}

export interface StrokePoint {
  x: number;
  y: number;
  pressure?: number;
  timestamp?: number;
}

export interface ImageObject extends BaseJournalObject {
  type: "image";
  storagePath: string;
  originalUrl?: string;
  displayUrl?: string;
  thumbnailUrl?: string;
}

export interface StickerObject extends BaseJournalObject {
  type: "sticker";
  assetId: string;
}

export interface IconObject extends BaseJournalObject {
  type: "icon";
  assetId: string;
  color?: string;
}

export interface WidgetObject extends BaseJournalObject {
  type: "widget";
  widgetType: string;
  configuration: Record<string, unknown>;
}

export interface AIResponseObject extends BaseJournalObject {
  type: "ai-response";
  content: string;
  responseType: "reflection" | "prompt" | "summary" | "quote" | "encouragement";
  generatedAt: string;
}

export type JournalObject =
  | TextObject
  | DrawingObject
  | ImageObject
  | StickerObject
  | IconObject
  | WidgetObject
  | AIResponseObject;

// ---------------------------------------------------------------------------
// Domain models
// ---------------------------------------------------------------------------

export interface UserProfile {
  id: string;
  createdAt: Timestamp;
  displayName?: string;
  avatarUrl?: string;
  preferredThemeId?: string;
}

export interface Journal {
  id: string;
  userId: string;
  title: string;
  coverThemeId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JournalPage {
  id: string;
  journalId: string;
  pageNumber: number;
  templateId?: string;
  themeId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JournalPageObject {
  id: string;
  pageId: string;
  type: JournalObjectType;
  payload: Record<string, unknown>;
  transform: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  };
  zIndex: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

export type ThemeId =
  | "sakura"
  | "cloud"
  | "night"
  | "forest"
  | "ocean"
  | "cozy"
  | "study"
  | "minimal";

export interface JournalTheme {
  id: ThemeId;
  name: string;
  background: string;
  texture?: string;
  primaryFont: string;
  accentFont?: string;
  accentColor: string;
  stickerPackId?: string;
}
