import { test, expect, describe } from "vitest";
const AWS = require("aws-sdk");

const fs = require("fs");
const client = new AWS.AppSync({ region: "us-east-2" });
const runtime = { name: "APPSYNC_JS", runtimeVersion: "1.0.0" };

describe("valid input checks", () => {
  test("request correctly formatted inputs", async () => {
    const code = fs.readFileSync(
      "./functions/preprocessWeatherItem.js",
      "utf8"
    );
    const context = fs.readFileSync("./test/context.json", "utf8");
    const contextJSON = JSON.parse(context);

    const response = await client
      .evaluateCode({ code, context, runtime, function: "request" })
      .promise();

    const result = JSON.parse(response.evaluationResult);

    expect(result.payload.key.id).toBeDefined();

    expect(result.payload.values.weather).toBeDefined();
    expect(result.payload.values.town).toBeDefined();
  });
});
