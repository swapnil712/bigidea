"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdDragHandle, MdOutlineViewAgenda, MdPersonOutline, MdUnfoldMore } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { CharacterProps, SceneProps } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Tab } from "@/components/design-system/Tab";
import { Input } from "@/components/design-system/Input";
import { ageRangeOptions, characterRoleOptions, genderOptions, intExtOptions, sceneSourceOptions, timeOfDayOptions } from "@/constants/plot";
import EmptyState from "@/components/local/EmptyState";

export default function Home() {

  const [activeChar, setActiveChar] = useState<string | undefined>(undefined)
  const project = useProject()

  useEffect(( ) => {
      if ( !activeChar ) {
        setActiveChar(  project.characters ? project.characters[0].id : undefined )
      }
  }, [ project ])

  const currentChar = project.characters?.find( ix => ix.id === activeChar)




  if (!project.characters) {
    return <div className={ baseStyle.mainWrapper }>
      <EmptyState 
      icon={ MdPersonOutline }
      title="There are no characters"
      subtitle="They will show up here  once they're generated."
      button={{ type: "Primary", label: "Create a character" }}
    />
    </div>
  }

  

  return (<div className={ baseStyle.mainWrapper  }>
          

    <aside className="min-w-1/5 flex p-2 flex-col  sticky top-0">
      {Object.entries(
        (project.characters ?? []).reduce<Record<string, CharacterProps[]>>((groups, character) => {
          groups[character.role] = groups[character.role] || [];
          groups[character.role].push(character);
          return groups;
        }, {})
      ).map(([characterRole, characters]) => (

        <div key={characterRole} className="flex flex-col">


          <div className={`${baseStyle.inlineRow} justify-between text-sm font-bold opacity-60 px-3 py-1`}>
            <span>{ characterRoleOptions.find ( ix => ix.id === characterRole )?.label }</span>
            <div className="border-color border-t grow" />
            <Button icon={ MdAdd } size="Small" type="Tertiary" />
          </div>


          {characters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={ () => setActiveChar( item.id) }
              className={`${baseStyle.inlineRow} ${ item.id === activeChar ? "bg-zinc-900 font-bold text-indigo-400" : "" } 
                  cursor-pointer text-sm uppercase text-left p-2 rounded-lg hover:bg-zinc-700`}
            >
              <MdPersonOutline />
              {item.name}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4">
        <Button type="Inline" size="Small" icon={ MdAutoAwesome} label="Re-extract Characters" />
      </div>

    </aside>


          <div className="grow border-s bg-zinc-900 border-color">
            <SectionHeader
              label={ currentChar?.name || "Character" }
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

                        <div className={`${  baseStyle.inlineCol } w-1/2 grow`}>
                            <div className="wrapper box h-50 w-full">Side View <Button size="Small" type="Secondary" label="Generate" onClick={ () => null } /></div>
                            <div className="wrapper box h-50 w-full">Back View <Button size="Small" type="Secondary" label="Generate" onClick={ () => null } /></div>
                        </div>

                      </div>




                      <div className={ baseStyle.inlineRow }>
                        <Input type="text" id="name" label="Name of the Character" value={ currentChar?.name }  />
                      </div>

                      <Input type="select" id="role" label="Role" value={ currentChar?.role } options={ characterRoleOptions }  />

                      <div className={ baseStyle.inlineRow }>
                        <Input type="select" id="ageRange" label="Age Range" value={ currentChar?.ageRange } options={ ageRangeOptions }  />
                        <Input type="select" id="gender" label="Gender" value={ currentChar?.gender } options={ genderOptions }  />
                      </div>


                      <Input type="text" id="ethnicity" label="Ethnicity" value={ currentChar?.ethnicity }  />

                      
                      <Input type="textarea" id="description" label="Description" value={ currentChar?.description } />

                   
                      
                      <section>
                        <h3 className="panel-heading">Wardrobe</h3>
                        <Button type="Inline" size="Small" icon={ MdAdd } label="Add wardrobe" />
                      </section>


                      <section>
                        <h3 className="panel-heading">Props</h3>
                        <Button type="Inline" size="Small" icon={ MdAdd } label="Add props to scene" />
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
