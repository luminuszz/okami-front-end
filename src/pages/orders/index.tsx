import Layout from "@/components/layout";
import Skeleton from "@/components/Skeleton";
import { Order } from "@/domain/entities/order";
import useForm from "@/hooks/useForm";
import {
  CreateOrder,
  useCreateOrder,
} from "@/services/api/mutations/useCreateOrder";
import {
  getOrders,
  getOrdersKey,
  useGetOrders,
} from "@/services/api/queries/useGetOrders";
import {
  Badge,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { sortBy } from "lodash";
import { GetServerSideProps, NextPage } from "next";
import { FC, useState } from "react";
import { dehydrate } from "react-query";
import { z } from "zod";

import { queryClient } from "../_app";

const OrderCard: FC<{ order: Order }> = ({ order }) => {
  return (
    <VStack spacing="2">
      <Image
        src="/package-icon.jpg"
        cursor="pointer"
        fallbackSrc="/placeholder.jpg"
        style={{ borderRadius: "10px" }}
        alt="commic -image"
        width={200}
        height={200}
      />
      <Text color="white" textAlign="center">
        {order?.name ? order?.name : order.traking_code}
      </Text>
      <Text fontWeight="bold" color="white" textAlign="center">
        {order.traking_code}
      </Text>
      <Text
        fontWeight="bold"
        color={order.isDelivered ? "green.400" : "yellow.400"}
        textAlign="center"
      >
        {order.status}
      </Text>
      <Text fontWeight="bold" color="white" as="p" textAlign="center">
        {order.date}
      </Text>

      <Center>
        <Badge
          colorScheme={order.isDelivered ? "green" : "yellow"}
          variant="solid"
        >
          {order.isDelivered ? "Entregue" : "Em transito"}
        </Badge>
      </Center>
    </VStack>
  );
};

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrderModal: FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const createOrder = useCreateOrder();

  const { setFieldValue, onSubmit, isValid } = useForm({
    handleSubmit: (values) => {
      createOrder.mutate({
        name: values.name,
        traking_code: values.traking_code,
        recipient_id: values.traking_code,
      } satisfies CreateOrder);

      onClose();
    },

    initialValues: {
      name: "",
      traking_code: "",
    },

    validationSchema: z.object({
      name: z.string().min(3),
      traking_code: z.string().min(3),
    }),
  });

  // @ts-ignore
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar encomenda</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4">
            <FormControl>
              <Input
                type="text"
                placeholder="Nome"
                onChange={(e) => setFieldValue("name", e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                type="text"
                placeholder="codigo de rastreio"
                onChange={(e) => setFieldValue("traking_code", e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            variant="solid"
            colorScheme="green"
            isDisabled={!isValid}
          >
            Adicionar encomenda
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type ViewOrderProps = {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
};

const ViewOrderModal: FC<ViewOrderProps> = ({ isOpen, onClose, order }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Nome"
                disabled
                value={order.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Código de rastreio</FormLabel>
              <Input
                type="text"
                placeholder="codigo de rastreio"
                disabled
                value={order.traking_code}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ultimo registro de rastreio</FormLabel>
              <Textarea isDisabled disabled />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Orders: NextPage = () => {
  const { data, isLoading, isRefetching } = useGetOrders();

  const [modal, setModal] = useState(false);

  const sortedOrdersByPending = sortBy(data, { isDelivered: true });

  return (
    <Layout>
      <CreateOrderModal isOpen={modal} onClose={() => setModal(false)} />

      <Container maxW="container.xl" p="10">
        <Heading>Encomendas {isRefetching && <Spinner size="md" />}</Heading>
        <Flex alignItems="center" justifyContent="flex-end">
          <Button colorScheme="yellow" onClick={() => setModal(true)}>
            Adicionar encomenda
          </Button>
        </Flex>

        <Flex justifyContent="center" alignItems="center" mt="35">
          <SimpleGrid columns={4} spacing="40px" mt="5">
            {isLoading ? (
              <Skeleton quantity={10} />
            ) : (
              sortedOrdersByPending.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </SimpleGrid>
        </Flex>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.fetchQuery(getOrdersKey, getOrders);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Orders;
