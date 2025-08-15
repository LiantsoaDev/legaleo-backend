import { Favoris } from "@/components/Pages/Dashboard/Models";
import Head from "next/head";
const page = () => {
  return (
    <>
      <Head>
        <title>Favoris</title>
        <meta name="favoris" content="Mes contrats favoris" />
      </Head>
      <Favoris />
    </>
  );
};

export default page;
