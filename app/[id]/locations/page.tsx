"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdOutlineRoom } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import EmptyState from "@/components/local/EmptyState";

export default function Home() {

  const [activeLocation, setActiveLocation] = useState<string | undefined>(undefined)
  const project = useProject()

  useEffect(( ) => {
      if ( !activeLocation ) {
        setActiveLocation( project.locations ? project.locations[0].id : undefined )
      }
  }, [ project ])

  const currentLocation = project.locations?.find( ix => ix.id === activeLocation)




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

      <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
        <span>All Locations</span>
        <div className="border-color border-t grow" />
        <Button icon={ MdAdd } size="Small" type="Tertiary" />
      </div>


      {(project.locations ?? []).map((item) => (
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

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Locations" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentLocation?.name || "Location" }
              rightButtons={[
                { icon: MdAutoAwesome, label: "Generate Looks", type: "Secondary", onClick: () => null },
                { icon: MdDelete, type: "Tertiary", onClick: () => null }
              ]}
            />


                    <div className="p-5 gap-5 flex flex-col max-w-200 mx-auto">

                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Location" value={ currentLocation?.name }  />
                      </div>

                      <Input type="text" id="region" label="Region" value={ currentLocation?.region }  />


                      <Input type="textarea" id="description" label="Description" value={ currentLocation?.description } />

                      <Input type="textarea" id="productionNotes" label="Production Notes" hint="(optional)" value={ currentLocation?.productionNotes } />



                      <section>
                        <h3 className="panel-heading">Scenes</h3>
                        <Button type="Inline" size="Small" icon={ MdAdd } label="Add location to a scene" />
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
