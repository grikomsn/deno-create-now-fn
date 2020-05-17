import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "../deps.ts";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => ({
  statusCode: 200,
  headers: {
    ["content-type"]: "application/json",
  },
  body: JSON.stringify({ event, context }),
});
