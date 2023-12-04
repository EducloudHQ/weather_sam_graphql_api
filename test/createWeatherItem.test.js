import { test, expect } from "vitest";
const AWS = require("aws-sdk");

const fs = require("fs");
const client = new AWS.AppSync({ region: "us-east-2" });
const runtime = { name: "APPSYNC_JS", runtimeVersion: "1.0.0" };

test("ensure valid inputs are being received from preprocessWeather function", async () => {
  const code = fs.readFileSync("./functions/createWeatherItem.js", "utf8");
  const context = fs.readFileSync("./test/context.json", "utf8");
  const contextJSON = JSON.parse(context);

  const response = await client
    .evaluateCode({ code, context, runtime, function: "request" })
    .promise();
  console.log("reponse is ", response);

  const result = JSON.parse(response.evaluationResult);
  console.log("result is ", result);

  expect(result.key.id).toBeDefined();
  expect(result.operation).toEqual("PutItem");
  expect(result.key.id.S).toEqual(contextJSON.prev.result.key.id);
});
