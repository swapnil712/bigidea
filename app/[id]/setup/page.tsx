"use client"
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { SectionHeader } from "@/components/local/SectionHeader";
import { aspectRatioOptions, formatOptions, genreOptions, visualStyleOptions } from "@/constants/choices";
import { baseStyle } from "@/constants/styles";
import { MdAutoAwesome, MdCheck, MdDelete, MdDownload, MdOutlineFolder, MdOutlineUploadFile, MdViewAgenda } from "react-icons/md";
import { useProject } from "../project-context";
import { dummyScriptVersions } from "@/constants/dummy/dummyVersions";
import Screenplay from "../_components/Screenplay";
import EmptyState from "@/components/local/EmptyState";
import Modal from "@/components/local/Modal";
import { Choice } from "@/components/design-system/Choice";
import { useState } from "react";

export default function Home() {

  const project = useProject()
  const [showRewrite, setShowRewrite] = useState<boolean>(false)

  return (<div className={`wrapper grow items-start flex-row flex`}>
          
          <div className="grow border-e border-color">
            <SectionHeader
              versions={ dummyScriptVersions }
              label="Original Script"
              rightButtons={[
                { icon: MdViewAgenda, label: "Build Scenes", type: "Primary", onClick: () => null },
                { icon: MdAutoAwesome, label: "Rewrite", type: "Secondary", onClick: () => setShowRewrite(true) }
              ]}
              menu={[
                { id: "download", label: "Download", icon: MdDownload, onClick: () => null },
                { id: "clear", label: "Clear script", icon: MdDelete, tone: "Danger", separated: true, onClick: () => null }
              ]}
            />
            <div className="p-3">
              { project.script ? <Screenplay script={ project.script  } /> : <EmptyState 
                icon={ MdOutlineFolder }
                title="There is no screenplay"
                subtitle="You can upload a new screenplay or generate"
                button={{ type: "Primary", label: "Upload", onClick: () => null }}
              /> }
            </div>
          </div>




          <aside className="min-w-1/4 flex flex-col">
            <h3 className="panel-heading px-4! border-t-0!">Script Version</h3>


            <form className={`gap-4 flex p-4 flex-col`}>
              <Input id="file" type="file" label="Upload New Version" hint="(pdf, doc or txt)" options={ formatOptions } />
              <div>
                <Button type="Primary" icon={ MdOutlineUploadFile } size="Small" label="Upload" />
              </div>
            </form>

            <Modal show={ showRewrite } icon={ MdAutoAwesome } onClose={ () => setShowRewrite(false) } title="Re-write with AI">
              <p>What do you want to do with the script?</p>
              <Choice type="Radio" id="what_to_do"
                  label="Rewrite entirely"
                  subtitle="Describe what changes you need, and AI will write a new version"
              />
              <Choice type="Radio"  id="what_to_do"
                  label="Complete the script"
                  subtitle="Describe what happens next, and the AI will complete the script"
              />

              <div className={baseStyle.inlineCol}>
                <hr className="border-b border-color my-2 w-full" />

                <Input id="changes" type="textarea" rows={ 5 } label="Describe your changes" hint="(optional)" placeholder="Example, “make the dialogue more intense...”" />

                <Button size="Regular" type="Primary" label="Generate" />

              </div>
            </Modal>


            <h3 className="panel-heading px-4!">Project Details</h3>

            <form className={`p-4 gap-4 flex flex-col`}>
              <Input id="title" label="Title of the Project" value={ project.title } />

              <div className={ baseStyle.inlineRow }>
                <Input id="format" label="Format" type="select" value={ project.type } options={ formatOptions } />
                <Input id="genre" label="Genre" type="select" value={ project.genre } options={ genreOptions } />
              </div>
              
              <div className={ baseStyle.inlineRow}>
                <Input id="target_length" label="Target Length" value={ project.targetLength } suffix="minutes" type="number" />
                <Input id="aspect_ratio" label="Aspect Ratio" type="select" value={ project.aspectRatio } options={ aspectRatioOptions } />
              </div>


              <Input id="visual_stlye" label="Visual Style" type="select" hint="(optional)" value={ project.visualStyle } options={ visualStyleOptions } />
              <Input id="notes" label="Notes or concept" type="textarea" hint="(optional)" value={ project.notes } placeholder="eg. the idea, logline or concept this project started from..." />
            
              
              <Button type="Primary" icon={ MdCheck } label="Save Changes" />
            
            </form>
          </aside>

        </div>


  );
}
