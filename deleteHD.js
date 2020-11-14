'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });


exports.handler = async (event, context) => {

    var documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const {Simulator, SN} = JSON.parse(event.body);

    var params ={
        TableName: "Storage1",
        Key: {
            Simulator: Simulator,
            SN: SN
        }
    };


    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to delete hard drive: ${err}`;
        statusCode = 403;
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
