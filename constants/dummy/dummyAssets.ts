import { AssetProps } from "@/types/project";

export const dummyAssets: AssetProps[] = [
  {
    id: "ast-1",
    scenes: ["scene-1", "scene-9", "scene-10"],
    name: "Autonomous Camera Drone",
    category: "tech",
    description:
      "Consumer-grade underwater drone in matte white, one rotor arm scuffed. Hero prop — battery level is a visible ticking clock across the third act.",
    originScene: "scene-1",
    quantity: 3,
    productionNotes:
      "Three builds required: hero (screen-accurate, non-flying), stunt (impact-safe foam), and a water-damaged version for scenes 9 and 10.",
    referenceImages: [],
  },
  {
    id: "ast-2",
    scenes: ["scene-1", "scene-2"],
    name: "Drone SD Card",
    category: "prop",
    description:
      "A single 512GB card in a scratched orange case. The entire plot fits in a thumbnail-sized object.",
    originScene: "scene-1",
    quantity: 8,
    productionNotes:
      "Multiples needed — the card is dropped, taped to a leg, and submerged. Keep the orange case consistent, it is the audience's tracking device.",
    referenceImages: [],
  },
  {
    id: "ast-3",
    scenes: ["scene-1"],
    name: "Sam's Paddleboard",
    category: "vehicle",
    description:
      "Inflatable touring board, rental-yellow, with a gouge along the underside after the first encounter.",
    originScene: "scene-1",
    quantity: 2,
    productionNotes:
      "Second board pre-damaged for post-encounter continuity. Gouge must match the creature's tooth spacing established in the footage insert.",
    referenceImages: [],
  },
  {
    id: "ast-4",
    scenes: ["scene-2", "scene-10"],
    name: "Cracked Phone",
    category: "tech",
    description:
      "Spiderwebbed screen from the escape. Still uploads. The crack pattern is on screen often enough to matter.",
    originScene: "scene-2",
    quantity: 4,
    productionNotes:
      "Screen-replay versions need playback rigs. Crack decal must be identical across all four.",
    referenceImages: [],
  },
  {
    id: "ast-5",
    name: "Research Marker Buoy",
    category: "set-dressing",
    description:
      "Unbranded orange buoy tethered to the reef floor. Holds the physical evidence Sam dives for in the climax.",
    originScene: "scene-8",
    quantity: 1,
    productionNotes:
      "Underwater rig with a releasable tether. Coordinate with the dive unit — needs to hold position in current for the retrieval sequence.",
    referenceImages: [],
  },
  {
    id: "ast-6",
    name: "Surgical Tagging Collar",
    category: "prop",
    description:
      "Bio-tag harness recovered from the creature. Machined, deliberate, and unmistakably man-made — the proof the whole film turns on.",
    originScene: "scene-8",
    quantity: 2,
    productionNotes:
      "Must read as engineered on a closeup. Etched serial number should be legible at 4K for the reveal insert.",
    referenceImages: [],
  },
  {
    id: "ast-7",
    scenes: ["scene-6", "scene-8"],
    name: "Company Rigid Inflatable",
    category: "vehicle",
    description:
      "Black-hulled RIB with twin outboards. Fast, unmarked, and always arriving from the wrong direction.",
    originScene: "scene-6",
    quantity: 1,
    productionNotes:
      "Picture boat plus a camera boat matched in silhouette for the night pursuit. Marine coordinator required.",
    referenceImages: [],
  },
  {
    id: "ast-8",
    name: "Dani's Field Notebooks",
    category: "set-dressing",
    description:
      "Two years of reef anomaly logs in waterproof notebooks, rubber-banded together and swollen with damp.",
    originScene: "scene-7",
    quantity: 6,
    productionNotes:
      "Fill every page — camera goes in tight during the corroboration scene. Dates must line up with the timeline in the premise.",
    referenceImages: [],
  },
  {
    id: "ast-9",
    name: "Contractor's Sidearm",
    category: "weapon",
    description:
      "Holstered, drawn exactly once, never fired. Its presence is the threat.",
    originScene: "scene-6",
    quantity: 2,
    productionNotes:
      "Rubber and non-firing replica only. No live blanks scheduled on any water unit day.",
    referenceImages: [],
  },
  {
    id: "ast-10",
    scenes: ["scene-1", "scene-9"],
    name: "The Creature",
    category: "animal",
    description:
      "Roughly nine metres, apex-predator behaviour, visibly modified along the dorsal line. An animal, never a monster.",
    originScene: "scene-1",
    quantity: 1,
    productionNotes:
      "Practical partial build for the board strike and the hull scrape; full body is CG. Never fully lit — silhouette and displacement do the work.",
    referenceImages: [],
  },
  {
    id: "ast-11",
    name: "Solar Battery Bank",
    category: "tech",
    description:
      "Sun-bleached power brick with two dead ports. Charges the drone and, in scene 9, does not.",
    originScene: "scene-4",
    quantity: 3,
    productionNotes:
      "Practical LED charge indicator, dimmable on set — the light level is a story beat.",
    referenceImages: [],
  },
  {
    id: "ast-12",
    name: "Fishing Village Skiff",
    category: "vehicle",
    description:
      "Hand-painted wooden skiff, blue over white, engine that starts on the third pull. Belongs to the community, not to Sam.",
    originScene: "scene-4",
    quantity: 1,
    productionNotes:
      "Source locally rather than building. Paint wear should look earned, not art-departmented.",
    referenceImages: [],
  },
];
