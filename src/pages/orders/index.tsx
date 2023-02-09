import { NextPage } from "next";
import Layout from "@/components/layout";
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

type Order = {
  name?: string;
  traking_code: string;
  status: string;
  date: string;
  isDelivered: boolean;
};

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

const Orders: NextPage = () => {
  return (
    <Layout>
      <Container maxW="container.xl" p="10">
        <Heading>Encomendas</Heading>
        <Flex alignItems="center" justifyContent="flex-end">
          <Button colorScheme="yellow">Adcionar encomenda</Button>
        </Flex>

        <Flex justifyContent="center" alignItems="center" mt="35">
          <SimpleGrid columns={4} spacing="40px" mt="5">
            <OrderCard
              order={{
                date: "11/02/2023",
                traking_code: "SAJHKDASDAS",
                name: "Ligth bar blitz wolf",
                status: "Em trânsito LAURO DE FREITAS - BA",
                isDelivered: false,
              }}
            />
            <OrderCard
              order={{
                date: "11/02/2023",
                traking_code: "SAJHKDASDAS",
                name: "Ligth bar blitz wolf",
                status: "Em trânsito LAURO DE FREITAS - BA",
                isDelivered: false,
              }}
            />
            <OrderCard
              order={{
                date: "11/02/2023",
                traking_code: "SAJHKDASDAS",
                name: "Ligth bar blitz wolf",
                status: "Em trânsito LAURO DE FREITAS - BA",
                isDelivered: false,
              }}
            />
            <OrderCard
              order={{
                date: "11/02/2023",
                traking_code: "SAJHKDASDAS",
                name: "Ligth bar blitz wolf",
                status: "Em trânsito LAURO DE FREITAS - BA",
                isDelivered: false,
              }}
            />
          </SimpleGrid>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Orders;
