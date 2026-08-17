import { Nav } from "@/components/local/Nav";
import { dummyProjects } from "@/constants/dummy/dummyProject";
import { baseStyle } from "@/constants/styles";
import { ReactNode } from "react";
import { ProjectProvider } from "./project-context";
import { PanelProvider } from "./panel-context";
import Header from "@/components/local/Header";

export default async function Layout ( { children, params } : { children : ReactNode, params: Promise<{ id: string }>}) {

    const { id } = await params
    const project = dummyProjects.find(( p) => p.id === id)

    if( !project ) return <div>not found</div>

    return <ProjectProvider project={ project }>
        <PanelProvider>

            <Header type="Inside" project={ project } />

            <div className={`${ baseStyle.inlineRow } px-3 items-start`}>
                <Nav project={ project } />
                { children }
            </div>

        </PanelProvider>
    </ProjectProvider>
}