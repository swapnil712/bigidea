import { dummyAssets } from "./dummyAssets";
import { dummyCharacters } from "./dummyCharacters";
import { dummyLocations } from "./dummyLocations";
import { dummyScenes } from "./dummyScene";
import { dummyProps } from "./dummyProps";
import { dummyScreenplayElements } from "./dummyScript";
import { dummyWardrobes } from "./dummyWardrobe";
import { ProjectProps } from "@/types/project";


export const dummyProjects: ProjectProps[] = [
  {
    id:"2390482904824823",
    title: "Fist of Fury",
    status: "working",
    type: "microdrama",
    genre: "action-adventure",
    targetLength: 90,
    aspectRatio: "9-16",
    visualStyle: "cinematic",
    notes: "",
    created: new Date("2026-08-10T14:40:30"),
    lastUpdated: new Date("2026-08-10T14:40:30"),
    premise: {
      premiseStatement:
        "A tech-savvy solo travel content creator becomes the first to document an unprecedented marine encounter off the Belizean coast — and the footage that was supposed to make her career becomes evidence of something the scientific and corporate world will do anything to suppress. To survive and tell the story, she has to outrun people who control both the water and what the world is allowed to know about it.",
      logline:
        "A travel influencer's dream dawn shoot off the Belizean reef turns into a fight for her life — and when her drone footage reveals what's really living in those waters, the people who put it there will stop at nothing to bury both her and the evidence.",
      genre: "Creature thriller, conspiracy thriller",
      targetAudience: "25–45, thriller fans, outdoor/adventure adjacent, prestige streaming audience",
      tone: "Grounded tension with bursts of visceral action — Open Water meets All Is Lost with an Erin Brockovich spine",
      setting: "Belize coastal waters, reef systems, a small coastal town, corporate research vessels",
      language: "English primary, some Belizean Creole and Spanish in background",
      coreConflict:
        "Sam vs. a cover-up. The creature is the inciting threat, but the real antagonist is institutional — a biotech or marine research company that has been conducting illegal deep-water experiments in Belizean protected waters. Sam's drone footage is the only proof. The conflict operates on two levels simultaneously: physical survival in a hostile marine environment, and a race to get the footage out before it's erased and she disappears with it.",
      synopsis:
        "Sam Reyes is three months into a solo travel series that is almost working. Her numbers are decent, her sponsors are patient, but she hasn't had her moment — the shot that breaks through. Belize is supposed to be it. She's arranged access to a restricted reef zone at first light, armed with a new autonomous drone that promises cinema-grade underwater footage on a content creator's budget.\n\nThe opening shot is perfect. Then something hits her board.\n\nSam survives the initial encounter through stillness and luck — the animal, massive and unlike anything she can identify, circles and submerges. She paddles back to shore shaking, but the drone caught everything. When she reviews the footage, she sees it clearly: something that shouldn't exist, or shouldn't be here, or both. Her first instinct is to post it. Her second instinct, when the comments go insane within minutes, is that she has made a terrible mistake.\n\nBy midday, her accommodation has been searched. A man in civilian clothes, too calm and too well-resourced to be local law enforcement, asks her politely to come answer some questions. Sam goes. She shouldn't have.\n\nShe escapes — barely — with her phone and the drone's SD card. What follows is a chase across the Belizean coastal geography: mangrove channels, fishing villages, the reef itself. Sam is resourceful, physically capable, and has one tool her pursuers underestimate — she knows how to frame a story, and she knows how to broadcast it in real time.\n\nAs she runs, she pieces together what the drone footage actually shows: not just an animal, but tagging equipment. Surgical modification. This creature was made somewhere, or altered, and it was released into a protected marine zone being quietly acquired by a private conservation front — a shell operation for a biotech firm testing transgenic marine fauna outside the reach of any regulatory body.\n\nSam eventually makes contact with a local marine biologist, Dani, who has been quietly documenting anomalies in the reef ecosystem for two years and getting nowhere. Together they have the footage, the data, and a plan to get it to a journalist with reach — but the company has a boat, has people, and has already made one scientist who knew too much simply stop existing.\n\nThe climax returns them to the water. Sam, who has been afraid of it since the first board-jerk, has to go back in — this time with full knowledge of what's down there — to retrieve physical evidence from a research marker on the reef floor before the company's dive team destroys it. The drone, now low on battery, becomes the last camera.\n\nShe gets the shot. She posts it before they reach her.\n\nThe final image echoes the first: glassy water, early light, a drone hovering. But now the whole world is watching.",
      themes:
        "Visibility as power\nInstitutional silence\nThe female body in hostile space\nExtraction vs. stewardship\nProof and trust\nCompetence under terror",
      worldRules:
        "The creature is real, not supernatural. It obeys biology. It has been genetically or surgically altered but it is an animal, not a monster. It behaves like an apex predator, not a villain.\n\nThe footage is fragile. Cloud auto-upload is disabled in the restricted zone — signal was killed, deliberately. Everything lives on physical media until Sam can get it out.\n\nThe company is not cartoonishly evil. They believe in what they're doing. They have a plausible scientific rationale. They are dangerous because they are pragmatic, not because they are sadistic.\n\nBelize is not a backdrop. The local community, ecosystem, and political context are active elements. Local characters have their own stakes and agendas, independent of Sam.\n\nThe drone has limits. Battery life is a ticking clock. It can't follow her indoors or through dense mangrove. Its footage is central but it can fail, and it does.\n\nNo one believes her immediately. Not the local authorities, not the journalist she calls, not the first version of Dani. Credibility has to be earned scene by scene.\n\nThe water is the antagonist's home. Sam is not. Every scene in or on the ocean costs her something.",
    },
    script: dummyScreenplayElements,
    scenes: dummyScenes,
    characters: dummyCharacters,
    wardrobe: dummyWardrobes,
    props: dummyProps,
    assets: dummyAssets,
    locations: dummyLocations
  },
  {
    id:"23490412-492",
    title: "Untitled Project",
    status: "issue",
    type: "feature-film",
    genre: "sci-fi",
    targetLength: 120,
    aspectRatio: "9-16",
    visualStyle: "cinematic",
    notes: "",
    created: new Date("2026-08-03T14:40:30"),
    lastUpdated: new Date("2026-08-09T14:40:30")
  },
];