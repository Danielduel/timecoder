import { integrationV0Router } from "./router/api/v0/integration";
import { sessionV0Router } from "./router/api/v0/session";
import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  integrationV0: integrationV0Router,
  sessionV0: sessionV0Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
