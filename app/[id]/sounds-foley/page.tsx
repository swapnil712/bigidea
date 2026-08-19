"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdContentCopy, MdDelete, MdOutlineLabel, MdOutlineViewAgenda, MdOutlineVolumeUp } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { ReferenceAudio, SoundProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { soundCategoryOptions } from "@/constants/plot";
import { OptionType } from "@/constants/choices";
import EmptyState from "@/components/local/EmptyState";
import { sceneLabel } from "@/functions/sceneLabel";
import AudioPlayer from "@/components/local/AudioPlayer";
import ReferenceSounds from "@/components/local/ReferenceSounds";
import ManageCategoriesModal from "@/components/local/ManageCategoriesModal";
import AddSceneModal from "../_components/AddSceneModal";
import SceneCastRow from "../_components/SceneCastRow";
import CreateSoundModal from "../_components/CreateSoundModal";

export default function Home() {

  const [activeSound, setActiveSound] = useState<string | undefined>(undefined)
  const [showAddScene, setShowAddScene] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  // Set to the category of whichever sidebar group's "+" was pressed.
  const [createSound, setCreateSound] = useState<string | undefined>(undefined)

  // Edits live here until there is somewhere to save them — keyed by sound id so
  // switching sounds keeps whatever was added to each one.
  const [sceneEdits, setSceneEdits] = useState<Record<string, string[]>>({})
  const [referenceSounds, setReferenceSounds] = useState<Record<string, ReferenceAudio[]>>({})
  const [sounds, setSounds] = useState<SoundProps[]>([])
  const [categories, setCategories] = useState<OptionType[]>( soundCategoryOptions )

  const project = useProject()

  useEffect(( ) => {
      if ( !activeSound ) {
        setActiveSound( project.sounds ? project.sounds[0].id : undefined )
      }
      setSounds( project.sounds ?? [] )
  }, [ project ])

  const currentSound = sounds.find( ix => ix.id === activeSound)

  const scenes = ( activeSound ? sceneEdits[ activeSound ] : undefined ) ?? currentSound?.scenes ?? []

  const updateScenes = ( next: string[] ) => {
    if ( !activeSound ) return
    setSceneEdits( prev => ({ ...prev, [ activeSound ]: next }))
  }




  if (!project.sounds) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
      icon={ MdOutlineVolumeUp }
      title="There are no sounds"
      subtitle="Effects, foley and ambience will show up here once they're generated."
      button={{ type: "Primary", label: "Create a sound" }}
    />
    </div>
  }



  return (<div className={ baseStyle.mainWrapper  }>


    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">
      {Object.entries(
        sounds.reduce<Record<string, SoundProps[]>>((groups, sound) => {
          groups[sound.category] = groups[sound.category] || [];
          groups[sound.category].push(sound);
          return groups;
        }, {})
      ).map(([soundCategory, categorySounds]) => (

        <div key={soundCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ categories.find ( ix => ix.id === soundCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateSound( soundCategory ) }
            />
          </div>


          {categorySounds.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveSound( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeSound ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdOutlineVolumeUp />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Sounds" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentSound?.name || "Sound" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Sound", type: "Primary", onClick: () => null },
                { icon: MdOutlineViewAgenda, label: "Add to Scene", type: "Secondary", onClick: () => setShowAddScene( true ) }
              ]}
              menu={[
                { id: "categories", label: "Manage categories…", icon: MdOutlineLabel, onClick: () => setShowCategories( true ) },
                { id: "duplicate", label: "Duplicate sound", icon: MdContentCopy, onClick: () => null },
                { id: "delete", label: "Delete sound", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col max-w-200 mx-auto">


                      <AudioPlayer
                        label={ currentSound?.name || "Sound" }
                        src={ currentSound?.audioUrl }
                        onGenerate={ () => null }
                      />


                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Sound" value={ currentSound?.name }  />
                      </div>

                      <Input type="select" id="category" label="Category" value={ currentSound?.category } options={ categories }  />


                      <Input type="textarea" id="description" label="Description" value={ currentSound?.description } />

                      <Input type="textarea" id="productionNotes" label="Production Notes" hint="(optional)" value={ currentSound?.productionNotes } />



                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Scenes</h3>

                        { scenes.map(( sceneId ) => {
                          const scene = project.scenes?.find( ix => ix.id === sceneId )

                          return <SceneCastRow
                            key={ sceneId }
                            icon={ MdOutlineViewAgenda }
                            title={ scene ? sceneLabel( scene, project.locations ) : sceneId }
                            subtitle={ scene && `Script Day ${ scene.scriptDay }` }
                            onRemove={ () => updateScenes( scenes.filter( ix => ix !== sceneId )) }
                          />
                        })}

                        { scenes.length === 0 && <EmptyState
                          size="Small"
                          icon={ MdOutlineViewAgenda }
                          title="Not in any scene yet"
                          subtitle="Track where this sound appears so it carries through to the shot list."
                        /> }

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add sound to a scene"
                          onClick={ () => setShowAddScene( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Reference Sounds</h3>

                        <ReferenceSounds
                          id="soundReferenceSounds"
                          sounds={ activeSound ? referenceSounds[ activeSound ] ?? [] : [] }
                          onChange={ ( next ) => activeSound && setReferenceSounds( prev => ({ ...prev, [ activeSound ]: next })) }
                        />
                      </section>


                      <AddSceneModal
                        show={ showAddScene }
                        onClose={ () => setShowAddScene( false ) }
                        title="Add Sound to Scenes"
                        scenes={ ( project.scenes ?? [] ).filter( ix => !scenes.includes( ix.id )) }
                        locations={ project.locations }
                        onAdd={ ( ids ) => updateScenes([ ...scenes, ...ids ]) }
                      />

                      <CreateSoundModal
                        show={ createSound !== undefined }
                        onClose={ () => setCreateSound( undefined ) }
                        categories={ categories }
                        defaultCategory={ createSound }
                        onCreate={ ( sound ) => {
                          setSounds( prev => [ ...prev, sound ])
                          setActiveSound( sound.id )
                        }}
                      />

                      <ManageCategoriesModal
                        show={ showCategories }
                        onClose={ () => setShowCategories( false ) }
                        title="Sound Categories"
                        noun="sounds"
                        categories={ categories }
                        usedIds={ sounds.map( ix => ix.category ) }
                        onSave={ setCategories }
                      />




                    </div>

          </div>


        </div>


  );
}
