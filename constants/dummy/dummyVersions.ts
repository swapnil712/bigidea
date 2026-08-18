import { DocumentVersion } from "@/types/project";

// Newest first — the first entry is the current version.
export const dummyScriptVersions: DocumentVersion[] = [
  { id: "scr-v3", label: "Current Version (Verbatim)", updated: new Date("2026-08-16T17:40:00") },
  { id: "scr-v2", label: "Parsed", updated: new Date("2026-08-16T14:12:00") },
  { id: "scr-v1", label: "Original Upload", updated: new Date("2026-08-12T09:05:00") },
];

export const dummyPremiseVersions: DocumentVersion[] = [
  { id: "pre-v3", label: "Current Version", updated: new Date("2026-08-15T11:20:00") },
  { id: "pre-v2", label: "Tightened Logline", updated: new Date("2026-08-14T16:48:00") },
  { id: "pre-v1", label: "First Pass", updated: new Date("2026-08-10T14:40:00") },
];
