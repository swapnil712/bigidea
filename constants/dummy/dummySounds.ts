import { SoundProps } from "@/types/project";
import { toneHigh, toneLow, toneMid } from "./dummyAudio";

export const dummySounds: SoundProps[] = [
  {
    id: "snd-1",
    name: "Drone Rotor Hum",
    category: "sfx",
    description:
      "Four-rotor whine, close and slightly uneven — the scuffed arm sings a semitone off. Present in every shot the drone is airborne.",
    productionNotes: "Needs a loopable 30s bed plus takeoff and landing one-shots.",
    audioUrl: toneMid,
    scenes: ["scene-1", "scene-9"],
    referenceSounds: [],
  },
  {
    id: "snd-2",
    name: "Board Strike",
    category: "sfx",
    description:
      "The thump under the paddleboard. Dense, low, felt more than heard. The single most important sound in act one.",
    productionNotes: "Layer a struck timpani with a hydrophone knock. Must survive phone speakers.",
    audioUrl: toneLow,
    scenes: ["scene-1"],
    referenceSounds: [],
  },
  {
    id: "snd-3",
    name: "Reef Ambience — Dawn",
    category: "ambience",
    description:
      "Glassy water, distant surf on the reef edge, no birds yet. The calm the whole opening rests on.",
    productionNotes: "Record on location at first light. Two hours of clean bed, no boat traffic.",
    audioUrl: toneHigh,
    scenes: ["scene-1"],
    referenceSounds: [],
  },
  {
    id: "snd-4",
    name: "Mangrove Ambience — Night",
    category: "ambience",
    description:
      "Insects, water lapping against roots, the occasional unexplained splash. Claustrophobic rather than peaceful.",
    productionNotes: "Layer in the creature's distant displacement in the last third of the loop.",
    scenes: ["scene-2"],
    referenceSounds: [],
  },
  {
    id: "snd-5",
    name: "Wetsuit Movement",
    category: "foley",
    description: "Neoprene against skin and board. Every time Sam shifts weight, we hear it.",
    productionNotes: "Foley stage, real suit, wet. Dry takes sound like a bin bag.",
    scenes: ["scene-1", "scene-9"],
    referenceSounds: [],
  },
  {
    id: "snd-6",
    name: "Bare Feet on Wet Dock",
    category: "foley",
    description: "Slap and drag across weathered boards, with the boards themselves answering back.",
    productionNotes: "Record on the practical dock during the location recce, before dressing.",
    scenes: ["scene-3"],
    referenceSounds: [],
  },
  {
    id: "snd-7",
    name: "SD Card Handling",
    category: "foley",
    description:
      "Plastic case click, the card sliding free. Tiny sound carrying the weight of the whole plot.",
    productionNotes: "Extreme close mic. This plays under near-silence in three separate scenes.",
    audioUrl: toneHigh,
    scenes: ["scene-1", "scene-2"],
    referenceSounds: [],
  },
  {
    id: "snd-8",
    name: "Creature Displacement",
    category: "animal",
    description:
      "Not a roar. The sound of a very large body moving water it shouldn't be able to move. Low, wrong, brief.",
    productionNotes:
      "Build from whale and hydrodynamic recordings, pitched down. Never let it sound like a monster.",
    audioUrl: toneLow,
    scenes: ["scene-1", "scene-9"],
    referenceSounds: [],
  },
  {
    id: "snd-9",
    name: "Gulls and Frigatebirds",
    category: "animal",
    description: "Coastal bird life, thinning out as the film moves offshore and away from safety.",
    productionNotes: "Density is a story tool — full in scene 3, absent by scene 9.",
    scenes: ["scene-3"],
    referenceSounds: [],
  },
  {
    id: "snd-10",
    name: "Village Crowd Walla",
    category: "vocal",
    description: "Belizean Creole and Spanish, unhurried, overlapping. Never subtitled, never background-generic.",
    productionNotes: "Cast locally. Generic international walla will read as fake immediately.",
    scenes: ["scene-3"],
    referenceSounds: [],
  },
  {
    id: "snd-11",
    name: "Company Radio Chatter",
    category: "vocal",
    description: "Clipped, procedural, unbothered. The sound of people who have done this before.",
    productionNotes: "Process through a real handheld to get the squelch and compression honestly.",
    scenes: ["scene-6", "scene-8"],
    referenceSounds: [],
  },
  {
    id: "snd-12",
    name: "Signal Loss Drone",
    category: "designed",
    description:
      "The moment the upload fails — a sub-bass collapse with everything else ducking out under it. Silence as a sound effect.",
    productionNotes: "This cue defines the third act. Mix it against a near-total drop of ambience.",
    audioUrl: toneLow,
    scenes: ["scene-10"],
    referenceSounds: [],
  },
];
