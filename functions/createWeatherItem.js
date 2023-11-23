import { put } from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { key, values } = ctx.prev.result;
  return put({
    key: key,
    item: values,
  });
}

export function response(ctx) {
  return ctx.result;
}
