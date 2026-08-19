import { OptionType } from "./choices";

export type PremiseFieldType = "text" | "textarea";

export interface PremiseFieldSchema extends OptionType {
  type: PremiseFieldType;
}

export const premiseFields: PremiseFieldSchema[] = [
  { id: "premiseStatement", label: "Premise Statement", type: "textarea" },
  { id: "logline", label: "Logline", type: "textarea" },
  { id: "genre", label: "Genre", type: "text" },
  { id: "targetAudience", label: "Target Audience", type: "text" },
  { id: "tone", label: "Tone", type: "textarea" },
  { id: "setting", label: "Setting", type: "textarea" },
  { id: "language", label: "Language", type: "text" },
  { id: "coreConflict", label: "Core Conflict", type: "textarea" },
  { id: "synopsis", label: "Synopsis", type: "textarea" },
  { id: "themes", label: "Themes", type: "textarea" },
  { id: "worldRules", label: "World Rules", type: "textarea" },
];

export const intExtOptions: OptionType[] = [
  { id: "int", label: "INT" },
  { id: "ext", label: "EXT" },
  { id: "int-ext", label: "INT/EXT" },
];

export const timeOfDayOptions: OptionType[] = [
  { id: "day", label: "Day" },
  { id: "night", label: "Night" },
  { id: "dawn", label: "Dawn" },
  { id: "dusk", label: "Dusk" },
];

export const sceneSourceOptions: OptionType[] = [
  { id: "manual", label: "Manual" },
  { id: "ai", label: "AI-Generated" }
];

export const ageRangeOptions: OptionType[] = [
  { id: "child", label: "0 - 12" },
  { id: "teen", label: "13 - 19" },
  { id: "20-29", label: "20 - 29" },
  { id: "30-40", label: "30 - 40" },
  { id: "40-50", label: "40 - 50" },
  { id: "50-65", label: "50 - 65" },
  { id: "65-plus", label: "65+" },
];

export const characterRoleOptions: OptionType[] = [
  { id: "protagonist", label: "Protagonist" },
  { id: "supporting", label: "Supporting" },
  { id: "npc", label: "Non-Playing/Extra" },
];

export const genderOptions: OptionType[] = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "non-binary", label: "Non-binary" },
  { id: "unspecified", label: "Unspecified" },
];


export const wardrobeCategoryOptions: OptionType[] = [
  { id: "everyday", label: "Everyday" },
  { id: "formal", label: "Formal" },
  { id: "casual", label: "Casual" },
  { id: "action", label: "Action/Stunt" },
  { id: "uniform", label: "Uniform" },
  { id: "sleepwear", label: "Sleepwear" },
  { id: "special", label: "Special" },
];

export const assetCategoryOptions: OptionType[] = [
  { id: "prop", label: "Hand Prop" },
  { id: "vehicle", label: "Vehicle" },
  { id: "weapon", label: "Weapon" },
  { id: "set-dressing", label: "Set Dressing" },
  { id: "tech", label: "Tech/Device" },
  { id: "animal", label: "Animal/Creature" },
];

// The three frames previz generates out of a single storyboard image. Order
// matters — each beat is generated from the one before it.
export const previzBeatOptions: OptionType[] = [
  { id: "start", label: "Start" },
  { id: "middle", label: "Middle" },
  { id: "end", label: "End" },
];

export const cameraMovementOptions: OptionType[] = [
  { id: "static", label: "Static" },
  { id: "pan", label: "Pan" },
  { id: "tilt", label: "Tilt" },
  { id: "push-in", label: "Push In" },
  { id: "pull-out", label: "Pull Out" },
  { id: "track", label: "Tracking" },
  { id: "crane", label: "Crane/Jib" },
  { id: "handheld", label: "Handheld" },
  { id: "steadicam", label: "Steadicam" },
  { id: "zoom", label: "Zoom" },
];

export const focalLengthOptions: OptionType[] = [
  { id: "14", label: "14mm" },
  { id: "24", label: "24mm" },
  { id: "35", label: "35mm" },
  { id: "50", label: "50mm" },
  { id: "85", label: "85mm" },
  { id: "135", label: "135mm" },
];

export const locationCategoryOptions: OptionType[] = [
  { id: "outdoor", label: "Outdoor" },
  { id: "scenic", label: "Scenic" },
  { id: "set", label: "Set Build" },
  { id: "practical", label: "Practical Interior" },
  { id: "water", label: "Water / Underwater" },
];

export const soundCategoryOptions: OptionType[] = [
  { id: "sfx", label: "SFX" },
  { id: "foley", label: "Foley" },
  { id: "ambience", label: "Ambience" },
  { id: "animal", label: "Animal Sounds" },
  { id: "vocal", label: "Vocal / Group ADR" },
  { id: "designed", label: "Designed Sound" },
];

export const musicCategoryOptions: OptionType[] = [
  { id: "score", label: "Score" },
  { id: "theme", label: "Character Theme" },
  { id: "source", label: "Source / Diegetic" },
  { id: "sting", label: "Sting" },
  { id: "transition", label: "Transition" },
];

export const shotOptions: OptionType[] = [
  { id: "mid", label: "MCU" },
  { id: "close", label: "CU" },
  { id: "wide", label: "Wide" }
];