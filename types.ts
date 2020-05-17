import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "./deps.ts";

export interface HttpHeaders {
  [header: string]: boolean | number | string;
}

export interface IncomingHttpHeaders extends HttpHeaders {
  host: string;
  "user-agent": string;
  accept: string;
  Connection: string;
  "x-forwarded-host": string;
  "x-forwarded-proto": string;
  "x-forwarded-for": string;
  "x-real-ip": string;
  "x-now-trace": string;
  "x-now-deployment-url": string;
  "x-now-id": string;
  "x-now-log-id": string;
  "x-zeit-co-forwarded-for": string;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/735e871ce1eb9dfa5351ca2d1bb870b2e0e0a44f/types/node/http.d.ts#L8-L63
  "accept-language": string;
  "accept-patch": string;
  "accept-ranges": string;
  "access-control-allow-credentials": string;
  "access-control-allow-headers": string;
  "access-control-allow-methods": string;
  "access-control-allow-origin": string;
  "access-control-expose-headers": string;
  "access-control-max-age": string;
  age: string;
  allow: string;
  "alt-svc": string;
  authorization: string;
  "cache-control": string;
  connection: string;
  "content-disposition": string;
  "content-encoding": string;
  "content-language": string;
  "content-length": string;
  "content-location": string;
  "content-range": string;
  "content-type": string;
  cookie: string;
  date: string;
  expect: string;
  expires: string;
  forwarded: string;
  from: string;
  "if-match": string;
  "if-modified-since": string;
  "if-none-match": string;
  "if-unmodified-since": string;
  "last-modified": string;
  location: string;
  pragma: string;
  "proxy-authenticate": string;
  "proxy-authorization": string;
  "public-key-pins": string;
  range: string;
  referer: string;
  "retry-after": string;
  "set-cookie": string;
  "strict-transport-security": string;
  tk: string;
  trailer: string;
  "transfer-encoding": string;
  upgrade: string;
  vary: string;
  via: string;
  warning: string;
  "www-authenticate": string;
}

export interface OutgoingHttpHeaders extends HttpHeaders {}

export interface NowRequestCookies {
  [key: string]: string;
}

export interface NowRequestQuery {
  [key: string]: string | string[];
}

// https://github.com/zeit/now/blob/d6b2fb1f31a4b0abf15c950cfac231f3ffac14dd/packages/now-node/src/types.ts#L7-L11
export interface NowRequest {
  body: string;
  encoding: string;
  headers: IncomingHttpHeaders;
  host: string;
  method: string;
  path: string;

  cookies: NowRequestCookies;
  query: NowRequestQuery;
  url: URL;
}

// https://github.com/zeit/now/blob/d6b2fb1f31a4b0abf15c950cfac231f3ffac14dd/packages/now-node/src/types.ts#L13-L17
export interface NowResponse {
  headers: OutgoingHttpHeaders;
  statusCode: number;

  json: (jsonBody: any) => NowResponse;
  send: (body: any) => NowResponse;
  status: (statusCode: number) => NowResponse;
  writeHead: (statusCode: number, headers: OutgoingHttpHeaders) => NowResponse;
}

export type HandlerFn = (
  event: APIGatewayProxyEvent,
  context: Context
) => APIGatewayProxyResult;

export type NowFn = (
  request: NowRequest,
  response: NowResponse,
  internal: {
    event: APIGatewayProxyEvent;
    context: Context;
  }
) => void;
