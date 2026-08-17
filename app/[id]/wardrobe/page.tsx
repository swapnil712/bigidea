"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdOutlineDryCleaning } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { CharacterWardrobeItem } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { wardrobeCategoryOptions } from "@/constants/plot";
import EmptyState from "@/components/local/EmptyState";
import { toOptions } from "@/functions/toOptions";

export default function Home() {

  const [activeItem, setActiveItem] = useState<string | undefined>(undefined)
  const project = useProject()

  useEffect(( ) => {
      if ( !activeItem ) {
        setActiveItem( project.wardrobe ? project.wardrobe[0].id : undefined )
      }
  }, [ project ])

  const currentItem = project.wardrobe?.find( ix => ix.id === activeItem)

  const characterOptions = toOptions( project.characters, "name" )




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
        (project.wardrobe ?? []).reduce<Record<string, CharacterWardrobeItem[]>>((groups, item) => {
          groups[item.category] = groups[item.category] || [];
          groups[item.category].push(item);
          return groups;
        }, {})
      ).map(([wardrobeCategory, items]) => (

        <div key={wardrobeCategory} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ wardrobeCategoryOptions.find ( ix => ix.id === wardrobeCategory )?.label }</span>
            <div className="border-color border-t grow" />
            <Button icon={ MdAdd } size="Small" type="Tertiary" />
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
                        <Input type="text" id="name" label="Name of the Item" value={ currentItem?.name }  />
                      </div>

                      <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="category" label="Category" value={ currentItem?.category } options={ wardrobeCategoryOptions }  />
                        <Input type="select" id="originCharacter" label="Belongs to" value={ currentItem?.originCharacter } options={ characterOptions }  />
                      </div>


                      <Input type="textarea" id="description" label="Description" value={ currentItem?.description } />



                      <section>
                        <h3 className="panel-heading">Scenes</h3>
                        <Button type="Inline" size="Small" icon={ MdAdd } label="Add item to a scene" />
                      </section>


                      <section>
                        <h3 className="panel-heading">Reference Images</h3>
                        <Button type="Inline" size="Small" icon={ MdAdd } label="Add reference Images" />
                      </section>




                    </div>

          </div>


        </div>


  );
}
