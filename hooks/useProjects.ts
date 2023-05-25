import { Project } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { useState } from "react";

export interface FormData {
  name: string;
  due: string;
  description: string;
}

export async function createProject(project: FormData): Promise<FormData> {
  const response = await axios.post("/api/projects", project);
  return response.data;
}

export async function getProjects() {
  const response = await axios.get("/api/projects");
  return response.data;
}

export function useProjects(projects: Project[]) {
  return useQuery<Project[]>(["projects"], getProjects, {
    refetchInterval: 600000, // refetch every 10 minutes
    initialData: projects,
  });
}

export function useProjectMutation() {
  const [form, setFormData] = useState({
    name: "",
    due: "",
    description: "",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (project: FormData) => createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  return {
    form,
    setFormData,
    ...mutation,
  };
}
