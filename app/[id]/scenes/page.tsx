"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdCheck, MdContentCopy, MdDelete, MdDragHandle, MdOutlineMusicNote, MdOutlineViewAgenda, MdOutlineViewCarousel, MdOutlineVolumeUp, MdUnfoldMore } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { CharacterLookInSceneProps, CharacterWardrobeItem, MusicProps, PropProps, SceneProps, Shot, SoundProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { cameraMovementOptions, focalLengthOptions, intExtOptions, musicCategoryOptions, sceneSourceOptions, shotOptions, soundCategoryOptions, timeOfDayOptions } from "@/constants/plot";
import { OptionType } from "@/constants/choices";
import AddToListModal from "@/components/local/AddToListModal";
import { PickerGroup } from "@/components/local/MultiPicker";
import EmptyState from "@/components/local/EmptyState";
import { toOptions } from "@/functions/toOptions";
import { dummyLocations } from "@/constants/dummy/dummyLocations";
import SceneCastRow from "../_components/SceneCastRow";
import AddCharacterModal from "../_components/AddCharacterModal";
import AddPropModal from "../_components/AddPropModal";
import CreateSceneModal from "../_components/CreateSceneModal";
import CreateShotModal from "../_components/CreateShotModal";

interface SceneCast {
  characters: CharacterLookInSceneProps[],
  props: PropProps[]
}

