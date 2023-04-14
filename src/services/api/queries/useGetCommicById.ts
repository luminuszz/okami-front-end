import { Comic } from "@/domain/entities/commic";
import api from "@/services/api";
import { useQuery } from "react-query";

export type UseGetCommicByIdInput = {
  id: string;
};

const getCommicByIdKey = (id: string) => `/commics/${id}`;

const getCommicById = async ({ id }: UseGetCommicByIdInput) => {
  const { data } = await api.get<Comic>(getCommicByIdKey(id));

  return data;
};

const useGetCommicById = (id: string) =>
  useQuery(getCommicByIdKey(id), () => getCommicById({ id }));

export { getCommicByIdKey, getCommicById };

export default useGetCommicById;
