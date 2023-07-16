import { prisma } from "@acme/db";
import { type RequiredIntegration } from "./integration";

export const checkSessionV0 = async (sessionId: string) => {

}

export const getNewOrContinueSessionV0 = async (integration: RequiredIntegration) => {
  const session = await prisma.sessionV0.create({
    data: {
      createdById: integration.id,
      ownerId: integration.user.id,
    }
  });

  return session;
}
