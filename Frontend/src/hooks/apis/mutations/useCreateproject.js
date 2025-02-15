import { useMutation } from "@tanstack/react-query";
import { createProject } from "../../../apis/project";
export const useCreateProject = () => {
  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: createProject,
    onsuccess: (data) => {
      console.log("project created successfully", data);
    },
    onError: (error) => {
      console.log("error creating project", error);
    },
  });
  return {
    createProjectMutation: mutateAsync,
    isPending,
    isSuccess,
    error,
  };
};
