import { MdOutlineMovie } from "react-icons/md";

import { formatOptions } from "@/constants/choices";
import { ProjectProps, ProjectStatus } from "@/types/project";

const statusDotStyles: Record<ProjectStatus, string> = {
  working: "bg-green-500",
  issue: "bg-amber-500",
  archived: "bg-zinc-500",
};

export default function ProjectCard ( { item } : { item : ProjectProps }) {
    return <a href={`/${ item.id }/setup`} className="wrapper block flex flex-col justify-end p-5 hover:bg-zinc-900! transition hover:scale-102">

        <div className="flex flex-row justify-end">
            <div className={`dot ${ statusDotStyles[ item.status ] }`}></div>
        </div>
       
       <div className="my-4">
         <MdOutlineMovie size={ 44 } className="opacity-60" />
       </div>

        <div className="flex flex-col gap-1">
            <p className="font-bold text-xl">{ item.title }</p>
            <p className="opacity-60">{formatOptions.find((f) => f.id === item.type)?.label}</p>
            <p className="text-sm">Last updated <strong>{ item.lastUpdated.toDateString() }</strong></p>
        </div>
    </a>
}