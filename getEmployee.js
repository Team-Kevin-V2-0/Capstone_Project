'use strict';
const AWS = require('aws-sdk');


exports.handler = async (event, context) => {

    var documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    //const {employeeID} = event.pathParameters;

    var params ={
        TableName: "EmployeeDB",
        Key: {
            "employeeID": event.employeeID
        }
    };


    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to delete employee: ${err}`;
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
