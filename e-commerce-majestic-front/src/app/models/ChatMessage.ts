import { Time } from "@angular/common";

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  // stream: boolean;
}

export interface ChatMessage {
  role: string;
  content: string;
}


export interface ChatCompletionChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: Choice[];
}

export interface Choice {
  index: number;
  message: Delta;
  logprobs: any; // Puedes reemplazar 'any' con el tipo adecuado si se conoce
  finish_reason: any; // You can replace 'any' with the appropriate type if known
}

export interface Delta {
  role?: string;
  content?: string;
}
export interface Settings {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface CharObject {
  ID: string;
  Message: string;
  Timestamp: Time;
  UserId: number;
}