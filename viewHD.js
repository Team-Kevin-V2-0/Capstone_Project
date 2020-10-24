const AWS = require('aws-sdk');

exports.handler = function (event, context, callback)
{
        //Get an object for connecting to DDB
        const ddb = new AWS.DynamoDB.DocumentClient();
        
        ddb.scan({
            TableName : "Storage1"
        }, function(err, data) {
            if (err) {
                console.error("Unable to Query: ", JSON.stringify(err, null, 2));
            } else {
                console.log("Success");
                data.Items.forEach(function(item){
                    console.log(" -", item.Simulator + ": " + item.SN + " " + item.Info.Computer);
                });
            }
        }); 
};
