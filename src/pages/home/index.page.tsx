import { NextPage } from "next";
import Layout from "@/components/layout";
import { Container, SimpleGrid } from "@chakra-ui/react";
import CommiCard from "@/components/CommiCard";
import { Commic } from "@/domain/entities/commic";
import useGetCommics from "@/services/api/queries/useGetCommics";
import Skeleton from "@/components/Skeleton";

const HomePage: NextPage = () => {
  const { data, isLoading } = useGetCommics();

  const commics = data?.filter((item) => item.hasNewchapter);

  return (
    <Layout>
      <Container maxW="container.xl" py="10">
        <SimpleGrid columns={4} spacing="40px">
          {isLoading ? (
            <Skeleton quantity={10} />
          ) : (
            <>
              {commics?.map((item) => (
                <CommiCard key={item.id} commic={item} />
              ))}
            </>
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default HomePage;
