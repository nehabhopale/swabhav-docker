var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
    var connectionOptions = {
        host: "mysql",
        port: 3306,
        user: "moeuser",
        password: "moepass",
        database: "moe_db"
    };

    console.log('MySQL Connection config:');
    console.log(connectionOptions);

    var connection = mysql.createConnection(connectionOptions);
    var queryStr = "SELECT * FROM MOE_ITEM_T";
    
    connection.connect(function(err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log("Connected!");
    });
    connection.query(queryStr, function (error, results, fields) {
        if (error) {
            return console.error('error: ' + error.message);
        }
        responseStr = '';

        results.forEach(function(data){
            responseStr += data.ITEM_NAME + ' : ';
            responseStr += data.ITEM_DESC + ' : ';
            responseStr += data.ITEM_ONHAND;

            console.log(data);
        });

        if(responseStr.length == 0)
            responseStr = 'No records found';

        console.log(responseStr);

        res.status(200).send(responseStr);
});
        
connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});