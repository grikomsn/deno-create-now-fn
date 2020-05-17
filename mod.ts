import { APIGatewayProxyResult } from "./deps.ts";
import { HandlerFn, NowFn, NowRequest, NowResponse } from "./types.ts";
import { parseEventBody } from "./util.ts";

export * from "./types.ts";
export * from "./util.ts";

export const createNowFn = (fn: NowFn) => {
  const payload: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {},
    body: "",
  };

  const handler: HandlerFn = async (event, context) => {
    const request: NowRequest = parseEventBody(event);

    const response: NowResponse = {
      headers: payload.headers!,
      statusCode: payload.statusCode,

      json: (body, ...jsonArgs) => {
        payload.headers!["content-type"] = "application/json";
        payload.body = JSON.stringify(body, ...jsonArgs);
        return response;
      },

      send: (body) => {
        payload.body = body;
        return response;
      },

      status: (statusCode) => {
        payload.statusCode = statusCode;
        return response;
      },

      writeHead: (statusCode, headers) => {
        payload.statusCode = statusCode;
        payload.headers = { ...payload.headers, ...headers };
        return response;
      },
    };

    await fn(request, response, { context, event });

    return payload;
  };

  return handler;
};
