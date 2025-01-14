import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../types";
import { client } from "@/libs/axios/client";

export const useProjects = () => {
  // 全ユーザー取得
  const getProjects = () => {
    return client.get<Project[]>("/projects").then((res) => res.data);
  };

  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData: [],
    staleTime: 0,
  });
};

export const useProject = (id: number) => {
  // 単一ユーザー取得
  const getProject = () => {
    return client.get<Project>(`/projects/${id}`).then((res) => res.data);
  };

  return useQuery({
    queryKey: ["projects", id],
    queryFn: getProject,
    staleTime: 0,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: Omit<Project, "id">) => {
      return client
        .post<Project>("/projects", newProject)
        .then((res) => res.data);
    },
    onSuccess: () => {
      // キャッシュ更新
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
