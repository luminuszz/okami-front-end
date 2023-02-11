import { NextPage } from "next";
import Layout from "@/components/layout";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  VStack,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { Order } from "@/domain/entities/order";
import { useGetOrders } from "@/services/api/queries/useGetOrders";
import Skeleton from "@/components/Skeleton";
import useForm from "@/hooks/useForm";
import { boolean, z } from "zod";
import {
  CreateOrder,
  useCreateOrder,
} from "@/services/api/mutations/useCreateOrder";

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

const Orders: NextPage = () => {
  const { data, isLoading, isRefetching } = useGetOrders();

  const [modal, setModal] = useState(false);

  return (
    <Layout>
      <CreateOrderModal isOpen={modal} onClose={() => setModal(false)} />

      <Container maxW="container.xl" p="10">
        <Heading>Encomendas {isRefetching && <Spinner size="md" />}</Heading>
        <Flex alignItems="center" justifyContent="flex-end">
          <Button colorScheme="yellow" onClick={() => setModal(true)}>
            Adcionar encomenda
          </Button>
        </Flex>

        <Flex justifyContent="center" alignItems="center" mt="35">
          <SimpleGrid columns={4} spacing="40px" mt="5">
            {isLoading ? (
              <Skeleton quantity={10} />
            ) : (
              data?.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </SimpleGrid>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Orders;
