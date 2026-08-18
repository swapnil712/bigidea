"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdContentCopy, MdDelete, MdOutlineDryCleaning, MdOutlineViewAgenda, MdPersonOutline } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { CharacterWardrobeItem, ReferenceImage, WardrobeCategories } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { wardrobeCategoryOptions } from "@/constants/plot";
import EmptyState from "@/components/local/EmptyState";
import { toOptions } from "@/functions/toOptions";
import { sceneLabel } from "@/functions/sceneLabel";
import ReferenceImages from "@/components/local/ReferenceImages";
import AddSceneModal from "../_components/AddSceneModal";
import SceneCastRow from "../_components/SceneCastRow";
import CreateWardrobeModal from "../_components/CreateWardrobeModal";

export default function Home() {

  const [activeItem, setActiveItem] = useState<string | undefined>(undefined)
  const [showAddScene, setShowAddScene] = useState(false)
  // Set to the category of whichever sidebar group's "+" was pressed.
  const [createItem, setCreateItem] = useState<WardrobeCategories | undefined>(undefined)

  // Edits live here until there is somewhere to save them — keyed by item id so
  // switching items keeps whatever was added to each one.
  const [sceneEdits, setSceneEdits] = useState<Record<string, string[]>>({})
  const [images, setImages] = useState<Record<string, ReferenceImage[]>>({})
  const [wardrobe, setWardrobe] = useState<CharacterWardrobeItem[]>([])

  const project = useProject()

  useEffect(( ) => {
      if ( !activeItem ) {
        setActiveItem( project.wardrobe ? project.wardrobe[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setWardrobe( project.wardrobe ?? [] )
  }, [ project ])

  const currentItem = wardrobe.find( ix => ix.id === activeItem)

  const characterOptions = toOptions( project.characters, "name" )

  const scenes = ( activeItem ? sceneEdits[ activeItem ] : undefined ) ?? currentItem?.scenes ?? []

  const updateScenes = ( next: string[] ) => {
    if ( !activeItem ) return
    setSceneEdits( prev => ({ ...prev, [ activeItem ]: next }))
  }




  if (!project.wardrobe) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
      icon={ MdOutlineDryCleaning }
      title="There is no wardrobe"
      subtitle="Wardrobe items will show up here once they're generated."
      button={{ type: "Primary", label: "Create a wardrobe item" }}
    />
    </div>
  }



  return (<div className={ baseStyle.mainWrapper  }>


    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">
      {Object.entries(
        wardrobe.reduce<Record<string, CharacterWardrobeItem[]>>((groups, item) => {
          groups[item.category] = groups[item.category] || [];
          groups[item.category].push(item);
          return groups;
        }, {})
      ).map(([wardrobeCategory, items]) => (

        <div key={wardrobeCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ wardrobeCategoryOptions.find ( ix => ix.id === wardrobeCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateItem( wardrobeCategory as WardrobeCategories ) }
            />
          </div>


          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveItem( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeItem ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdOutlineDryCleaning />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Wardrobe" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentItem?.name || "Wardrobe" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Reference", type: "Primary", onClick: () => null },
              ]}
              menu={[
                { id: "duplicate", label: "Duplicate item", icon: MdContentCopy, onClick: () => null },
                { id: "delete", label: "Delete item", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col max-w-200 mx-auto">



                      <div className={ baseStyle.inlineRow }>

                        <div className="wrapper box w-1/2 h-102">
                          Front View
                          <Button size="Small" type="Secondary" label="Generate" onClick={ () => null } />
                        </div>

                        <div className="wrapper box w-1/2 h-102">
                          Back View
                          <Button size="Small" type="Secondary" label="Generate" onClick={ () => null } />
                        </div>

                      </div>

                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Item" value={ currentItem?.name }  />
                      </div>

                      <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="category" label="Category" value={ currentItem?.category } options={ wardrobeCategoryOptions }  />
                        <Input type="select" id="originCharacter" label="Belongs to" value={ currentItem?.originCharacter } options={ characterOptions }  />
                      </div>


                      <Input type="textarea" id="description" label="Description" value={ currentItem?.description } />



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

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add item to a scene"
                          onClick={ () => setShowAddScene( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Reference Images</h3>

                        <ReferenceImages
                          id="wardrobeReferenceImages"
                          images={ activeItem ? images[ activeItem ] ?? [] : [] }
                          onChange={ ( next ) => activeItem && setImages( prev => ({ ...prev, [ activeItem ]: next })) }
                        />
                      </section>


                      <AddSceneModal
                        show={ showAddScene }
                        onClose={ () => setShowAddScene( false ) }
                        title="Add Wardrobe to Scenes"
                        scenes={ ( project.scenes ?? [] ).filter( ix => !scenes.includes( ix.id )) }
                        locations={ project.locations }
                        onAdd={ ( ids ) => updateScenes([ ...scenes, ...ids ]) }
                      />

                      <CreateWardrobeModal
                        show={ createItem !== undefined }
                        onClose={ () => setCreateItem( undefined ) }
                        characters={ project.characters ?? [] }
                        defaultCategory={ createItem }
                        onCreate={ ( item ) => {
                          setWardrobe( prev => [ ...prev, item ])
                          setActiveItem( item.id )
                        }}
                      />




                    </div>

          </div>


        </div>


  );
}
