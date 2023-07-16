import { type NextApiHandler } from "next";
import { requireIntegrationV0 } from "@acme/api/src/utils/v0/integration";
import { getNewOrContinueSessionV0 } from "@acme/api/src/utils/v0/session";

const integrationV0Me: NextApiHandler = async (req, res) => {
  const integration = await requireIntegrationV0(req, res);
  if (!integration) return res;

  const session = await getNewOrContinueSessionV0(integration);
  const { name } = integration.user;

  return res.status(200).json({
    session,
    user: {
      name,
    },
  });
};

export default integrationV0Me;
