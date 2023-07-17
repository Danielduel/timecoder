import type { NextPage } from "next";
import Head from "next/head";

import { Heading } from "~/components/Heading";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timecoder</title>
        <meta
          name="description"
          content="Keep your stream's key moments in one place"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-gray-500 to-gray-900 text-white">
        <div className="container mt-2 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <Heading />
        </div>
      </main>
    </>
  );
};

export default Home;
