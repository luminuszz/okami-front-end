import api from "@/services/api";
import { useMutation, useQueryClient } from "react-query";
import { getOrdersKey } from "@/services/api/queries/useGetOrders";
import { useToast } from "@chakra-ui/react";

export interface CreateOrder {
  name: string;
  traking_code: string;
  recipient_id: string;
}

const createOder = async (payload: CreateOrder) => {
  await api.post("/orders", payload);
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(createOder, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(getOrdersKey);
      toast({
        title: "Encomenda adiciona com sucesso !",
        status: "success",
      });
    },

    onError: () => {
      toast({
        title: "Erro ao adicionar encomenda !",
        status: "error",
      });
    },
  });
};

export { createOder, useCreateOrder };
