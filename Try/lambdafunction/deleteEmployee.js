'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const {employeeID} = event.pathParameters;

    const params ={
        TableName: "EmployeeDB",
        Key: {
            employeeID: employeeID
        }
    };


    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;    
    } catch (err) {
        responseBody = `Unable to delete employee: ${err}`;
        statusCode = 404;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*"
        },
        body: responseBody
    };

    return response;

};