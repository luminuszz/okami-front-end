import api from "@/services/api";
import { Order } from "@/domain/entities/order";
import { useQuery } from "react-query";

const getOrdersKey = "/orders";

const getOrders = async () => {
  const { data } = await api.get<Order[]>(getOrdersKey);

  return data;
};

const useGetOrders = () => useQuery(getOrdersKey, getOrders, {});

export { getOrders, getOrdersKey, useGetOrders };
