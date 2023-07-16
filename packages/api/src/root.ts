import { integrationV0Router } from "./router/api/v0/integration";
import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  integrationV0: integrationV0Router
});

// export type definition of API
export type AppRouter = typeof appRouter;
