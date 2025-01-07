import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/type";
import { client } from "@/libs/axios/client";

export const useUsers = () => {
  // 全ユーザー取得
  const getUsers = () => {
    return client.get<User[]>("/users").then((res) => res.data);
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
    staleTime: 0,
  });
};

export const useUser = (id: number) => {
  // 単一ユーザー取得
  const getUser = () => {
    return client.get<User>(`/users/${id}`).then((res) => res.data);
  };

  return useQuery({
    queryKey: ["users", id],
    queryFn: getUser,
    staleTime: 0,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: Omit<User, "id">) => {
      return client.post<User>("/users", newUser).then((res) => res.data);
    },
    onSuccess: () => {
      // キャッシュ更新
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
