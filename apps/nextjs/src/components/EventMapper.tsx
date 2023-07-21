import { type FC } from "react";

type DataComponent = { data: any };
const CodeBlockFallback: FC<DataComponent> = ({ data }) => {
  return (
    <code className="block max-w-lg break-words bg-black">
      {JSON.stringify(data)}
    </code>
  );
};

type EventToComponentMapperT = {
  integrationVersion: "V0";
  source: "BeatSaber";
  schema: string;
  eventName: string;
  subEventName?: string;
};

export const EventToComponentMapper = ({
  integrationVersion,
  eventName,
  subEventName,
  schema,
  source,
}: EventToComponentMapperT): FC<DataComponent> => {
  return CodeBlockFallback;
};
