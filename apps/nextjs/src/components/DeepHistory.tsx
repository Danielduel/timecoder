import { type FC } from "react";
import { type inferRouterOutputs } from "@trpc/server";

import { type AppRouter } from "@acme/api";

import { api } from "~/utils/api";
import { EventToComponentMapper } from "./EventMapper";

type DeepHistoryType = NonNullable<
  inferRouterOutputs<AppRouter>["sessionV0"]["getSessionHistoryDeep"]
>;

type SessionV0Props = {
  session: DeepHistoryType[number];
};
const SessionV0: FC<SessionV0Props> = ({ session }) => {
  return (
    <div className="my-3 w-full bg-gray-100/10 p-2">
      <h3>Session from {JSON.stringify(session.createdAt)}</h3>
      <div>
        {session.children.flatMap((event) => {
          const EventComponent = EventToComponentMapper({
            eventName: event.name,
            integrationVersion: "V0",
            schema: "",
            source: "BeatSaber",
          });

          return (
            <div className="mt-1 bg-gray-200/10 py-1">
              <h4>{event.name} event</h4>
              <EventComponent data={event.data} />
              <div className="pl-5">
                {event.children.flatMap((subEvent) => {
                  const SubEventComponent = EventToComponentMapper({
                    eventName: event.name,
                    integrationVersion: "V0",
                    schema: "",
                    source: "BeatSaber",
                    subEventName: subEvent.name,
                  });
                  return (
                    <div>
                      {subEvent.name}
                      <SubEventComponent data={subEvent.data} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DeepHistory = () => {
  const { data: userSession } = api.auth.getSession.useQuery();
  const { data: deepHistory } = api.sessionV0.getSessionHistoryDeep.useQuery(
    undefined,
    { enabled: !!userSession },
  );

  if (!deepHistory) return null;

  return deepHistory.flatMap((session) => <SessionV0 session={session} />);
};
