import { useQuery } from "react-query";
import api from "../index";

const refreshOrderStatusKey = "/orders/refresh-status";

const refreshOrderStatus = async (id?: string) => {
  await api.get(`${refreshOrderStatusKey}/${id}`);
};

const useRefreshOrderStatus = (id?: string) =>
  useQuery(refreshOrderStatusKey, () => refreshOrderStatus(id), {
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !!id,
  });

export { refreshOrderStatus, refreshOrderStatusKey, useRefreshOrderStatus };
