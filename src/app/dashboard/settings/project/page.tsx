'use client'

import { userStore } from "@/lib/store";
import React from 'react'
import ProjectOwnerSettings from "./ProjectOwnerSettings";
import ProjectEditorSettings from "./ProjectEditorSettings";
import ProjectViewerSettings from "./ProjectViewerSettings";
import Sidebar from "@/components/dashboard/Sidebar";

type Props = {}

const ProjectSettings = (props: Props) => {

    const activeProject = userStore(state => state.activeProject);

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full ">
                {activeProject?.role === "owner" && (
                    <ProjectOwnerSettings />
                )}

                {activeProject?.role === "editor" && (
                    <ProjectEditorSettings />
                )}

                {activeProject?.role === "viewer" && (
                    <ProjectViewerSettings />
                )}
            </div>
        </div>
    )
}

export default ProjectSettings