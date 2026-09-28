import type { Context, SessionFlavor } from 'grammy';

export type ApplyStep =
  | 'IDLE'
  | 'APPLY_NAME'
  | 'APPLY_PHONE'
  | 'APPLY_AGE'
  | 'APPLY_EXPERIENCE'
  | 'APPLY_GOAL'
  | 'APPLY_SOURCE'
  | 'CONFIRM_APPLICATION';

export interface ApplyDraft {
  name?: string;
  phone?: string;
  age?: number;
  experience?: string;
  goal?: string;
  source?: string;
}

export interface BroadcastDraft {
  active: boolean;
  awaitingContent: boolean;
}

export interface SessionData {
  step: ApplyStep;
  draft: ApplyDraft;
  broadcast: BroadcastDraft;
  traffic?: string;
}

export type BotContext = Context & SessionFlavor<SessionData>;

export function initialSession(): SessionData {
  return {
    step: 'IDLE',
    draft: {},
    broadcast: { active: false, awaitingContent: false },
  };
}
