import { APIGatewayProxyEvent } from "./deps.ts";
import { NowRequest, NowRequestCookies, NowRequestQuery } from "./types.ts";

// https://github.com/denoland/deno/blob/c474d383543708fc636c06dd2e4a9100495f45c5/std/http/cookie.ts#L91-L101
export const parseCookiesHeader = (cookieHeader: string) => {
  if (cookieHeader != null) {
    const out: NowRequestCookies = {};
    const c = cookieHeader.split(";");
    for (const kv of c) {
      const [cookieKey, ...cookieVal] = kv.split("=");
      const key = cookieKey.trim();
      out[key] = cookieVal.join("=");
    }
    return out;
  }
  return {};
};

export const parseQuery = (url: string | URL) => {
  const _url = new URL(url);

  let query: NowRequestQuery = {};
  for (const key of _url.searchParams.keys()) {
    const value = _url.searchParams.getAll(key);
    query[key] = value.length > 1 ? value : value[0];
  }

  return query;
};

export const parseEventBody = (event: APIGatewayProxyEvent): NowRequest => {
  let request: NowRequest = JSON.parse(event.body!);

  const host = request.headers["x-forwarded-host"];
  const proto = request.headers["x-forwarded-proto"];

  const url = new URL(request.path, `${proto}://${host}`);
  const query = parseQuery(url);
  const cookies = parseCookiesHeader(request.headers["cookie"]);

  return { ...request, cookies, query, url };
};