export default function Home() {

  const [activeScene, setActiveScene] = useState<string | undefined>(undefined)
  const [showAddCharacter, setShowAddCharacter] = useState(false)
  const [showAddProp, setShowAddProp] = useState(false)
  const [showAddShot, setShowAddShot] = useState(false)
  const [showAddSound, setShowAddSound] = useState(false)
  const [showAddMusic, setShowAddMusic] = useState(false)
  const [soundPicks, setSoundPicks] = useState<string[]>([])
  const [musicPicks, setMusicPicks] = useState<string[]>([])
  // Set to the script day of whichever sidebar group's "+" was pressed.
  const [createScene, setCreateScene] = useState<number | undefined>(undefined)

  // Edits live here until there is somewhere to save them — keyed by scene id
  // so switching scenes keeps whatever was added to each one.
  const [castEdits, setCastEdits] = useState<Record<string, SceneCast>>({})
  const [sceneList, setSceneList] = useState<SceneProps[]>([])
  const [wardrobe, setWardrobe] = useState<CharacterWardrobeItem[]>([])
  const [propCatalogue, setPropCatalogue] = useState<PropProps[]>([])
  const [sounds, setSounds] = useState<SoundProps[]>([])
  const [music, setMusic] = useState<MusicProps[]>([])

  // Sound and music store the scenes they play in, so this side reads that link
  // rather than keeping a second copy on the scene.
  const [soundEdits, setSoundEdits] = useState<Record<string, string[]>>({})
  const [musicEdits, setMusicEdits] = useState<Record<string, string[]>>({})

  const project = useProject()

  useEffect(( ) => {
      if ( !activeScene ) {
        setActiveScene(  project.scenes ? project.scenes[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setSceneList( project.scenes ?? [] )
    setWardrobe( project.wardrobe ?? [] )
    setPropCatalogue( project.props ?? [] )
    setSounds( project.sounds ?? [] )
    setMusic( project.music ?? [] )
  }, [ project ])


  const currentScene = sceneList.find( ix => ix.id === activeScene)

  const locationName = ( id: string ) => project.locations?.find( ix => ix.id === id )?.name ?? id

  const cast: SceneCast = ( activeScene ? castEdits[ activeScene ] : undefined ) ?? {
    characters: currentScene?.characters ?? [],
    props: currentScene?.props ?? []
  }

  const updateCast = ( next: Partial<SceneCast> ) => {
    if ( !activeScene ) return
    setCastEdits( prev => ({ ...prev, [ activeScene ]: { ...cast, ...next } }))
  }

  const sceneSounds = ( activeScene ? soundEdits[ activeScene ] : undefined )
    ?? sounds.filter( ix => ix.scenes?.includes( activeScene ?? "" )).map( ix => ix.id )

  const sceneMusic = ( activeScene ? musicEdits[ activeScene ] : undefined )
    ?? music.filter( ix => ix.scenes?.includes( activeScene ?? "" )).map( ix => ix.id )

  const updateSounds = ( next: string[] ) => activeScene && setSoundEdits( prev => ({ ...prev, [ activeScene ]: next }))
  const updateMusic = ( next: string[] ) => activeScene && setMusicEdits( prev => ({ ...prev, [ activeScene ]: next }))

  // One picker group per category, minus whatever is already in the scene.
  const categoryGroups = <T extends { id: string; name: string; category: string }>(
    items: T[],
    taken: string[],
    options: OptionType[]
  ): PickerGroup[] => options
    .map(( option ) => ({
      id: option.id,
      label: option.label,
      options: toOptions( items.filter( ix => ix.category === option.id && !taken.includes( ix.id )))
    }))
    .filter(( group ) => group.options.length > 0 )

  const wardrobeName = ( id: string ) => wardrobe.find( ix => ix.id === id )?.name ?? id
  const propName = ( id: string ) => propCatalogue.find( ix => ix.id === id )?.name ?? id

  // The create modals build the item from their own form — this just files it
  // in the catalogue the pickers read from.
  const createWardrobe = ( item: CharacterWardrobeItem ) => setWardrobe( prev => [ ...prev, item ])

  const createProp = ( item: PropProps ) => setPropCatalogue( prev => [ ...prev, item ])

  // Shots live on the scene itself, so this edits the scene in the local list.
  const addShot = ( shot: Shot ) => setSceneList( prev => prev.map( scene =>
    scene.id === activeScene ? { ...scene, shots: [ ...( scene.shots ?? [] ), shot ] } : scene
  ))

  const addProps = ( ids: string[] ) => updateCast({
    props: [
      ...cast.props,
      ...propCatalogue.filter( ix => ids.includes( ix.id ) && !cast.props.some( existing => existing.id === ix.id ))
    ]
  })


  // Nothing to hang a sidebar, header or form off until the script has been
  // broken into scenes.
  if ( !sceneList.length && !project.scenes?.length ) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
        icon={ MdOutlineViewAgenda }
        title="There are no scenes"
        subtitle="Break the script down into scenes, or add the first one yourself."
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
              {item.intExt}. { dummyLocations.find ( ix => ix.id === item.location )?.name } - {item.time}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Auto-suggest Script Days" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900  border-color">
            <SectionHeader
               label={ currentScene ? `${ intExtOptions.find ( ix => ix.id === currentScene.intExt)?.label }. 
                  ${ locationName( currentScene.location ) } - 
                  ${ timeOfDayOptions.find ( ix => ix.id === currentScene.time )?.label }` : "Storyboard" }
              rightButtons={[
                { icon: MdOutlineViewAgenda, type:"Tertiary", label: "Script Day", onClick: () => null },
                { icon: MdUnfoldMore, type:"Tertiary", label: "Scene Number", onClick: () => null },
                currentScene?.shots?.length
                  ? { icon: MdOutlineViewCarousel, label: "Storyboard this Scene", type: "Primary", onClick: () => null }
                  : { icon: MdAutoAwesome, label: "Generate Shots", type: "Primary", onClick: () => null },
              ]}
              menu={[
                { id: "duplicate", label: "Duplicate scene", icon: MdContentCopy, onClick: () => null },
                { id: "delete", label: "Delete scene", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col mx-auto">

                     
                    <section className={`${ baseStyle.inlineRow } items-start gap-3`}>


                    <div className="wrapper p-5 flex flex-col gap-5 w-1/2">

                      <h2 className="font-bold">Scene Details</h2>

                       <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="intExt" label="INT/EXT" value={ currentScene?.intExt } options={intExtOptions} />
                        <Input type="select" id="location" label="Location" value={ currentScene?.location } options={ toOptions( project.locations, "name", "name" ) } />
                        <Input type="select" id="time" label="Time of Day" value={ currentScene?.time } options={timeOfDayOptions} />
                      </div>


                      <div className={ baseStyle.inlineRow }>
                        <Input type="number" id="scriptDay" label="Script Day" value={ currentScene?.scriptDay }  />
                        <Input type="select" id="sceneSource" label="Scene Source" value={ currentScene?.sceneSource } options={ sceneSourceOptions } />
                      </div>

                      
                      <Input type="textarea" id="synopsis" label="Scene Synopsis" value={ currentScene?.synopsis } />
                      <Input type="textarea" id="emotionalBeat" label="Emotional Beat" value={ currentScene?.emotionalBeat } />
                      <Input type="textarea" id="productionNotes" label="Production Notes" hint="(optional)" value={ currentScene?.productionNotes } />

                      
                      
                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Characters</h3>

                        { cast.characters.map(( entry ) => {
                          const character = project.characters?.find( ix => ix.id === entry.id )

                          return <SceneCastRow
                            key={ entry.id }
                            title={ character?.name ?? entry.id }
                            subtitle={ entry.look }
                            initial={ ( character?.name ?? "?" ).charAt(0) }
                            wardrobe={ entry.wardrobe.map( wardrobeName ) }
                            props={ ( entry.props ?? [] ).map( propName ) }
                            onRemove={ () => updateCast({ characters: cast.characters.filter( ix => ix.id !== entry.id ) }) }
                          />
                        })}

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add character to scene"
                          onClick={ () => setShowAddCharacter( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Props</h3>

                        { cast.props.map(( entry ) => (
                          <SceneCastRow
                            key={ entry.id }
                            title={ entry.name }
                            subtitle={ entry.look }
                            onRemove={ () => updateCast({ props: cast.props.filter( ix => ix.id !== entry.id ) }) }
                          />
                        ))}

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add props to scene"
                          onClick={ () => setShowAddProp( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Sounds</h3>

                        { sceneSounds.map(( soundId ) => {
                          const sound = sounds.find( ix => ix.id === soundId )

                          return <SceneCastRow
                            key={ soundId }
                            icon={ MdOutlineVolumeUp }
                            title={ sound?.name ?? soundId }
                            subtitle={ soundCategoryOptions.find( ix => ix.id === sound?.category )?.label }
                            onRemove={ () => updateSounds( sceneSounds.filter( ix => ix !== soundId )) }
                          />
                        })}

                        { sceneSounds.length === 0 && <EmptyState
                          size="Small"
                          icon={ MdOutlineVolumeUp }
                          title="No sounds in this scene"
                          subtitle="Effects, foley and ambience heard while this scene plays."
                        /> }

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add sound to scene"
                          onClick={ () => { setSoundPicks([]); setShowAddSound( true ) } }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Music</h3>

                        { sceneMusic.map(( trackId ) => {
                          const track = music.find( ix => ix.id === trackId )

                          return <SceneCastRow
                            key={ trackId }
                            icon={ MdOutlineMusicNote }
                            title={ track?.name ?? trackId }
                            subtitle={ musicCategoryOptions.find( ix => ix.id === track?.category )?.label }
                            onRemove={ () => updateMusic( sceneMusic.filter( ix => ix !== trackId )) }
                          />
                        })}

                        { sceneMusic.length === 0 && <EmptyState
                          size="Small"
                          icon={ MdOutlineMusicNote }
                          title="No music in this scene"
                          subtitle="Score, themes or source cues playing under this scene."
                        /> }

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add music to scene"
                          onClick={ () => { setMusicPicks([]); setShowAddMusic( true ) } }
                        />
                      </section>


                      <Button type="Primary" icon={ MdCheck } label="Save Changes" stretch onClick={ () => null } />


                      <AddCharacterModal
                        show={ showAddCharacter }
                        onClose={ () => setShowAddCharacter( false ) }
                        characters={ ( project.characters ?? [] ).filter( ix => !cast.characters.some( entry => entry.id === ix.id )) }
                        wardrobe={ wardrobe }
                        props={ propCatalogue }
                        onAdd={ ( entry ) => updateCast({ characters: [ ...cast.characters, entry ] }) }
                        onCreateWardrobe={ createWardrobe }
                        onCreateProp={ createProp }
                      />

                      <AddPropModal
                        show={ showAddProp }
                        onClose={ () => setShowAddProp( false ) }
                        characters={ project.characters ?? [] }
                        props={ propCatalogue.filter( ix => !cast.props.some( entry => entry.id === ix.id )) }
                        onAdd={ addProps }
                        onCreateProp={ createProp }
                      />

                      <AddToListModal
                        show={ showAddSound }
                        onClose={ () => setShowAddSound( false ) }
                        id="sceneSounds"
                        title="Add Sounds to Scene"
                        icon={ MdOutlineVolumeUp }
                        confirmLabel="Add Sounds"
                        label="Sounds"
                        searchPlaceholder="Search sounds"
                        emptyLabel="No sounds selected"
                        groups={ categoryGroups( sounds, sceneSounds, soundCategoryOptions ) }
                        selected={ soundPicks }
                        onSelectedChange={ setSoundPicks }
                        onAdd={ ( ids ) => updateSounds([ ...sceneSounds, ...ids ]) }
                      />

                      <AddToListModal
                        show={ showAddMusic }
                        onClose={ () => setShowAddMusic( false ) }
                        id="sceneMusic"
                        title="Add Music to Scene"
                        icon={ MdOutlineMusicNote }
                        confirmLabel="Add Music"
                        label="Music"
                        searchPlaceholder="Search music"
                        emptyLabel="No music selected"
                        groups={ categoryGroups( music, sceneMusic, musicCategoryOptions ) }
                        selected={ musicPicks }
                        onSelectedChange={ setMusicPicks }
                        onAdd={ ( ids ) => updateMusic([ ...sceneMusic, ...ids ]) }
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
                     
                     
                     
                    <div className="wrapper p-5 w-1/2">

                      <h2 className="font-bold mb-4">Shots Breakdown</h2>

                      { currentScene?.shots && currentScene?.shots.map((field) => (
                        <div key={field.id} className={`${baseStyle.inlineRow} liftable items-start mb-5`}>
                            <span className="drag-handle"><MdDragHandle size={ 24 } /></span>
                            <div className="grow flex flex-col border-b border-color pb-4">
                                
                                <div className={ baseStyle.inlineRow}>
                                  <Input
                                        type="text"
                                        size="G"
                                        id={ field.id }
                                        value={ field.label }
                                  />
                                  <Input
                                        type="select"
                                        size="G"
                                        fit
                                        id={`select-${ field.id }`}
                                        value={ field.shotType }
                                        options={ shotOptions }
                                  />

                                  <Input
                                        type="select"
                                        size="G"
                                        fit
                                        id={`movement-${ field.id }`}
                                        value={ field.movement }
                                        options={ cameraMovementOptions }
                                  />
                                  <Input
                                        type="select"
                                        size="G"
                                        fit
                                        id={`focal-${ field.id }`}
                                        value={ field.focalLength }
                                        options={ focalLengthOptions }
                                  />
                                </div>

                                <Input
                                      type="textarea"
                                      id={ field.id }
                                      size="G"
                                      value={ field.description }
                                />


                            </div>
                        </div>
                        ))}

                      
                    { !currentScene?.shots?.length && <EmptyState
                        icon={ MdOutlineViewAgenda }
                        title="There are no shots"
                        subtitle="You will see shots here when they're generated"
                      /> }

                    <Button type="Inline" label="Add a Shot" icon={ MdAdd } onClick={ () => setShowAddShot( true ) } />

                    <CreateShotModal
                      show={ showAddShot }
                      onClose={ () => setShowAddShot( false ) }
                      onCreate={ addShot }
                    />
                      
                    </div>


                    </section>


                    </div>

          </div>


        </div>


  );
}
