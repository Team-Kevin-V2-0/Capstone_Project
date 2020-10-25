'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const {employeeID, name, email, password, role} = JSON.parse(event.body);
    
    const params ={
        TableName: "EmployeeDB",
        Key: {
            employeeID: employeeID
        },
        //UpdateExpression: "set employeename = :n",
        UpdateExpression: "set employeename = :n, employeeemail = :e, employeepasswd = :p, employeerole =:r",
        ExpressionAttributeValues:{
            ":n" : name,
            ":e" : email,
            ":p" : password,
            ":r" : role
        },
        ReturnValues: "UPDATED_NEW"
    };


    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 203;    
    } catch (err) {
        responseBody = `Unable to Update employee: ${err}`;
        statusCode = 403;
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