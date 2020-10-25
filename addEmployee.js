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
        TableName: "EmployeeDB",
        Item: {
            employeeID: event.employeeID,
            employeename: event.name,
            employeeemail: event.email,
            employeepasswd: event.password,
            employeerole: event.role
        }
    };


    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = `Unable to add employee: ${err}`;
        statusCode = 401;
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
