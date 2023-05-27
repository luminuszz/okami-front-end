import Layout from "@/components/layout";
import { GetServerSideProps, NextPage } from "next";
import { Button, Container, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { signIn, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const LoginButton: FC = () => {
  const handleLogin = async () => signIn();

  return (
    <Button
      display="flex"
      size="lg"
      variant="solid"
      colorScheme="green"
      onClick={handleLogin}
    >
      Make your login
    </Button>
  );
};

const LoginPage: NextPage = () => {
  const { status } = useSession();

  return (
    <Layout>
      <Container height="full" maxW="container.xl" py="10">
        <Flex flex="1" justifyContent="center" alignItems="center">
          <LoginButton />
        </Flex>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
