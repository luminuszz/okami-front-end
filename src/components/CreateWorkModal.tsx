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
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkModal: FC<Props> = ({ isOpen, onClose }) => {
  const handleSubmit = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adcionar obra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input type="email" />
            <FormHelperText>Marcar como lido</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Capitulo</FormLabel>
            <NumberInput min={0} value={1} onChange={(e) => {}}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit} variant="solid">
            Adcionar Obra
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
