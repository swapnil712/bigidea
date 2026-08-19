"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdContentCopy, MdDelete, MdOutlineLabel, MdOutlineMusicNote, MdOutlineViewAgenda } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { MusicProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { musicCategoryOptions } from "@/constants/plot";
import { OptionType } from "@/constants/choices";
import EmptyState from "@/components/local/EmptyState";
import { sceneLabel } from "@/functions/sceneLabel";
import AudioPlayer from "@/components/local/AudioPlayer";
import ManageCategoriesModal from "@/components/local/ManageCategoriesModal";
import AddSceneModal from "../_components/AddSceneModal";
import SceneCastRow from "../_components/SceneCastRow";
import CreateMusicModal from "../_components/CreateMusicModal";

export default function Home() {

  const [activeTrack, setActiveTrack] = useState<string | undefined>(undefined)
  const [showAddScene, setShowAddScene] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  // Set to the category of whichever sidebar group's "+" was pressed.
  const [createTrack, setCreateTrack] = useState<string | undefined>(undefined)

  // Edits live here until there is somewhere to save them — keyed by track id so
  // switching tracks keeps whatever was typed against each one.
  const [sceneEdits, setSceneEdits] = useState<Record<string, string[]>>({})
  const [promptEdits, setPromptEdits] = useState<Record<string, string>>({})
  const [music, setMusic] = useState<MusicProps[]>([])
  const [categories, setCategories] = useState<OptionType[]>( musicCategoryOptions )

  const project = useProject()

  useEffect(( ) => {
      if ( !activeTrack ) {
        setActiveTrack( project.music ? project.music[0].id : undefined )
      }
      setMusic( project.music ?? [] )
  }, [ project ])

  const currentTrack = music.find( ix => ix.id === activeTrack)

  const prompt = ( activeTrack ? promptEdits[ activeTrack ] : undefined ) ?? currentTrack?.prompt ?? ""

  const scenes = ( activeTrack ? sceneEdits[ activeTrack ] : undefined ) ?? currentTrack?.scenes ?? []

  const updateScenes = ( next: string[] ) => {
    if ( !activeTrack ) return
    setSceneEdits( prev => ({ ...prev, [ activeTrack ]: next }))
  }




  if (!project.music) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
      icon={ MdOutlineMusicNote }
      title="There is no music"
      subtitle="Score, themes and source cues will show up here once they're generated."
      button={{ type: "Primary", label: "Create a track" }}
    />
    </div>
  }



  return (<div className={ baseStyle.mainWrapper  }>


    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">
      {Object.entries(
        music.reduce<Record<string, MusicProps[]>>((groups, track) => {
          groups[track.category] = groups[track.category] || [];
          groups[track.category].push(track);
          return groups;
        }, {})
      ).map(([musicCategory, categoryTracks]) => (

        <div key={musicCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ categories.find ( ix => ix.id === musicCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateTrack( musicCategory ) }
            />
          </div>


          {categoryTracks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveTrack( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeTrack ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdOutlineMusicNote />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Suggest Cues from Script" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentTrack?.name || "Music" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Track", type: "Primary", onClick: () => null },
                { icon: MdOutlineViewAgenda, label: "Add to Scene", type: "Secondary", onClick: () => setShowAddScene( true ) }
              ]}
              menu={[
                { id: "categories", label: "Manage categories…", icon: MdOutlineLabel, onClick: () => setShowCategories( true ) },
                { id: "duplicate", label: "Duplicate track", icon: MdContentCopy, onClick: () => null },
                { id: "delete", label: "Delete track", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col max-w-200 mx-auto">


                      {/* The prompt sits above everything — this is the thing you write. */}
                      <div className="wrapper p-4 flex flex-col gap-3">

                        <Input
                          type="textarea"
                          id="prompt"
                          rows={ 4 }
                          label="Describe the track"
                          placeholder="Sparse ambient score, sustained strings and a single clean guitar harmonic, warm and unhurried…"
                          value={ prompt }
                          onChange={ ( value ) => activeTrack && setPromptEdits( prev => ({ ...prev, [ activeTrack ]: value })) }
                        />

                        <div className={ baseStyle.inlineRow }>
                          <Input type="text" id="mood" label="Mood" value={ currentTrack?.mood } />
                          <Input type="select" id="category" label="Category" value={ currentTrack?.category } options={ categories } />
                        </div>

                        <div className={`${ baseStyle.inlineRow } justify-end`}>
                          <Button type="Primary" icon={ MdAutoAwesome } label="Generate Track" onClick={ () => null } />
                        </div>

                      </div>


                      <AudioPlayer
                        label={ currentTrack?.name || "Track" }
                        src={ currentTrack?.audioUrl }
                        onGenerate={ () => null }
                      />


                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Track" value={ currentTrack?.name }  />
                      </div>

                      <Input type="textarea" id="description" label="Description" hint="(optional)" value={ currentTrack?.description } />



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
                          subtitle="Track where this track appears so it carries through to the shot list."
                        /> }

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add track to a scene"
                          onClick={ () => setShowAddScene( true ) }
                        />
                      </section>


                      <AddSceneModal
                        show={ showAddScene }
                        onClose={ () => setShowAddScene( false ) }
                        title="Add Track to Scenes"
                        scenes={ ( project.scenes ?? [] ).filter( ix => !scenes.includes( ix.id )) }
                        locations={ project.locations }
                        onAdd={ ( ids ) => updateScenes([ ...scenes, ...ids ]) }
                      />

                      <CreateMusicModal
                        show={ createTrack !== undefined }
                        onClose={ () => setCreateTrack( undefined ) }
                        categories={ categories }
                        defaultCategory={ createTrack }
                        onCreate={ ( track ) => {
                          setMusic( prev => [ ...prev, track ])
                          setActiveTrack( track.id )
                        }}
                      />

                      <ManageCategoriesModal
                        show={ showCategories }
                        onClose={ () => setShowCategories( false ) }
                        title="Music Categories"
                        noun="tracks"
                        categories={ categories }
                        usedIds={ music.map( ix => ix.category ) }
                        onSave={ setCategories }
                      />




                    </div>

          </div>


        </div>


  );
}
