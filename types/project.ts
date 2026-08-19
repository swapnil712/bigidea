import { formatOptions, genreOptions, aspectRatioOptions, visualStyleOptions } from "@/constants/choices";
import { intExtOptions, timeOfDayOptions, sceneSourceOptions } from "@/constants/plot";


type FormatId = (typeof formatOptions)[number]["id"];
type GenreId = (typeof genreOptions)[number]["id"];
type AspectRatioId = (typeof aspectRatioOptions)[number]["id"];
type VisualStyleId = (typeof visualStyleOptions)[number]["id"];

export type ProjectStatus = "working" | "issue" | "archived"
export type ScreenplayElementType =
  | "slugline"
  | "action"
  | "character"
  | "parenthetical"
  | "dialogue"
  | "transition";


export type ShotType = "mid" | "wide" | "close"
export type CameraMovement = "static" | "pan" | "tilt" | "push-in" | "pull-out" | "track" | "crane" | "handheld" | "steadicam" | "zoom"


export interface ProjectProps {
  id: string,
  title: string;
  status: ProjectStatus;
  type: FormatId;
  genre: GenreId;
  targetLength: number;
  aspectRatio: AspectRatioId;
  visualStyle: VisualStyleId;
  notes: string;
  created: Date;
  lastUpdated: Date;
  premise?: Record<string, string>;
  script?: ScreenplayElement[];
  scenes?: SceneProps[],
  characters?: CharacterProps[],
  wardrobe?: CharacterWardrobeItem[],
  props?: PropProps[],
  assets?: AssetProps[],
  sounds?: SoundProps[],
  music?: MusicProps[],
  locations?: LocationProps[]
}

export interface CharacterProps {
  id: string;
  name: string;
  // A role id from the project's (editable) character role list.
  role: string;
  ageRange: string;
  gender: string;
  ethnicity: string;
  build: string;
  style: string;
  description: string;
  looks: CharacterLookInSceneProps["id"][];
  wardrobe: CharacterWardrobeItem["id"][];
  props: PropProps["id"][];
  referenceImages: CharacterReferenceImage["id"][];
}

export interface CharacterWardrobeItem {
  id: string;
  name: string;
  originCharacter: string;
  // A category id from the project's (editable) wardrobe category list.
  category: string;
  scenes?: SceneProps["id"][];
  referenceImages?: string[];
  description: string;
}

export interface AssetProps {
  id: string;
  name: string;
  // A category id from the project's (editable) asset category list.
  category: string;
  description: string;
  originScene?: SceneProps["id"];
  quantity: number;
  productionNotes: string;
  scenes?: SceneProps["id"][];
  referenceImages?: string[];
}

export interface SoundProps {
  id: string;
  name: string;
  // A category id from the project's (editable) sound category list.
  category: string;
  description: string;
  productionNotes: string;
  audioUrl?: string;
  scenes?: SceneProps["id"][];
  referenceSounds?: string[];
}

export interface MusicProps {
  id: string;
  name: string;
  // A category id from the project's (editable) music category list.
  category: string;
  prompt: string;
  mood: string;
  description: string;
  audioUrl?: string;
  scenes?: SceneProps["id"][];
}

export interface Collaborator {
  id: string;
  email: string;
  // A role id from collaboratorRoleOptions.
  role: string;
  avatar?: string;
}

export interface ReferenceAudio {
  id: string;
  name: string;
  url: string;
}

export interface LocationProps {
  id: string;
  name: string;
  // A category id from the project's (editable) location category list.
  category: string;
  region: string;
  description: string;
  productionNotes: string;
  referenceImages?: string[];
}

export interface CharacterReferenceImage {
  id: string;
  url: string;
}

// Version history behind a SectionHeader's left button. Newest first — the
// first entry is the current version, the rest are past ones.
export interface DocumentVersion {
  id: string;
  label: string;
  updated: Date;
}

export interface ReferenceImage {
  id: string;
  name: string;
  url: string;
}

export interface PropProps {
  id: string;
  name: string;
  look: string;
  originCharacter?: CharacterProps["id"];
}

export interface CharacterLookInSceneProps {
  id: string;
  look: string;
  wardrobe: CharacterWardrobeItem["id"][]
  props?: PropProps["id"][]
  tags: string[]
}

export interface Shot {
  id: string;
  label: string;
  shotType: ShotType;
  movement?: CameraMovement;
  // In millimetres.
  focalLength?: number;
  description: string;
}



export type IntExt = (typeof intExtOptions)[number]["id"];
export type TimeOfDay = (typeof timeOfDayOptions)[number]["id"];
export type SceneSource = (typeof sceneSourceOptions)[number]["id"];

export interface SceneProps {
  id: string;
  intExt: IntExt;
  location: string;
  time: TimeOfDay;
  scriptDay: number;
  sceneSource: SceneSource;
  synopsis: string;
  emotionalBeat: string;
  productionNotes: string;
  characters?: CharacterLookInSceneProps[];
  props?: PropProps[];
  shots?: Shot[]
}

export interface ScreenplayElement {
  type: ScreenplayElementType;
  text: string;
}