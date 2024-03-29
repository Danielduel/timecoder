import { useState, type FC } from "react";
import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";

export const Heading: FC = () => {
  const { data: session } = api.auth.getSession.useQuery();
  const { data: integration } = api.integrationV0.getIntegration.useQuery(
    undefined,
    { enabled: !!session },
  );

  const [showSettings, setShowSettings] = useState(false);
  const [showAuthString, setShowAuthString] = useState(false);

  return (
    <>
      <div className="flex w-full max-w-3xl flex-row place-items-start items-center gap-4">
        {session?.user && (
          <div className="w-full overflow-hidden text-2xl text-white">
            {session && (
              <span className="block overflow-hidden text-ellipsis">
                Hi&nbsp;{session?.user?.name}
              </span>
            )}
          </div>
        )}
        <button
          className="whitespace-nowrap rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? "Hide settings" : "Show settings"}
        </button>
        <button
          className="whitespace-nowrap rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
      {showSettings && (
        <div className="flex w-full max-w-3xl flex-col place-items-start items-center gap-4">
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
      )}
    </>
  );
};
