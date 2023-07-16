import type { NextApiRequest, NextApiResponse } from "next";
import { type IntegrationV0, type User, prisma } from "@acme/db";

const integrationProtocol = "IntegrationV0";

export type RequiredIntegration = IntegrationV0 & { user: User };

export const requireIntegrationV0 = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .send("Please authorize this request (no authorization header)");

  const [authVersion = "", authToken = ""] = (
    req.headers.authorization ?? ""
  ).split(" ");

  const hasAuth = authVersion === integrationProtocol;
  if (!hasAuth)
    return res
      .status(401)
      .send(`Invalid authorization protocol (expected "${integrationProtocol}")`);

  const integration = await prisma.integrationV0.findFirst({
    where: {
      token: authToken
    },
    include: {
      user: true
    }
  })
  if (!integration) return res.status(401).send("Invalid authorization token");

  return integration;
}
