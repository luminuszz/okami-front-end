import { Comic } from "@/domain/entities/commic";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  commic: Comic;
  onClickMarkReadButton: () => void;
};

const CommicCard: FC<Props> = ({ commic, onClickMarkReadButton }) => {
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
        fontSize={["md", "lg"]}
        color="green.200"
      >
        {commic.name}
      </Text>

      <Text
        noOfLines={1}
        textAlign="center"
        fontFamily="body"
        fontSize={["md", "lg"]}
        color="green.300"
      >
        {`Ultimo capitulo lido: ${commic.chapter}`}
      </Text>

      {commic.hasNewChapter && (
        <>
          <Button
            isDisabled={!commic.hasNewChapter}
            colorScheme="yellow"
            variant="link"
            as="a"
            href={commic.url}
            target="_blank"
            fontSize={["sm", "md", "lg"]}
          >
            Capitulo novo disponível !
          </Button>

          <Button
            colorScheme="teal"
            variant="solid"
            onClick={onClickMarkReadButton}
            fontSize={["sm", "md", "lg"]}
          >
            marcar como lido
          </Button>
        </>
      )}
    </VStack>
  );
};

export default CommicCard;
