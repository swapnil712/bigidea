"use client"
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { SectionHeader } from "@/components/local/SectionHeader";
import { premiseFields } from "@/constants/plot";
import { baseStyle } from "@/constants/styles";
import { getRows } from "@/functions/getRows";
import { MdAutoAwesome, MdCheck, MdDownload, MdDragHandle, MdOutlineDescription, MdRefresh } from "react-icons/md";
import { useProject } from "../project-context";
import { dummyPremiseVersions } from "@/constants/dummy/dummyVersions";
import EmptyState from "@/components/local/EmptyState";

export default function Page () {

    const project = useProject()



      if (!project.scenes ) {
        return <div className={ baseStyle.mainWrapper }>
          <EmptyState 
          icon={ MdOutlineDescription }
          title="There is no premise"
          subtitle="It will show up here once it is generated."
        />
        </div>
      }
    
    
      return <div className={ baseStyle.mainWrapper  }>
              
       <div className="grow bg-zinc-900 rounded-xl">

         <SectionHeader
            versions={ dummyPremiseVersions }
            label="Premise"
            rightButtons={[
            { icon: MdOutlineDescription, label: "Write Screenplay", type: "Primary", onClick: () => null },
            { icon: MdAutoAwesome, label: "Re-generate", type: "Secondary", onClick: () => null }
            ]}
            menu={[
              { id: "download", label: "Download", icon: MdDownload, onClick: () => null },
              { id: "reset", label: "Reset fields", icon: MdRefresh, tone: "Danger", separated: true, onClick: () => null }
            ]}
        />

        <div className="gap-6 flex flex-col max-w-200 mx-auto my-10">
           
           
           { premiseFields.map((field) => (
                <div key={field.id} className={`${baseStyle.inlineRow} liftable border-b border-color items-start`}>
                    <span className="drag-handle"><MdDragHandle size={ 24 } className="opacity-60" /></span>
                    <div className="grow py-1">
                        <Input
                            type={field.type}
                            id={ field.id }
                            size="G"
                            label={field.label}
                            rows={ project.premise ? getRows( project.premise[field.id] ) : 3 }
                            value={ project.premise ? project.premise[field.id] : undefined }
                    />
                    </div>
                    <Button type="Tertiary" size="Small" icon={ MdRefresh } />
                </div>
                ))}



        </div>



       </div>

    </div>
}