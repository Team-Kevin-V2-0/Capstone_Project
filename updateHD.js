'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const {Simulator, SN, Computer, Cyc, Size, Typ} = JSON.parse(event.body);

    const params = {
        TableName: "Storage1",
        Key: {
            Simulator: Simulator,
            SN: SN
        },
        
        UpdateExpression: "set Info.Computer = :y, Info.Cyc = :e, Info.Size = :p, Info.Typ = :r",
        ExpressionAttributeValues:{
            ":y" : Computer,
            ":e" : Cyc,
            ":p" : Size,
            ":r" : Typ
        },
        ReturnValues: "UPDATED_NEW"
    };


    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 203;
    } catch (err) {
        responseBody = `Unable to Update storage: ${err}`;
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
