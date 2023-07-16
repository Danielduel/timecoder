import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";

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
        <div className="container mt-12 flex flex-row items-center justify-center gap-4 px-4 py-8">
          <div>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

function AuthShowcase() {
  const { data: session } = api.auth.getSession.useQuery();
  const { data: integration } = api.integrationV0.getIntegration.useQuery(
    undefined,
    { enabled: !!session },
  );

  const [showAuthString, setShowAuthString] = useState(false);

  return (
    <div className="flex w-full max-w-prose flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-white">
          {session && <span>Hi {session?.user?.name}</span>}
        </p>
      )}{" "}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => void signOut() : () => void signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
      {integration?.token && (
        <div className="text w-full border-l-2 py-2 pl-2 leading-8 text-white">
          <div className="text-xl">Integration</div>
          <div>Authorization string</div>
          <div>
            {showAuthString && (
              <code className="rounded bg-gray-100 p-1 text-gray-800">
                IntegrationV0 {integration.token}
              </code>
            )}
            {!showAuthString && (
              <code className="rounded bg-gray-100 p-1 text-gray-800">
                &lt;hidden secret&gt;
              </code>
            )}
          </div>
          <button
            className="mt-2 rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => setShowAuthString(!showAuthString)}
          >
            {showAuthString ? "Hide secret" : "Show secret"}
          </button>
        </div>
      )}
    </div>
  );
}
