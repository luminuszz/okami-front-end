import api from "@/services/api";
import { useQuery } from "react-query";
import { Commic } from "@/domain/entities/commic";

export type UseGetCommicByIdInput = {
  id: string;
};

const getCommicByIdKey = (id: string) => `/commics/${id}`;

const getCommicById = async ({ id }: UseGetCommicByIdInput) => {
  const { data } = await api.get<Commic>(getCommicByIdKey(id));

  return data;
};

const useGetCommicById = (id: string) =>
  useQuery(getCommicByIdKey(id), () => getCommicById({ id }));

export { getCommicByIdKey, getCommicById };

export default useGetCommicById;
