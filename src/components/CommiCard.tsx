import { FC, memo } from "react";
import { Commic } from "@/domain/entities/commic";
import { Button, Text, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  commic: Commic;
  onClickMarkReadButton: () => void;
};

const CommiCard: FC<Props> = ({ commic, onClickMarkReadButton }) => {
  const router = useRouter();

  return (
    <VStack spacing="3" justifyContent="center">
      <Image
        cursor="pointer"
        onClick={() => router.push(`/commics/${commic.id}`)}
        fallbackSrc="/placeholder.jpg"
        style={{ borderRadius: "10px" }}
        alt="commic -image"
        width={200}
        height={200}
      />

      <Text
        noOfLines={1}
        textAlign="center"
        fontFamily="body"
        fontSize="lg"
        color="green.200"
      >
        {commic.name}
      </Text>

      <Text
        noOfLines={1}
        textAlign="center"
        fontFamily="body"
        fontSize="lg"
        color="green.300"
      >
        {`Ultimo capitulo lido: ${commic.cap}`}
      </Text>

      {commic.hasNewchapter && (
        <>
          <Button
            isDisabled={!commic.hasNewchapter}
            colorScheme="yellow"
            variant="link"
            as="a"
            href={commic.url}
            target="_blank"
          >
            Capitulo novo disponível !
          </Button>

          <Button
            colorScheme="teal"
            variant="solid"
            onClick={onClickMarkReadButton}
          >
            marcar como lido
          </Button>
        </>
      )}
    </VStack>
  );
};

export default CommiCard;
