var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a123456',
    database : 'chat'
});

module.exports = connection;
