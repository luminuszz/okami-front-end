import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";

type Props = {
  quantity?: number;
};

const Skeleton = ({ quantity = 1 }: Props) => {
  return (
    <>
      {Array.from({ length: quantity }, (_, index) => (
        <ChakraSkeleton
          borderRadius="10px"
          key={index}
          width="200px"
          height="200px"
        ></ChakraSkeleton>
      ))}
    </>
  );
};

export default Skeleton;
