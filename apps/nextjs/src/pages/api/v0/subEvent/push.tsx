import { randomUUID } from "crypto";
import { type NextApiHandler } from "next";
import { z } from "zod";

import { requireIntegrationV0 } from "@acme/api/src/utils/v0/integration";
import { getNewOrContinueSessionV0 } from "@acme/api/src/utils/v0/session";

const newEventAndNewSubEventInput = z.object({
  session: z.object({
    id: z.string().min(1),
  }),
  event: z.object({
    name: z.string().min(1),
    data: z.any(),
  }),
  subEvent: z.object({
    name: z.string().min(1),
    data: z.object({}),
  }),
});

const existingEventAndNewSubEventInput = z.object({
  session: z.object({
    id: z.string().min(1),
  }),
  event: z.object({
    id: z.string().min(1),
  }),
  subEvent: z.object({
    name: z.string().min(1),
    data: z.object({}),
  }),
});

const subEventV0Push: NextApiHandler = async (req, res) => {
  const integration = await requireIntegrationV0(req, res);
  if (!integration) return res;

  const session = await getNewOrContinueSessionV0(integration);
  const { name } = integration.user;

  const placeholder = {
    event: {
      uuid: randomUUID(),
    },
    subEvent: {
      uuid: randomUUID(),
    },
  };
  return res.status(200).send(placeholder);
};

export default subEventV0Push;
