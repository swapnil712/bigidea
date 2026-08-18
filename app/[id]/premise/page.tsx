"use client"
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { SectionHeader } from "@/components/local/SectionHeader";
import { premiseFields } from "@/constants/plot";
import { baseStyle } from "@/constants/styles";
import { getRows } from "@/functions/getRows";
import { MdAutoAwesome, MdCheck, MdDownload, MdDragHandle, MdHistory, MdOutlineDescription, MdRefresh } from "react-icons/md";
import { useProject } from "../project-context";
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
            leftButton={{ icon: MdHistory, size: "Regular", type: "Tertiary" }}
            label="Premise"
            rightButtons={[
            { icon: MdAutoAwesome, label: "Re-generate", type: "Primary", onClick: () => null },
            { icon: MdDownload, label: "Download", type: "Secondary", onClick: () => null }
            ]}
        />

        <div className="py-6 gap-10 flex flex-col max-w-200 mx-auto">
           
           
           { project.premise && premiseFields.map((field) => (
                <div key={field.id} className={`${baseStyle.inlineRow} border-b border-color items-start`}>
                    <Button type="Tertiary" icon={MdDragHandle} />
                    <div className="grow py-3">
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