"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  console.log("event", event);
  console.log("event", context);
  // Return immediately if being called by warmer
  if (event.source === "warmer") {
    return callback(null, "Lambda is warm");
  }

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: "Allow",
        Resource: event.methodArn,
      },
    ],
  };

  return {
    principalId: "anonymous",
    policyDocument,
  };
};
