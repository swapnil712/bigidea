import { intExtOptions, timeOfDayOptions } from "@/constants/plot";
import { LocationProps, SceneProps } from "@/types/project";

// The slugline a scene is known by across the app: "EXT. Reef Floor - Dawn".
export const sceneLabel = (scene: SceneProps, locations?: LocationProps[]) => {
  const intExt = intExtOptions.find((ix) => ix.id === scene.intExt)?.label ?? scene.intExt;
  const location = locations?.find((ix) => ix.id === scene.location)?.name ?? scene.location;
  const time = timeOfDayOptions.find((ix) => ix.id === scene.time)?.label ?? scene.time;

  return `${intExt}. ${location} - ${time}`;
};
