'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params ={
        TableName: "Storage1"
    };


    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        responseBody = JSON.parse(responseBody);
        statusCode = 200;
    } catch (err) {
        responseBody = `Unable to get Hard Drives: ${err}`;
        statusCode = 400
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;

};
