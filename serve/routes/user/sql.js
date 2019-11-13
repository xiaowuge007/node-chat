const connection = require('../mysql');
const { Err } = require('../common')
function getUser(sql) {
    return new Promise((resolve, reject) => {
        var a= `SELECT ${sql.field} FROM USER_INFO ${sql.word}`;
        connection.query(a, function (error, results, fields) {
            if (error){
                reject(Err('查询失败'))
            } else{
                if(isVal(results)){
                    resolve(results)
                }else{
                    reject(Err('查询结果为空'))
                }
            }
        });
    })
}
function addUser(user){
    return new Promise((resolve, reject) => {
        var addSql = 'INSERT INTO USER_INFO (uid,account,password,createTime) VALUES(?,?,?,?)';
        var addParams = [user.uid,user.account,user.password,user.createTime];
        connection.query(addSql,addParams, function (error, results, fields) {
            if (error){
                reject(Err('新增失败'))
                //throw error;
            } else{
                resolve(results)
            }
        });
    })
}
function isVal(data){
    var flag = true;
    if(!data){
        flag = false;
    }
    if(Array.isArray(data) && data.length === 0){
        flag = false;
    }
    return flag;
}
module.exports = {
    getUser,addUser
}
