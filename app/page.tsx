"use client"

import { formatOptions, genreOptions, sortOptions } from "@/constants/choices";
import InlineSelect from "./home/_components/InlineSelect";
import ProjectCard from "./home/_components/ProjectCard";
import { baseStyle } from "@/constants/styles";
import Prompter from "./home/_components/Prompter";
import { dummyProjects } from "@/constants/dummy/dummyProject";
import Header from "@/components/local/Header";
import { useState } from "react";
import Modal from "@/components/local/Modal";
import { MdMovie } from "react-icons/md";

export const homeContainer = "max-w-3/5 lg:max-w-4/5 mx-auto gap-4"

export default function Home () {

  const [focusPrompter, setFocusPrompter] = useState(false)

  // Held just long enough for the prompter to catch it, then released so the
  // next press of "New Project" fires the pop again.
  const newProject = () => {
    setFocusPrompter( true )
  }

  return <div>

    <Header type="Base" onNewProject={ newProject } />

    <div className={`${ homeContainer } ${ baseStyle.inlineRow } mb-10`}>

      <p className="grow font-bold text-2xl">My Projects</p>

      <InlineSelect label="All Formats" options={ formatOptions } />
      <InlineSelect label="All Genres" options={ genreOptions } />
      <InlineSelect label="Order by Recent" options={ sortOptions } />
    </div>
    

    <div className={ `${ homeContainer }  grid grid-cols-4` }>
      { dummyProjects.map(( item, index) => <ProjectCard key={ index } item={ item } /> )}
    </div>

    <Modal show={ focusPrompter } icon={ MdMovie } onClose={ () => setFocusPrompter( false ) } title="Start a new Project">
      <Prompter />
    </Modal>

  </div>
}