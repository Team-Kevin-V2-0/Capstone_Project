'use strict';
const AWS = require('aws-sdk');

AWS.config.update({
		region: "us-east-2"
});

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();
	
	let responseBody = "";
	let statusCode = 0;
	let today = new Date();
	let date = (today.getMonth()+1)+'/'+(today.getDate())+'/'+(today.getFullYear());
	let d = "";
	
	const params = {
		TableName: "Storage1",
		Key: {
			Simulator: event.simulator,
			SN: event.SN
		},
		UpdateExpression: "set Info.Backdate = :day",
		ExpressionAttributeValues: {
			":day": date
		},
		ReturnValues: "UPDATED_NEW"
	};
	
	try{
		const data = await documentClient.update(params).promise();
		responseBody = JSON.stringify(data);
		statusCode = 204;
	} catch(err) {
		responseBody = `failed to update : ${err}`;
		statusCode = 403;
	}
	
	const response = {
		statusCode: statusCode,
		headers :{
			"Content-Type": "application/json"
		},
		body: responseBody
	};
	
	return response;
};