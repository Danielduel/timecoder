import { protectedProcedure, createTRPCRouter } from "../../../trpc";

export const sessionV0Router = createTRPCRouter({
  getSessionHistoryDeep: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const user = await ctx.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        sessionsV0: {
          select: {
            id: true,
            title: true,
            description: true,

            createdAt: true,
            published: true,

            children: {
              select: {
                id: true,
                name: true,
                data: true,

                createdAt: true,
                updatedAt: true,

                children: {
                  select: {
                    id: true,
                    name: true,
                    data: true,

                    createdAt: true,
                    updatedAt: true,
                  }
                }
              }
            }
          }
        }
      }
    });

    if (user) {
      return user.sessionsV0;
    }

    return null;
  }),
});
