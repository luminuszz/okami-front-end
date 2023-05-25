import { Comic } from "@/domain/entities/commic";
import useMarkCommicRead from "@/services/api/mutations/useMarkCommicRead";
import { getCommicsKey } from "@/services/api/queries/useGetCommics";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { z } from "zod";

type Props = {
  commic: Comic;
  isOpen: boolean;
  onClose: () => void;
};

const UpdateCommicModal = ({ commic, onClose, isOpen }: Props) => {
  const [input, setInput] = useState<string>("");
  const client = useQueryClient();
  const toast = useToast();

  console.log(commic);

  useEffect(() => {
    if (commic) {
      setInput(String(commic.chapter));
    }
  }, [commic]);

  const markCommicAsReadMutation = useMarkCommicRead({
    onMutate() {
      client.setQueryData<Comic[]>(getCommicsKey, (oldData) =>
        filter(oldData, (item) => item.id !== commic.id)
      );
    },
    onSuccess() {
      client.invalidateQueries(getCommicsKey);
      toast({
        title: "Capitulo marcado como lido",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError() {
      toast({
        title: "Erro ao marcar capitulo como lido",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
    onSettled() {
      setInput("");
    },
  });

  const handleSubmit = () => {
    const chapter = z.string().transform(Number).parse(input);

    const payload = {
      id: commic.id,
      chapter,
    };

    markCommicAsReadMutation.mutate(payload);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Marcar como lido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Capitulo</FormLabel>
            <NumberInput min={0} value={input} onChange={(e) => setInput(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Marcar como lido</FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit} variant="solid">
            Marcar como lido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCommicModal;
