'use strict';
const AWS = require('aws-sdk');


exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    //const {employeeID, name, email, password, role} = JSON.parse(event.body);

    /*var input = {
    "Simulator": event.Simulator,
    "name": event.name,
    "month": event.month,
    "year": event.year,
    "credit": event.credit,
    "debit": event.debit
    };*/

    const params ={
        //Item: input,
        //TableName: "Storage1"
        TableName: "Storage1",
        Item: {
            Simulator: event.Simulator,
            SN: event.SN,
            Info: {
                Computer: event.computer,
                Cycle: event.cycle,
                Date: event.date,
                Size: event.size,
                Type: event.type
            }
        }
    };


    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = `Unable to add HardDrive: ${err}`;
        statusCode = 401;
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
