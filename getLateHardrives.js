'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
    var returnData = [];
    let responseBody = "";
    let statusCode = 0;

    const params ={
        TableName: "Storage1"
    };


    try {
        const data = await documentClient.scan(params).promise();
        var each;
        let today = new Date();
        for (each in data.Items){
            var parts = data.Items[each].Info.Backdate.split("/");
            var current = new Date(parts[2], parts[0] - 1, parts[1]);
            var daySince = today.getTime() - current.getTime();
            daySince /= (1000 * 60 * 60 * 24);
            if (daySince >= 30){
                //responseBody += ('{Simulator: ' + data.Items[each].Simulator + ' ');
                //responseBody += ('SN: ' + data.Items[each].SN + '}');
                var buffer = {
                    Simulator: data.Items[each].Simulator,
                    SN: data.Items[each].SN
                }
                returnData.push(buffer);
            }
        }
        
        responseBody = JSON.stringify(returnData);
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

