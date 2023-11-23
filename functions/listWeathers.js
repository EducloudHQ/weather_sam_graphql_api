import { scan } from "@aws-appsync/utils/dynamodb";
export function request(ctx) {
  const { limit = 10, nextToken } = ctx.args;

  return scan({ limit, nextToken });
}

export function response(ctx) {
  return ctx.result.items;
}
