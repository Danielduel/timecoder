import { randomUUID } from "crypto";
import { type NextApiHandler } from "next";

const integrationV0Me: NextApiHandler = (req, res) => {
  if (!req.headers.authorization)
    return res.status(401).send("Please authorize this request (no authorization header)");

  const [authVersion = "", authToken = ""] = (
    req.headers.authorization ?? ""
  ).split(" ");

  const hasAuth = authVersion === "IntegrationV0";
  if (!hasAuth)
    return res
      .status(401)
      .send("Invalid authorization protocol (expected `IntegrationV0`)");

  const hasValidAuth = authToken === "mocktoken";
  if (!hasValidAuth) return res.status(401).send("Invalid authorization token");

  const placeholder = {
    session: {
      uuid: randomUUID(),
      timeStart: Date.now(),
    },
    user: {
      name: "Test",
    },
  };
  return res.status(200).json(placeholder);
};

export default integrationV0Me;
