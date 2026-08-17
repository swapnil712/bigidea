"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDragHandle, MdOutlineImage, MdOutlineViewCarousel } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { SceneProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import EmptyState from "@/components/local/EmptyState";
import StoryboardCard from "../_components/StoryboardCard";
import CreateSceneModal from "../_components/CreateSceneModal";
import { intExtOptions, timeOfDayOptions } from "@/constants/plot";

export default function Home() {

  const [activeScene, setActiveScene] = useState<string | undefined>(undefined)
  // Set to the script day of whichever sidebar group's "+" was pressed.
  const [createScene, setCreateScene] = useState<number | undefined>(undefined)

  // Prompt edits live here until there is somewhere to save them — keyed by shot
  // id so switching scenes keeps whatever was typed against each frame.
  const [promptEdits, setPromptEdits] = useState<Record<string, string>>({})
  const [sceneList, setSceneList] = useState<SceneProps[]>([])

  const project = useProject()

  useEffect(( ) => {
      if ( !activeScene ) {
        setActiveScene(  project.scenes ? project.scenes[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setSceneList( project.scenes ?? [] )
  }, [ project ])

  const currentScene = sceneList.find( ix => ix.id === activeScene)

  const locationName = ( id: string ) => project.locations?.find( ix => ix.id === id )?.name ?? id


  return (<div className={`wrapper grow items-start flex-row flex`}>


    <aside className="min-w-1/5 flex p-2 flex-col sticky top-0">
      {Object.entries(
        sceneList.reduce<Record<number, SceneProps[]>>((groups, scene) => {
          groups[scene.scriptDay] = groups[scene.scriptDay] || [];
          groups[scene.scriptDay].push(scene);
          return groups;
        }, {})
      ).map(([scriptDay, scenes]) => (

        <div key={scriptDay} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>Script Day {scriptDay}</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateScene( Number( scriptDay )) }
            />
          </div>


          {scenes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveScene( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeScene ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdDragHandle />
              {item.intExt}. { locationName( item.location ) } - {item.time}
            </button>
          ))}
        </div>
      ))}


    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentScene ? `${ intExtOptions.find ( ix => ix.id === currentScene.intExt)?.label }. 
                  ${ locationName( currentScene.location ) } - 
                  ${ timeOfDayOptions.find ( ix => ix.id === currentScene.time )?.label }` : "Storyboard" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate all frames", type: "Secondary", onClick: () => null }
              ]}
            />


                    <div className="p-5">

                      { currentScene?.shots ? <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5">

                        { currentScene.shots.map(( shot, index ) => (
                          <StoryboardCard
                            key={ shot.id }
                            shot={ shot }
                            index={ index }
                            aspectRatio={ project.aspectRatio }
                            prompt={ promptEdits[ shot.id ] ?? shot.description }
                            onPromptChange={ ( value ) => setPromptEdits( prev => ({ ...prev, [ shot.id ]: value })) }
                            onGenerate={ () => null }
                          />
                        ))}

                        <div className="border border-dotted rounded-lg border-color min-h-100 flex gap-3 flex-col justify-center items-center">
                              <MdOutlineImage size={32} className="opacity-40" />
                            <Button label="Add a Frame" type="Inline" />
                        </div>

                      </div> : <EmptyState
                        icon={ MdOutlineViewCarousel }
                        title="There are no shots to storyboard"
                        subtitle="Break the scene down into shots and the frames will show up here."
                      /> }

                      <CreateSceneModal
                        show={ createScene !== undefined }
                        onClose={ () => setCreateScene( undefined ) }
                        locations={ project.locations ?? [] }
                        defaultScriptDay={ createScene }
                        onCreate={ ( scene ) => {
                          setSceneList( prev => [ ...prev, scene ])
                          setActiveScene( scene.id )
                        }}
                      />

                    </div>

          </div>


        </div>


  );
}
