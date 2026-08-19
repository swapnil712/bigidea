"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdDownload, MdDragHandle, MdOutlineImage, MdOutlinePlayCircle } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { SceneProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import EmptyState from "@/components/local/EmptyState";
import PrevizRow from "../_components/PrevizRow";
import CreateSceneModal from "../_components/CreateSceneModal";
import { intExtOptions, previzBeatOptions, timeOfDayOptions } from "@/constants/plot";

export default function Home() {

  const [activeScene, setActiveScene] = useState<string | undefined>(undefined)
  const [createScene, setCreateScene] = useState<number | undefined>(undefined)

  // Which beats have been generated, keyed by shot id. Lives here until there
  // is somewhere to save them.
  const [generated, setGenerated] = useState<Record<string, string[]>>({})
  const [sceneList, setSceneList] = useState<SceneProps[]>([])

  const project = useProject()

  useEffect(( ) => {
      if ( !activeScene ) {
        setActiveScene(  project.scenes ? project.scenes[0].id : undefined )
      }
      setSceneList( project.scenes ?? [] )
  }, [ project ])

  const currentScene = sceneList.find( ix => ix.id === activeScene)

  const locationName = ( id: string ) => project.locations?.find( ix => ix.id === id )?.name ?? id

  const generate = ( shotId: string, beat: string ) => setGenerated( prev => ({
    ...prev,
    [ shotId ]: prev[ shotId ]?.includes( beat ) ? prev[ shotId ] : [ ...( prev[ shotId ] ?? [] ), beat ]
  }))

  const generateAll = ( shotId: string ) => setGenerated( prev => ({
    ...prev,
    [ shotId ]: previzBeatOptions.map( ix => ix.id )
  }))



  // Nothing to hang a sidebar, header or form off until the script has been
  // broken into scenes.
  if ( !sceneList.length && !project.scenes?.length ) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
        icon={ MdOutlineImage }
        title="There are no scenes to previz"
        subtitle="Scenes show up here once the script has been broken down."
        button={{ type: "Primary", label: "Create a scene", onClick: () => setCreateScene( 1 ) }}
      />

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
  }

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
              className={`${baseStyle.inlineRow} liftable ${ item.id === activeScene ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <span className="drag-handle"><MdDragHandle /></span>
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
                  ${ timeOfDayOptions.find ( ix => ix.id === currentScene.time )?.label }` : "Previz Images" }
              rightButtons={[
                {
                  icon: MdAutoAwesome,
                  label: "Generate all Previz",
                  type: "Primary",
                  onClick: () => currentScene?.shots?.forEach( shot => generateAll( shot.id ))
                },
                { icon: MdOutlinePlayCircle, label: "Play Animatic", type: "Secondary", onClick: () => null }
              ]}
              menu={[
                { id: "regenerate", label: "Regenerate all", icon: MdAutoAwesome, onClick: () => null },
                { id: "export", label: "Export frames", icon: MdDownload, onClick: () => null },
                { id: "clear", label: "Clear all previz", icon: MdDelete, tone: "Danger", separated: true, onClick: () => setGenerated({}) }
              ]}
            />


                    <div className="p-5">

                      { currentScene?.shots ? <div className="flex flex-col gap-5">

                        { currentScene.shots.map(( shot, index ) => (
                          <PrevizRow
                            key={ shot.id }
                            shot={ shot }
                            index={ index }
                            aspectRatio={ project.aspectRatio }
                            generated={ generated[ shot.id ] ?? [] }
                            onGenerate={ ( beat ) => generate( shot.id, beat ) }
                            onGenerateAll={ () => generateAll( shot.id ) }
                            storyboardHref={ `/${ project.id }/storyboard` }
                          />
                        ))}

                      </div> : <EmptyState
                        icon={ MdOutlineImage }
                        title="There are no shots to previz"
                        subtitle="Break the scene down into shots and storyboard them, then the start, middle and end frames show up here."
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
