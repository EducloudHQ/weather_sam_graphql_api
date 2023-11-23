import { remove } from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { id } = ctx.args;

  return remove({ key: { id } });
}

export function response(ctx) {
  return true;
}
