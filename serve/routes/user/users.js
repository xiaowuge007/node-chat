var express = require('express');
var router = express.Router();
var sql = require('./sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var content = {
    field: `*`,
    word: ''
  }
  sql.getUser(content,function (data) {
    if(data){
      res.send({code: 1,data:data})
    }else{
      res.send({code: 0,data:[],msg: '查询失败'})
    }
  })
});

//添加用户
router.post('/register', function(req, res, next) {
  var user = req.body || {};
  if(user.account && user.password){
    user.uid = getUid() + user.account + getUid();
    sql.addUser(user,function (data) {
      if(data){
        res.send({code: 1,data:{uid:user.uid},msg: '注册成功'})
      }else{
        res.send({code: 0,data:[],msg: '注册失败，该账号已注册'})
      }
    })
  }else{
    res.send({code: 0,data:[],msg: '账号和密码不能为空'})
  }

});
//添加用户
router.post('/login', function(req, res, next) {
  var user = req.body || {};
  if(user.account && user.password){
    var statement = {
      field: `uid account`,
      word: `WHERE account=${user.account}`
    }
    sql.getUser(user,function (data) {
      if(data){
        if(data.password === user.password){
          res.send({code: 1,data:{uid:user.uid},msg: '登录成功'})
        }else{
          res.send({code: 0,data:[],msg: '密码不正确'})
        }
      }else{
        res.send({code: 0,data:[],msg: '该账号不存在'})
      }
    })
  }else{
    res.send({code: 0,data:[],msg: '账号和密码不能为空'})
  }

});

var arr = getFromUnicode();
function getUid(){
  var str = '';
  for(let i =0;i<5;i++){
    str += arr[Math.random()*arr.length]
  }
  return arr;
}
function getFromUnicode(){
  var arr = [];
  for(let i =0;i<= 9;i++){
    arr.push(i)
  }
  for(let i =97;i<122;i++){
    arr.push(String.fromCharCode(i))
  }
  for(let i =65;i<90;i++){
    arr.push(String.fromCharCode(i))
  }
  return arr;
}
module.exports = router;




