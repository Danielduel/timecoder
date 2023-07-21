/* eslint-disable react/display-name */
import { type FC } from "react";

type DataComponent = { data: any };
const CodeBlockFallback: FC<DataComponent> = ({ data }) => {
  return (
    <pre className="max-w-min overflow-scroll break-words bg-zinc-900 p-2">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
const CodeBlockFallbackWithError =
  (args: EventToComponentMapperT): FC<DataComponent> =>
  ({ data }) => {
    return (
      <div className="ml-2 border-l-2 border-red-400 py-3 pl-2">
        <div>
          Mapping failed for
          <CodeBlockFallback data={args} />
        </div>
        <div>
          Event data
          <CodeBlockFallback data={data} />
        </div>
      </div>
    );
  };

type EventToComponentMapperT = {
  integrationVersion: "V0";
  source: "BeatSaber";
  schema: string;
  eventName: string;
  subEventName?: string;
};

export const EventToComponentMapper = (
  args: EventToComponentMapperT,
): FC<DataComponent> => {
  return CodeBlockFallbackWithError(args);
};
