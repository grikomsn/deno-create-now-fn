# deno-create-now-fn

Create lambda handlers for [Deno](https://deno.land) with [`@vercel/node`][vercel-node]-like APIs

![release](https://badgen.net/github/release/grikomsn/deno-create-now-fn)

---

- [Intro](#intro)
- [Imports](#imports)
- [Quick example](#quick-example)
- [Why](#why)
- [Live examples](#live-examples)
- [Dependencies](#dependencies)
- [License](#license)

---

## Intro

`create-now-fn` is a helper function to create lambda handlers for Deno using [`hayd/deno-lambda`][deno-lambda] with similar APIs from [`@vercel/node`][vercel-node] so you can use common props like `req.query` and `res.send`.

## Imports

- <https://denopkg.com/grikomsn/deno-create-now-fn/mod.ts>
- <https://griko.dev/deno-create-now-fn.ts>

## Quick example

With `create-now-fn`, you can now write like this:

```ts
import { createNowFn } from "https://denopkg.com/grikomsn/deno-create-now-fn/mod.ts";

export const handler = createNowFn((req, res) => {
  res.json({ hello: "world" });
});
```

...rather than this:

```ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda/mod.ts";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => ({
  statusCode: 200,
  headers: {
    ["content-type"]: "application/json",
  },
  body: JSON.stringify({ hello: "world" }),
});
```

## Why

If you're using Deno on [Vercel](https://vercel.com/home), chances are that you're using [`now-deno`][now-deno] where the builder also uses `deno-lambda`. On Node.js where it uses `@vercel/node`, you just need to `export default` a function with `req` and `res` parameters, whereas on `deno-lambda` you need to manually parse the `event.body` to get request props and determine the response status code, headers, and body.

Here's an example if you return the lambda `event` and `context` as JSON on Vercel:

```ts
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
```

```json
{
  "event": {
    "Action": "Invoke",
    "body": "{\"method\":\"GET\",\"host\":\"localhost:3000\",\"path\":\"/api/dump-event\",\"headers\":{\"host\":\"localhost:3000\",\"user-agent\":\"insomnia/7.1.1\",\"accept\":\"*/*\",\"Connection\":\"close\",\"x-forwarded-host\":\"localhost:3000\",\"x-forwarded-proto\":\"http\",\"x-forwarded-for\":\"::1\",\"x-real-ip\":\"::1\",\"x-now-trace\":\"dev1\",\"x-now-deployment-url\":\"localhost:3000\",\"x-now-id\":\"dev1::dev1::5tt0o-1589743243683-af82fe796ff5\",\"x-now-log-id\":\"af82fe796ff5\",\"x-zeit-co-forwarded-for\":\"::1\"},\"encoding\":\"base64\",\"body\":\"\"}"
  },
  "context": {
    "functionName": "zeit-fun-405e630ef6314",
    "functionVersion": "$LATEST",
    "invokedFunctionArn": "arn:aws:lambda:us-west-1:977805900156:function:nate-dump",
    "memoryLimitInMB": "3008",
    "awsRequestId": "90243dd8-b62f-41a9-9e91-9425558e75e1",
    "logGroupName": "aws/lambda/zeit-fun-405e630ef6314",
    "logStreamName": "2019/01/12/[$LATEST]192c0447b647417a8fa89e131b287806"
  }
}
```

With `create-now-fn`, you can use `req` and `res`, also `event` and `context` if needed:

```ts
import { createNowFn } from "https://denopkg.com/grikomsn/deno-create-now-fn/mod.ts";

export const handler = createNowFn((req, res, internal) => {
  res.json({ req, res, internal });
});
```

```json
{
  "req": {
    "method": "GET",
    "host": "localhost:3000",
    "path": "/api/dump-fn",
    "headers": {
      "host": "localhost:3000",
      "user-agent": "insomnia/7.1.1",
      "accept": "*/*",
      "Connection": "close",
      "x-forwarded-host": "localhost:3000",
      "x-forwarded-proto": "http",
      "x-forwarded-for": "::1",
      "x-real-ip": "::1",
      "x-now-trace": "dev1",
      "x-now-deployment-url": "localhost:3000",
      "x-now-id": "dev1::dev1::5tt0o-1589743267214-3133ad3edf21",
      "x-now-log-id": "3133ad3edf21",
      "x-zeit-co-forwarded-for": "::1"
    },
    "encoding": "base64",
    "body": "",
    "cookies": {},
    "query": {},
    "url": "http://localhost:3000/api/dump-fn"
  },
  "res": {
    "headers": {
      "content-type": "application/json"
    },
    "statusCode": 200
  },
  "internal": {
    "context": {
      ...
    },
    "event": {
      ...
    }
  }
}
```

## Live examples

- <https://deno-create-now-fn.now.sh/api/hello>
- <https://deno-create-now-fn.now.sh/api/hello/?name=bob>
- <https://deno-create-now-fn.now.sh/api/hello/bob>
- <https://deno-create-now-fn.now.sh/api/time>
- <https://deno-create-now-fn.now.sh/api/dump-event>
- <https://deno-create-now-fn.now.sh/api/dump-fn>

View the source files in the `/api` directory.

## Dependencies

- [`deno-lambda`][deno-lambda]: <https://deno.land/x/lambda@1.0.0/mod.ts>

## License

MIT License Copyright (c) 2020 [Griko Nibras](https://github.com/grikomsn)

[deno-lambda]: https://github.com/hayd/deno-lambda
[now-deno]: https://github.com/lucacasonato/now-deno
[vercel-node]: https://www.npmjs.com/package/@vercel/node
