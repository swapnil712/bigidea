"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdOutlineAddBox, MdOutlineViewAgenda } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { AssetCategories, AssetProps, ReferenceImage } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { assetCategoryOptions } from "@/constants/plot";
import EmptyState from "@/components/local/EmptyState";
import { toOptions } from "@/functions/toOptions";
import { sceneLabel } from "@/functions/sceneLabel";
import ReferenceImages from "@/components/local/ReferenceImages";
import AddSceneModal from "../_components/AddSceneModal";
import SceneCastRow from "../_components/SceneCastRow";
import CreateAssetModal from "../_components/CreateAssetModal";

export default function Home() {

  const [activeAsset, setActiveAsset] = useState<string | undefined>(undefined)
  const [showAddScene, setShowAddScene] = useState(false)
  // Set to the category of whichever sidebar group's "+" was pressed.
  const [createAsset, setCreateAsset] = useState<AssetCategories | undefined>(undefined)

  // Edits live here until there is somewhere to save them — keyed by asset id so
  // switching assets keeps whatever was added to each one.
  const [sceneEdits, setSceneEdits] = useState<Record<string, string[]>>({})
  const [images, setImages] = useState<Record<string, ReferenceImage[]>>({})
  const [assets, setAssets] = useState<AssetProps[]>([])

  const project = useProject()

  useEffect(( ) => {
      if ( !activeAsset ) {
        setActiveAsset( project.assets ? project.assets[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setAssets( project.assets ?? [] )
  }, [ project ])

  const currentAsset = assets.find( ix => ix.id === activeAsset)

  const sceneOptions = toOptions( project.scenes, ( scene ) => sceneLabel( scene, project.locations ) )

  const scenes = ( activeAsset ? sceneEdits[ activeAsset ] : undefined ) ?? currentAsset?.scenes ?? []

  const updateScenes = ( next: string[] ) => {
    if ( !activeAsset ) return
    setSceneEdits( prev => ({ ...prev, [ activeAsset ]: next }))
  }




  if (!project.assets) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState
      icon={ MdOutlineAddBox }
      title="There are no assets"
      subtitle="Props, vehicles and set dressing will show up here once they're generated."
      button={{ type: "Primary", label: "Create an asset" }}
    />
    </div>
  }



  return (<div className={ baseStyle.mainWrapper  }>


    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">
      {Object.entries(
        assets.reduce<Record<string, AssetProps[]>>((groups, asset) => {
          groups[asset.category] = groups[asset.category] || [];
          groups[asset.category].push(asset);
          return groups;
        }, {})
      ).map(([assetCategory, categoryAssets]) => (

        <div key={assetCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ assetCategoryOptions.find ( ix => ix.id === assetCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button
              icon={ MdAdd }
              size="Small"
              type="Tertiary"
              onClick={ () => setCreateAsset( assetCategory as AssetCategories ) }
            />
          </div>


          {categoryAssets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveAsset( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeAsset ? "bg-zinc-900 font-bold text-indigo-400" : "" }
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdOutlineAddBox />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Assets" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentAsset?.name || "Asset" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Looks", type: "Secondary", onClick: () => null },
                { icon: MdDelete, type: "Tertiary", onClick: () => null }
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
                        <Input type="text" id="name" label="Name of the Asset" value={ currentAsset?.name }  />
                      </div>

                      <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="category" label="Category" value={ currentAsset?.category } options={ assetCategoryOptions }  />
                        <Input type="number" id="quantity" label="Quantity" value={ currentAsset?.quantity }  />
                      </div>

                      <Input type="select" id="originScene" label="First Appears In" value={ currentAsset?.originScene } options={ sceneOptions }  />


                      <Input type="textarea" id="description" label="Description" value={ currentAsset?.description } />

                      <Input type="textarea" id="productionNotes" label="Production Notes" hint="(optional)" value={ currentAsset?.productionNotes } />



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
                          label="Add asset to a scene"
                          onClick={ () => setShowAddScene( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Reference Images</h3>

                        <ReferenceImages
                          id="assetReferenceImages"
                          images={ activeAsset ? images[ activeAsset ] ?? [] : [] }
                          onChange={ ( next ) => activeAsset && setImages( prev => ({ ...prev, [ activeAsset ]: next })) }
                        />
                      </section>


                      <AddSceneModal
                        show={ showAddScene }
                        onClose={ () => setShowAddScene( false ) }
                        title="Add Asset to Scenes"
                        scenes={ ( project.scenes ?? [] ).filter( ix => !scenes.includes( ix.id )) }
                        locations={ project.locations }
                        onAdd={ ( ids ) => updateScenes([ ...scenes, ...ids ]) }
                      />

                      <CreateAssetModal
                        show={ createAsset !== undefined }
                        onClose={ () => setCreateAsset( undefined ) }
                        defaultCategory={ createAsset }
                        onCreate={ ( asset ) => {
                          setAssets( prev => [ ...prev, asset ])
                          setActiveAsset( asset.id )
                        }}
                      />




                    </div>

          </div>


        </div>


  );
}
