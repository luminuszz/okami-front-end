import api from "@/services/api";
import { Commic } from "@/domain/entities/commic";
import { useQuery } from "react-query";

export const getCommicsId = "/commics/find-all-unread";

export const getCommics = async () => {
  const { data } = await api.get<Commic[]>(getCommicsId);

  return data;
};

const useGetCommics = () => useQuery(getCommicsId, getCommics, {});

export default useGetCommics;
