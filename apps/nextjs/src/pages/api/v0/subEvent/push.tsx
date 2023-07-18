import { type NextApiHandler } from "next";
import { z } from "zod";

import { requireIntegrationV0 } from "@acme/api/src/utils/v0/integration";
import { prisma, type Prisma } from "@acme/db";

const newEventAndNewSubEventInput = z.object({
  session: z.object({
    id: z.string().min(1),
  }),
  event: z.object({
    name: z.string().min(1),
    data: z.object({}).passthrough(),
  }),
  subEvent: z.object({
    name: z.string().min(1),
    data: z.object({}).passthrough(),
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
    data: z.object({}).passthrough(),
  }),
});

const subEventV0Push: NextApiHandler = async (req, res) => {
  const integration = await requireIntegrationV0(req, res);
  if (!integration) return res;

  try {
    const input = await newEventAndNewSubEventInput.parseAsync(req.body);
    const newEvent = await prisma.eventV0.create({
      data: {
        name: input.event.name,
        data: input.event.data as Prisma.JsonObject,
        ownerId: integration.user.id,
        createdById: integration.id,
        parentId: input.session.id,
      },
    });
    const newSubEvent = await prisma.subEventV0.create({
      data: {
        name: input.subEvent.name,
        data: input.subEvent.data as Prisma.JsonObject,
        ownerId: integration.user.id,
        createdById: integration.id,
        parentId: newEvent.id,
      },
    });
    return res.status(200).json({
      event: {
        id: newEvent.id,
      },
      subEvent: {
        id: newSubEvent.id,
      },
    });
  } catch (e) {
    try {
      const input = await existingEventAndNewSubEventInput.parseAsync(req.body);
      const newSubEvent = await prisma.subEventV0.create({
        data: {
          name: input.subEvent.name,
          data: input.subEvent.data as Prisma.JsonObject,
          ownerId: integration.user.id,
          createdById: integration.id,
          parentId: input.event.id,
        },
      });
      return res.status(200).json({
        subEvent: {
          id: newSubEvent.id,
        },
      });
    } catch (e) {
      return res.status(400).send("Bad data");
    }
  }
};

export default subEventV0Push;
