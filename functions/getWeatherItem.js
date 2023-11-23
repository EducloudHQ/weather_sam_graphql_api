import { get } from "@aws-appsync/utils/dynamodb";
export function request(ctx) {
  const key = { id: ctx.args.id };

  return get({ key: key });
}

export function response(ctx) {
  return ctx.result;
}
