import React, { PropsWithChildren, useEffect, useState } from "react";
import { Commic } from "@/domain/entities/commic";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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
import useMarkCommicRead, {
  MarkCommicReadInput,
} from "@/services/api/mutations/useMarkCommicRead";
import { filter } from "lodash";
import { useQueryClient } from "react-query";
import { getCommicsKey } from "@/services/api/queries/useGetCommics";
import { z } from "zod";

type Props = {
  commic: Commic;
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
      setInput(String(commic.cap));
    }
  }, [commic]);

  const markCommicAsReadMutation = useMarkCommicRead({
    onMutate() {
      client.setQueryData(getCommicsKey, (oldData) =>
        filter(oldData as Commic[], (item) => item.id !== commic.id)
      );
    },
  });

  const handleSubmit = () => {
    const chapter = z.string().transform(Number).parse(input);

    const payload = {
      id: commic.id,
      chapter,
    };

    markCommicAsReadMutation.mutate(payload, {
      onSuccess() {
        toast({
          title: "Capitulo marcado como lido",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        client.invalidateQueries(getCommicsKey);
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
