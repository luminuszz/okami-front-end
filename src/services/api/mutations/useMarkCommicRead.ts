import api from "@/services/api";
import { useMutation, UseMutationOptions } from "react-query";

export type MarkCommicReadInput = {
  chapter: number;
  id: string;
};

export const markCommicReadKey = (id: string) => `/commics/${id}/update`;

export const markCommicRead = async ({ chapter, id }: MarkCommicReadInput) => {
  const payload = {
    chapter,
    id,
  };

  await api.patch(markCommicReadKey(id), payload);
};

const useMarkCommicRead = (config?: UseMutationOptions) =>
  useMutation(markCommicRead, config as any);

export default useMarkCommicRead;
