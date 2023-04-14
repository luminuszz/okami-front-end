import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      width="full"
      height="full"
      bgColor="blue.900"
      backgroundSize="cover"
      backgroundRepeat="repeat"
    >
      {children}
    </Box>
  );
};

export default Layout;
