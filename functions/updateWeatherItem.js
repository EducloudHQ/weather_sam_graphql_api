import { update, operations } from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { id, weather, town } = ctx.args;

  return update({
    key: { id },
    update: {
      weather: operations.replace(weather),
      town: operations.replace(town),
      updatedOn: operations.add(util.time.nowEpochMilliSeconds()),
    },
  });
}
export function response(ctx) {
  return ctx.result;
}
