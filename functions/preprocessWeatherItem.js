import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const id = util.autoId();

  const { ...values } = ctx.args;
  values.createdOn = util.time.nowEpochMilliSeconds();

  return { payload: { key: { id }, values: values } };
}

export function response(ctx) {
  return ctx.result;
}
