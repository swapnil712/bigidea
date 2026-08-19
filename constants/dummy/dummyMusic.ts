import { MusicProps } from "@/types/project";
import { toneHigh, toneLow, toneMid } from "./dummyAudio";

export const dummyMusic: MusicProps[] = [
  {
    id: "mus-1",
    name: "First Light",
    category: "score",
    prompt:
      "Sparse ambient score, sustained strings and a single clean guitar harmonic, warm and unhurried, building almost imperceptibly. Open water at dawn. No percussion.",
    mood: "Hopeful, exposed",
    description: "The opening cue. Has to earn the beauty so the turn hurts.",
    audioUrl: toneHigh,
    scenes: ["scene-1"],
  },
  {
    id: "mus-2",
    name: "Sam's Theme",
    category: "theme",
    prompt:
      "Solo acoustic guitar motif, four notes, folk-adjacent, recorded close enough to hear the fretwork. Should survive being played on one instrument or a full ensemble.",
    mood: "Resourceful, alone",
    description:
      "Stated plainly in act one, fragmented through the chase, returns whole on the reef floor.",
    audioUrl: toneMid,
    scenes: ["scene-1", "scene-9"],
  },
  {
    id: "mus-3",
    name: "Something Below",
    category: "sting",
    prompt:
      "Sub-bass swell with detuned cello, six seconds, no resolution. Ends on the swell rather than a hit.",
    mood: "Dread",
    description: "Plays on the shadow at the edge of the drone frame — before Sam sees it.",
    audioUrl: toneLow,
    scenes: ["scene-1"],
  },
  {
    id: "mus-4",
    name: "Mangrove Pursuit",
    category: "score",
    prompt:
      "Propulsive but restrained, low strings and processed breath percussion, 92bpm, no brass, no heroics. Tension from repetition rather than escalation.",
    mood: "Urgent, airless",
    description: "Runs under the escape. Should feel like held breath, not an action set piece.",
    scenes: ["scene-2", "scene-6"],
  },
  {
    id: "mus-5",
    name: "Dock Radio",
    category: "source",
    prompt:
      "Punta-influenced guitar and drum kit playing from a small speaker, mid-song, slightly overdriven, room reverb.",
    mood: "Warm, indifferent",
    description:
      "Diegetic, from a radio on the dock. The village carries on while Sam's world is ending.",
    audioUrl: toneMid,
    scenes: ["scene-3"],
  },
  {
    id: "mus-6",
    name: "The Handler",
    category: "theme",
    prompt:
      "Cold sustained synth pad with a slow arpeggio underneath, clinical, in tune to the point of sterility. No vibrato, no humanity.",
    mood: "Composed, institutional",
    description: "Never threatening on the surface. That is the point.",
    scenes: ["scene-5", "scene-8"],
  },
  {
    id: "mus-7",
    name: "Descent",
    category: "score",
    prompt:
      "Underwater-filtered strings, pitch drifting slightly flat as it descends, hydrophone textures, no rhythm at all.",
    mood: "Committed, terrified",
    description: "The climb back into the water. Sam's theme is in there, drowned.",
    audioUrl: toneLow,
    scenes: ["scene-9"],
  },
  {
    id: "mus-8",
    name: "Upload",
    category: "transition",
    prompt:
      "Silence broken by a single rising synth tone resolving into the full ensemble version of the guitar motif. Twelve seconds.",
    mood: "Release",
    description: "The final image. First time the theme plays without anything undercutting it.",
    audioUrl: toneHigh,
    scenes: ["scene-10"],
  },
];
