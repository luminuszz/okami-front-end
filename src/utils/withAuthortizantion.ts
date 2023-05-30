import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";
import process from "process";

export function whithAuthortizantion<P extends { [key: string]: any }>(
  fun: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(ctx);

    const isValidUser =
      session && session?.user?.email === process.env.AUTH_USER_EMAIL;

    if (!isValidUser) {
      return {
        redirect: {
          permanent: true,
          destination: "/login",
        },
      };
    }

    return fun(ctx);
  };
}
