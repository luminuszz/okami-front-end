import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getCommics } from "@/services/api/queries/useGetCommics";
import { getCommicById } from "@/services/api/queries/useGetCommicById";
import { Commic } from "@/domain/entities/commic";

type Props = {
  commic: Commic;
};

const Commic: NextPage<Props> = ({ commic }) => {
  return (
    <div>
      <code>{JSON.stringify(commic)}</code>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const commics = await getCommics();

  const paths = commics.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ commic: Commic }> = async ({
  params,
}) => {
  const id = params?.id as string;

  const data = await getCommicById({ id });

  console.log({ data });

  return {
    props: {
      commic: data,
    },
    revalidate: 60 * 60,
  };
};

export default Commic;
