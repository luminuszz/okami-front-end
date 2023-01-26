import api from "@/services/api";
import { Commic } from "@/domain/entities/commic";
import { useQuery } from "react-query";

const getCommicsKey = "/commics/find-all-unread";

const getCommics = async () => {
  const { data } = await api.get<Commic[]>(getCommicsKey);

  return data;
};

const useGetCommics = () =>
  useQuery(getCommicsKey, getCommics, {
    onSuccess: (data) => data.sort((a, b) => (a.hasNewchapter ? -1 : 1)),
  });

export { getCommics, getCommicsKey };

export default useGetCommics;
