const connection = require('../mysql');

function getUser(sql,callback) {
    connection.query(`SELECT ${sql.field} FROM USER_INFO ${sql.word}`, function (error, results, fields) {
        if (error){
            callback.call(null,false)
            // throw error;
        } else{
            callback.call(null,results)
        }
    });
}
function addUser(user,callback){
    var addSql = 'INSERT INTO USER_INFO (uid,account,password,createTime) VALUES(?,?,?,?)';
    var addParams = [user.uid,user.account,user.password,user.createTime];
    connection.query(addSql,addParams, function (error, results, fields) {
        if (error){
            callback.call(null,false)
            //throw error;
        } else{
            callback.call(null,results)
        }
    });
}
module.exports = {
    getUser,addUser
}
