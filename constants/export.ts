import { OptionType } from "./choices";

// Width x height, keyed so the dimension fields can be filled from the id.
export const resolutionOptions: OptionType[] = [
  { id: "1080x1920", label: "1080 x 1920 (source)" },
  { id: "720x1280", label: "720 x 1280" },
  { id: "1440x2560", label: "1440 x 2560" },
  { id: "2160x3840", label: "2160 x 3840 (4K)" },
];

export const videoFormatOptions: OptionType[] = [
  { id: "mp4", label: "MP4" },
  { id: "mov", label: "MOV" },
  { id: "webm", label: "WebM" },
  { id: "gif", label: "GIF" },
];

export const frameRateOptions: OptionType[] = [
  { id: "24", label: "24 fps" },
  { id: "25", label: "25 fps" },
  { id: "30", label: "30 fps" },
  { id: "60", label: "60 fps" },
];

export const collaboratorRoleOptions: OptionType[] = [
  { id: "owner", label: "Owner" },
  { id: "editor", label: "Editor" },
  { id: "qa", label: "QA" },
  { id: "viewer", label: "Viewer" },
];
