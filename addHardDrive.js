'use strict';
 const AWS = require('aws-sdk');


exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    let datas ="";

    
    const params ={
        TableName: "Storage1",
        Item: {
            "Simulator": event.Simulator, 
            "SN": event.SN,
            "Info": event.Info
        }
    };


    try {
        const data = await documentClient.put(params).promise();
        datas = data
        responseBody = JSON.stringify(data);
        console.log(responseBody);
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

    return (params.Item.SN);

}; 
