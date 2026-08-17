"use client"
import { Button } from "@/components/design-system/Button";
import { baseStyle } from "@/constants/styles";
import { MdCheck, MdOutlineAttachFile, MdOutlineAutoAwesome, MdOutlineDescription } from "react-icons/md";
import InlineSelect from "./InlineSelect";
import { aspectRatioOptions, formatOptions } from "@/constants/choices";
import Modal from "@/components/local/Modal";
import { useEffect, useRef, useState } from "react";
import { Choice } from "@/components/design-system/Choice";
import EmptyState from "@/components/local/EmptyState";


export default function Prompter ( { isFocused } : { isFocused ?: boolean }) {

    const [showSetup, setShowSetup] = useState<boolean>(false)
    const [stage, setStage] = useState<string | undefined>(undefined)
    const [ocr, setOcr] = useState<boolean>(false)

    // The pop is a one-shot: scale up the moment focus is asked for, then let
    // the transition carry it back down to resting size.
    const [pop, setPop] = useState<boolean>(false)
    const textarea = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if ( !isFocused ) return

        textarea.current?.focus()
        setPop( true )

        const settle = setTimeout( () => setPop( false ), 300 )
        return () => clearTimeout( settle )
    }, [ isFocused ])

    return <div className="max-w-2/5 mx-auto my-10">

        <Modal 
            show={ showSetup } 
            title="Upload a File" 
            onClose={ () => setShowSetup(false) }
            buttons={[
                {
                    label: "Add File",
                    icon: MdCheck,
                    type: "Primary"
                },
                {
                    label: "Cancel",
                    type: "Tertiary",
                    onClick: () => setShowSetup( false )
                }
            ]}
        >

            <EmptyState 
                icon={ MdOutlineDescription }
                title="file_002.pdf"
                subtitle="301 KB ⋅ PDF"
            />
            
            <h3 className="panel-heading">What stage is this document in?</h3>

            <Choice 
                type="Radio"
                id="stage"
                checked={ stage === "finished" }
                onClick={ () => setStage("finished" )}
                label="A finished script"
                subtitle="Kept word-for-word. No text is regenerated."
            />
            <Choice 
                type="Radio"
                id="stage"
                checked={ stage === "idea" }
                onClick={ () => setStage("idea" )}
                label="A story idea or concept"
                subtitle="Used as raw material to generate premise and script."
            />
            <hr />
            <Choice 
                type="Checkbox"
                id="needs_ocr"
                checked={ ocr }
                onClick={ () => setOcr(!ocr) }
                label="This document is scanned or handwritten"
                subtitle="Uses OCR (slower and costs more)"
            />
        </Modal>












        <div className={`origin-bottom transition-transform duration-300 ease-out ${ pop ? "scale-110" : "scale-100" }`}>

                <p className="opacity-60 mb-4 text-center text-sm">Describe your idea in few words, or upload a script, synopsis or treatment.</p>

                <div className="wrapper">

                    <textarea ref={ textarea } placeholder="Write your story idea or concept here...." rows={ 2 } className="w-full p-4 outline-0" />
                    
                    
                    <div className={`${ baseStyle.inlineRow } p-4`}>
                        <div className={`grow ${ baseStyle.inlineRow } gap-4`}>
                            <Button size="Small" type="Secondary" icon={ MdOutlineAttachFile } label="Add File" onClick={ () => setShowSetup(true) } />
                            <InlineSelect label="Micro drama" options={ formatOptions } />
                            <InlineSelect label="16:9" options={ aspectRatioOptions } />
                            <InlineSelect label="90 min" options={ formatOptions } />
                        </div>

                        <Button type="Primary" disabled={ true } icon={ MdOutlineAutoAwesome} label="Generate Big Idea" />
                    </div>
                </div>


        </div>
    </div>
}