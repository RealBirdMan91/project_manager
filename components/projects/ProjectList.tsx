"use client";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@prisma/client";
import React from "react";

type Props = {
  projects: Project[];
};

function ProjectList({ projects }: Props) {
  const { data } = useProjects(projects);
  return (
    <>
      {data.map((project) => (
        <div
          className="overflow-hidden rounded-lg bg-white shadow m-2"
          key={project.id}
        >
          <div className="px-4 py-5 sm:p-6">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
