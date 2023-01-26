import { NextPage } from "next";
import Layout from "@/components/layout";
import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import CommiCard from "@/components/CommiCard";
import { Commic } from "@/domain/entities/commic";
import useGetCommics from "@/services/api/queries/useGetCommics";
import Skeleton from "@/components/Skeleton";
import { useState } from "react";
import UpdateCommicModal from "@/components/UpdateCommicModal";

const Loading = ({ show }: { show: boolean }) => {
  return (
    <Flex mb="10" p="10" justifyContent="flex-end" alignItems="flex-end">
      {show && <Spinner size="md" />}
    </Flex>
  );
};

type SearchBarProps = {
  isRefetching: boolean;
  filter: string;
  setFilter: (value: string) => void;
};

const SearchBar = ({ setFilter, filter, isRefetching }: SearchBarProps) => {
  return (
    <HStack w="full" maxW="600px">
      <Input
        placeholder="boku no hero"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </HStack>
  );
};

const HomePage: NextPage = () => {
  const { data, isLoading, isRefetching } = useGetCommics();

  const [filter, setFilter] = useState("");

  const [modal, setModal] = useState<{
    isOpen: boolean;
    commic: Commic | null;
  }>({ commic: null, isOpen: false });

  const handleOpenModal = (commic: Commic) =>
    setModal({ isOpen: true, commic });

  const commics = filter
    ? data?.filter((item) => item?.name.includes(filter))
    : data;

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

          <SimpleGrid columns={4} spacing="40px" mt="5">
            {isLoading ? (
              <Skeleton quantity={30} />
            ) : (
              <>
                {commics?.map((item) => (
                  <CommiCard
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

export default HomePage;
