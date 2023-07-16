import { protectedProcedure } from "../../../trpc";
import { createTRPCRouter } from "../../../trpc";

export const integrationV0Router = createTRPCRouter({
  getIntegration: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const integration =
      await ctx.prisma.integrationV0.findFirst({
        where: {
          userId
        }
      })
      ||
      await ctx.prisma.integrationV0.create({
        data: {
          userId
        }
      });

    return integration;
  }),
});
