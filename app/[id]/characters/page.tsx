"use client"

import { SectionHeader } from "@/components/local/SectionHeader";
import { MdAdd, MdAutoAwesome, MdDelete, MdOutlineCheckroom, MdOutlineInventory2, MdPersonOutline } from "react-icons/md";
import { useProject } from "../project-context";
import { baseStyle } from "@/constants/styles";
import { CharacterProps, CharacterWardrobeItem, PropProps, ReferenceImage } from "@/types/project";
import { Button } from "@/components/design-system/Button";
import { useEffect, useState } from "react";
import { Input } from "@/components/design-system/Input";
import { ageRangeOptions, characterRoleOptions, genderOptions, wardrobeCategoryOptions } from "@/constants/plot";
import EmptyState from "@/components/local/EmptyState";
import { toOptions } from "@/functions/toOptions";
import { PickerGroup } from "@/components/local/MultiPicker";
import AddToListModal from "@/components/local/AddToListModal";
import ReferenceImages from "@/components/local/ReferenceImages";
import SceneCastRow from "../_components/SceneCastRow";

interface CharacterKit {
  wardrobe: string[];
  props: string[];
}

// "Sarah \"Booker\" Petree" -> "Sarah", so the picker can say "Sarah's Wardrobe".
const firstName = ( name?: string ) => name?.trim().split(" ")[0] ?? "This character"

export default function Home() {

  const [activeChar, setActiveChar] = useState<string | undefined>(undefined)
  const [showAddWardrobe, setShowAddWardrobe] = useState(false)
  const [showAddProp, setShowAddProp] = useState(false)

  // Edits live here until there is somewhere to save them — keyed by character
  // id so switching characters keeps whatever was added to each one.
  const [kitEdits, setKitEdits] = useState<Record<string, CharacterKit>>({})
  const [images, setImages] = useState<Record<string, ReferenceImage[]>>({})
  const [wardrobe, setWardrobe] = useState<CharacterWardrobeItem[]>([])
  const [propCatalogue, setPropCatalogue] = useState<PropProps[]>([])

  const project = useProject()

  useEffect(( ) => {
      if ( !activeChar ) {
        setActiveChar(  project.characters ? project.characters[0].id : undefined )
      }
  }, [ project ])

  useEffect(() => {
    setWardrobe( project.wardrobe ?? [] )
    setPropCatalogue( project.props ?? [] )
  }, [ project ])

  const currentChar = project.characters?.find( ix => ix.id === activeChar)

  const kit: CharacterKit = ( activeChar ? kitEdits[ activeChar ] : undefined ) ?? {
    wardrobe: currentChar?.wardrobe ?? [],
    props: currentChar?.props ?? []
  }

  const updateKit = ( next: Partial<CharacterKit> ) => {
    if ( !activeChar ) return
    setKitEdits( prev => ({ ...prev, [ activeChar ]: { ...kit, ...next } }))
  }

  const owner = firstName( currentChar?.name )

  // Everything the character already has is off the menu; what's left splits
  // into their own items and everyone else's.
  const groups = <T extends { id: string; name: string; originCharacter?: string }>(
    items: T[],
    taken: string[],
    noun: string,
    addNewLabel: string
  ): PickerGroup[] => {
    const available = items.filter(( ix ) => !taken.includes( ix.id ))

    return [
      {
        id: "own",
        label: `${ owner }'s ${ noun }`,
        options: toOptions( available.filter(( ix ) => ix.originCharacter === activeChar )),
        addNewLabel
      },
      {
        id: "other",
        label: `Everyone Else's ${ noun }`,
        options: toOptions( available.filter(( ix ) => ix.originCharacter !== activeChar ))
      }
    ]
  }

  const createWardrobe = ( name: string ) => {
    if ( !activeChar ) return undefined
    const item: CharacterWardrobeItem = {
      id: `wrd-${ Date.now() }`,
      name: name || "New Wardrobe Item",
      originCharacter: activeChar,
      description: "",
      category: "everyday"
    }
    setWardrobe( prev => [ ...prev, item ])
    return item.id
  }

  const createProp = ( name: string ) => {
    if ( !activeChar ) return undefined
    const item: PropProps = {
      id: `prp-${ Date.now() }`,
      name: name || "New Prop",
      look: "Default look",
      originCharacter: activeChar
    }
    setPropCatalogue( prev => [ ...prev, item ])
    return item.id
  }


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



                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Wardrobe</h3>

                        { kit.wardrobe.map(( itemId ) => {
                          const item = wardrobe.find( ix => ix.id === itemId )

                          return <SceneCastRow
                            key={ itemId }
                            icon={ MdOutlineCheckroom }
                            title={ item?.name ?? itemId }
                            subtitle={ wardrobeCategoryOptions.find( ix => ix.id === item?.category )?.label }
                            onRemove={ () => updateKit({ wardrobe: kit.wardrobe.filter( ix => ix !== itemId ) }) }
                          />
                        })}

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add wardrobe"
                          onClick={ () => setShowAddWardrobe( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Props</h3>

                        { kit.props.map(( itemId ) => {
                          const item = propCatalogue.find( ix => ix.id === itemId )

                          return <SceneCastRow
                            key={ itemId }
                            icon={ MdOutlineInventory2 }
                            title={ item?.name ?? itemId }
                            subtitle={ item?.look }
                            onRemove={ () => updateKit({ props: kit.props.filter( ix => ix !== itemId ) }) }
                          />
                        })}

                        <Button
                          type="Inline"
                          size="Small"
                          icon={ MdAdd }
                          label="Add props"
                          onClick={ () => setShowAddProp( true ) }
                        />
                      </section>


                      <section className="flex flex-col gap-2">
                        <h3 className="panel-heading">Reference Images</h3>

                        <ReferenceImages
                          id="characterReferenceImages"
                          images={ activeChar ? images[ activeChar ] ?? [] : [] }
                          onChange={ ( next ) => activeChar && setImages( prev => ({ ...prev, [ activeChar ]: next })) }
                        />
                      </section>


                      <AddToListModal
                        show={ showAddWardrobe }
                        onClose={ () => setShowAddWardrobe( false ) }
                        id="characterWardrobe"
                        title="Add Wardrobe to Character"
                        icon={ MdOutlineCheckroom }
                        confirmLabel="Add Wardrobe"
                        label="Wardrobe"
                        tone="Violet"
                        capsuleIcon={ MdOutlineCheckroom }
                        searchPlaceholder="Search wardrobe"
                        emptyLabel="No wardrobe selected"
                        groups={ groups( wardrobe, kit.wardrobe, "Wardrobe", "Add New Wardrobe" ) }
                        onAdd={ ( ids ) => updateKit({ wardrobe: [ ...kit.wardrobe, ...ids ] }) }
                        onCreate={ createWardrobe }
                      />

                      <AddToListModal
                        show={ showAddProp }
                        onClose={ () => setShowAddProp( false ) }
                        id="characterProps"
                        title="Add Props to Character"
                        icon={ MdOutlineInventory2 }
                        confirmLabel="Add Props"
                        label="Props"
                        tone="Amber"
                        capsuleIcon={ MdOutlineInventory2 }
                        searchPlaceholder="Search props"
                        emptyLabel="No props selected"
                        groups={ groups( propCatalogue, kit.props, "Props", "Add New Prop" ) }
                        onAdd={ ( ids ) => updateKit({ props: [ ...kit.props, ...ids ] }) }
                        onCreate={ createProp }
                      />




                    </div>

          </div>


        </div>


  );
}
