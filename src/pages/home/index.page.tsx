import CommicCard from "@/components/CommiCard";
import Layout from "@/components/layout";
import Skeleton from "@/components/Skeleton";
import UpdateCommicModal from "@/components/UpdateCommicModal";
import { Comic } from "@/domain/entities/commic";
import useGetCommics, {
  getCommics,
  getCommicsKey,
} from "@/services/api/queries/useGetCommics";

import { Container, Flex, HStack, Input, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { dehydrate } from "react-query";
import { queryClient } from "../_app";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import process from "process";
type SearchBarProps = {
  isRefetching: boolean;
  filter: string;
  setFilter: (value: string) => void;
};

const SearchBar = ({ setFilter, filter }: SearchBarProps) => {
  return (
    <HStack w="full" maxW="600px">
      <Input
        placeholder="Digite ..."
        value={filter}
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
      />
    </HStack>
  );
};

const HomePage: NextPage = () => {
  const { data, isLoading, isRefetching } = useGetCommics();
  const router = useRouter();

  const { status } = useSession({
    required: true,
    async onUnauthenticated() {
      await router.replace("/login");
    },
  });

  const [filter, setFilter] = useState("");

  const [modal, setModal] = useState<{
    isOpen: boolean;
    commic: Comic | null;
  }>({ commic: null, isOpen: false });

  const handleOpenModal = (commic: Comic) => setModal({ isOpen: true, commic });

  const commics = filter
    ? data?.filter((item) => item?.name.toLocaleLowerCase().includes(filter))
    : data;

  const isLogging = status === "loading";

  return (
    <>
      {modal?.commic && (
        <UpdateCommicModal
          commic={modal.commic}
          isOpen={modal.isOpen}
          onClose={() => setModal({ isOpen: false, commic: null })}
        />
      )}
      <Layout>
        <Container maxW="container.xl" py="10">
          <Flex my="5" justifyContent="center">
            <SearchBar
              filter={filter}
              setFilter={setFilter}
              isRefetching={isRefetching}
            />
          </Flex>

          <SimpleGrid columns={[2, 3, 4]} spacing="40px" mt="5">
            {isLoading || isLogging ? (
              <Skeleton quantity={30} />
            ) : (
              <>
                {commics?.map((item) => (
                  <CommicCard
                    key={item.id}
                    commic={item}
                    onClickMarkReadButton={() => handleOpenModal(item)}
                  />
                ))}
              </>
            )}
          </SimpleGrid>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session?.user?.email !== process.env.AUTH_USER_EMAIL) {
    return {
      redirect: {
        permanent: true,
        destination: "/login",
      },
    };
  }

  await queryClient.fetchQuery(getCommicsKey, getCommics);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
