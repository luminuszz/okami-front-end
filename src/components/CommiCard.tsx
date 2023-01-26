import { FC, memo } from "react";
import { Commic } from "@/domain/entities/commic";
import { Button, Flex, Text, VStack, Image } from "@chakra-ui/react";

type Props = {
  commic: Commic;
};

const CommiCard: FC<Props> = ({ commic }) => {
  return (
    <VStack spacing="3" justifyContent="center">
      <Image
        fallbackSrc="/placeholder.jpg"
        style={{ borderRadius: "10px" }}
        alt="commic -image"
        width={200}
        height={200}
      />

      <Text
        textAlign="center"
        fontFamily="body"
        fontSize="lg"
        color="green.200"
      >
        {commic.name}
      </Text>

      <Button
        disabled={!commic.hasNewchapter}
        colorScheme="yellow"
        variant="outline"
      >
        Capitulo novo diponível !
      </Button>

      <Button
        disabled={!commic.hasNewchapter}
        colorScheme="teal"
        variant="solid"
      >
        marcar como lido
      </Button>
    </VStack>
  );
};

export default memo(CommiCard, (prevProps, nextProps) =>
  Object.is(prevProps.commic, nextProps.commic)
);
