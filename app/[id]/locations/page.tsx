"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdContentCopy, MdDelete, MdOutlineLabel, MdOutlineRoom, MdOutlineViewAgenda } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { LocationProps, ReferenceImage } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import EmptyState from "@/components/local/EmptyState";
import { locationCategoryOptions } from "@/constants/plot";
import { OptionType } from "@/constants/choices";
import ManageCategoriesModal from "@/components/local/ManageCategoriesModal";
import { sceneLabel } from "@/functions/sceneLabel";
import ReferenceImages from "@/components/local/ReferenceImages";
import AddSceneModal from "../_components/AddSceneModal";
import SceneCastRow from "../_components/SceneCastRow";
import CreateLocationModal from "../_components/CreateLocationModal";

export default function Home() {

  const [activeLocation, setActiveLocation] = useState<string | undefined>(undefined)
  const [showAddScene, setShowAddScene] = useState(false)
  // Set to the category of whichever sidebar group's "+" was pressed.
  const [createLocation, setCreateLocation] = useState<string | undefined>(undefined)
  const [showCategories, setShowCategories] = useState(false)

  // Edits live here until there is somewhere to save them — keyed by location id
  // so switching locations keeps whatever was added to each one.
  const [sceneEdits, setSceneEdits] = useState<Record<string, string[]>>({})
  const [images, setImages] = useState<Record<string, ReferenceImage[]>>({})
  const [locations, setLocations] = useState<LocationProps[]>([])
  const [categories, setCategories] = useState<OptionType[]>( locationCategoryOptions )

  const project = useProject()

  useEffect(( ) => {
      if ( !activeLocation ) {
        setActiveLocation( project.locations ? project.locations[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setLocations( project.locations ?? [] )
  }, [ project ])

  const currentLocation = locations.find( ix => ix.id === activeLocation)

  // A scene already names its location, so the list starts from that link
  // rather than a second one stored on the location.
  const scenes = ( activeLocation ? sceneEdits[ activeLocation ] : undefined )
    ?? ( project.scenes ?? [] ).filter( ix => ix.location === activeLocation ).map( ix => ix.id )

  const updateScenes = ( next: string[] ) => {
    if ( !activeLocation ) return
    setSceneEdits( prev => ({ ...prev, [ activeLocation ]: next }))
  }




  if (!project.locations) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
      icon={ MdOutlineRoom }
      title="There are no locations"
      subtitle="They will show up here once they're extracted from the script."
      button={{ type: "Primary", label: "Create a location" }}
    />
    </div>
  }



  return (<div className={ baseStyle.mainWrapper  }>


    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">

      {Object.entries(
        locations.reduce<Record<string, LocationProps[]>>((groups, location) => {
          groups[location.category] = groups[location.category] || [];
          groups[location.category].push(location);
          return groups;
        }, {})
      ).map(([locationCategory, categoryLocations]) => (

        <div key={locationCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ categories.find ( ix => ix.id === locationCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateLocation( locationCategory ) }
            />
          </div>


          {categoryLocations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveLocation( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeLocation ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdOutlineRoom />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Locations" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentLocation?.name || "Location" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Reference", type: "Primary", onClick: () => null },
              ]}
              menu={[
                { id: "categories", label: "Manage categories…", icon: MdOutlineLabel, onClick: () => setShowCategories( true ) },
                { id: "duplicate", label: "Duplicate location", icon: MdContentCopy, onClick: () => null },
                { id: "delete", label: "Delete location", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col max-w-200 mx-auto">

                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Location" value={ currentLocation?.name }  />
                      </div>

                      <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="category" label="Category" value={ currentLocation?.category } options={ categories }  />
                        <Input type="text" id="region" label="Region" value={ currentLocation?.region }  />
                      </div>


                      <Input type="textarea" id="description" label="Description" value={ currentLocation?.description } />

                      <Input type="textarea" id="productionNotes" label="Production Notes" hint="(optional)" value={ currentLocation?.productionNotes } />



                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Scenes</h3>

                        { scenes.map(( sceneId ) => {
                          const scene = project.scenes?.find( ix => ix.id === sceneId )

                          return <SceneCastRow
                            key={ sceneId }
                            icon={ MdOutlineViewAgenda }
                            title={ scene ? sceneLabel( scene, locations ) : sceneId }
                            subtitle={ scene && `Script Day ${ scene.scriptDay }` }
                            onRemove={ () => updateScenes( scenes.filter( ix => ix !== sceneId )) }
                          />
                        })}

                        { scenes.length === 0 && <EmptyState
                          size="Small"
                          icon={ MdOutlineViewAgenda }
                          title="Not in any scene yet"
                          subtitle="Track where this location appears so it carries through to the shot list."
                        /> }

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add location to a scene"
                          onClick={ () => setShowAddScene( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Reference Images</h3>

                        <ReferenceImages
                          id="locationReferenceImages"
                          images={ activeLocation ? images[ activeLocation ] ?? [] : [] }
                          onChange={ ( next ) => activeLocation && setImages( prev => ({ ...prev, [ activeLocation ]: next })) }
                        />
                      </section>


                      <AddSceneModal
                        show={ showAddScene }
                        onClose={ () => setShowAddScene( false ) }
                        title="Add Location to Scenes"
                        scenes={ ( project.scenes ?? [] ).filter( ix => !scenes.includes( ix.id )) }
                        locations={ locations }
                        onAdd={ ( ids ) => updateScenes([ ...scenes, ...ids ]) }
                      />

                      <ManageCategoriesModal
                        show={ showCategories }
                        onClose={ () => setShowCategories( false ) }
                        title="Location Categories"
                        noun="locations"
                        categories={ categories }
                        usedIds={ locations.map( ix => ix.category ) }
                        onSave={ setCategories }
                      />

                      <CreateLocationModal
                        show={ createLocation !== undefined }
                        onClose={ () => setCreateLocation( undefined ) }
                        categories={ categories }
                        defaultCategory={ createLocation }
                        onCreate={ ( location ) => {
                          setLocations( prev => [ ...prev, location ])
                          setActiveLocation( location.id )
                        }}
                      />




                    </div>

          </div>


        </div>


  );
}
