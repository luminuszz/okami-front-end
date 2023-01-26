import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const cssGradirent =
  "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)";

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
