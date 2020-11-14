'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2"
  });

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
   let responseBody = "";
    let statusCode = 0;
    let sd = 0;
    let id = "";
    let passwd = "";
    //let parsed =""
    let inID = event.employeeID;
    let inpas = event.employeepasswd;
   
    //const employeeID = event.pathParameters;

    const params ={
        TableName: "EmployeeDB",
        Key: {
            employeeID: event.employeeID
        }
    };


    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        id = JSON.stringify(data.Item.employeeID);
        id = JSON.parse(id);
        passwd = JSON.stringify(data.Item.employeepasswd);
        passwd = JSON.parse(passwd);
        
        if(inID == id && inpas == passwd){
           statusCode = 204; 
        }
        //parsed = JSON.parse(responseBody);
    } catch (err) {
        responseBody = `Unable to get employee: ${err}`;
        statusCode = 404;
    }
    

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*"
        },
        body: {
            responseBody
        }
    };
    
   return response;

};
