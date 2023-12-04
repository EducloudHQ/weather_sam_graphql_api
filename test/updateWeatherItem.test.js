import { test, expect } from "vitest";
const AWS = require("aws-sdk");
import { unmarshall } from "@aws-sdk/util-dynamodb";
const fs = require("fs");
const client = new AWS.AppSync({ region: "us-east-2" });
const runtime = { name: "APPSYNC_JS", runtimeVersion: "1.0.0" };

test("validate inputs/outs of update weather item function", async () => {
  const code = fs.readFileSync("./functions/updateWeatherItem.js", "utf8");
  const context = fs.readFileSync("./test/context.json", "utf8");
  const contextJSON = JSON.parse(context);

  const response = await client
    .evaluateCode({ code, context, runtime, function: "request" })
    .promise();
  console.log("reponse is ", response);

  const result = JSON.parse(response.evaluationResult);
  console.log("result is ", result);
  const expressionValues = unmarshall(result.update.expressionValues);
  console.log("expressionValues is ", expressionValues[":expValue_1"]);
  expect(result.key.id).toBeDefined();

  expect(result.operation).toEqual("UpdateItem");
  expect(expressionValues[":expValue_1"]).toEqual(
    contextJSON.arguments.weather
  );
  expect(expressionValues[":expValue_2"]).toEqual(contextJSON.arguments.town);
  expect(expressionValues[":expValue_3"]).toBeDefined();
  expect(result.key.id.S).toEqual(contextJSON.arguments.id);
});
