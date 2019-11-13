const express = require('express');
const router = express.Router();
const sql = require('./sql')
const fs = require('fs')
const path = require('path')
const { Data }  = require('../common')

function resolveDir(dir){
  return path.join(__filename,'../../../','public/json/',dir)
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  let content = {
    field: `*`,
    word: ''
  }
  sql.getUser(content).then(data=>{
    res.send(Data(1,data))
  }).catch((err) => {
    res.send(Data(0,[],err.message))
  })
});
//查询用户
router.get('/friend', function(req, res, next) {
  let user = req.query;
  let content = {
    field: `uid,account`,
    word: `WHERE account="${user.keyword}"`
  }
  if(user.keyword === user.account){
    res.send(Data(0,[],'该用户不存在'))
    return;
  }
  sql.getUser(content).then(data=>{
    res.send(Data(1,data))
  }).catch(()=>{
    res.send(Data(0,[],'没有该用户'))
  })
});
//添加好友
router.post('/addFriend', function(req, res, next) {
  let user = req.body;
  let content = {
    field: `uid,account`,
    word: `WHERE uid="${user.friend.uid}"`
  }
  sql.getUser(content).then(()=>{
    async function go(){
      try {
        let r1 = await readJson(user.uid);
        // user.friend.firstNo = Mtils.utils.makePy('sss')
        insertJson(r1,user.friend,'uid');
        let r2 = await writeJson(user.uid,r1)
        res.send(Data(1,[],'添加好友成功'))
      }catch (e) {
        throw e;
      }
    }
    go();
  }).catch(()=>{
    res.send(Data(0,[],'该用户不存在'))
  })
});
//添加用户
router.post('/register',function(req, res, next) {
  let user = req.body || {};
  if(user.account && user.password){
    var content = {
      field: `uid,account`,
      word: `WHERE account="${user.account}"`
    }
    sql.getUser(content).then(() =>{
      //查询到有该用户
      res.send(Data(0,[],'注册失败，该账号已注册'))
    }).catch(()=>{
      user.uid = getUid() + user.account + getUid();
      user.createTime = new Date();
      sql.addUser(user).then(()=>{
        res.send(Data(1,{uid:user.uid,account: user.account},'注册成功'))
      }).catch(()=>{
        res.send(Data(0,[],'未知错误'))
      })
    })
  }else{
    res.send({code: 0,data:[],msg: '账号和密码不能为空'})
  }

});
//用户登录
router.post('/login', function(req, res, next) {
  var user = req.body || {};
  if(user.account && user.password){
    var statement = {
      field: `uid,account,password`,
      word: `WHERE account="${user.account}"`
    }
    sql.getUser(statement).then((data)=>{
      var _user = data[0];
      if(_user.password === user.password){
        res.send(Data(1,{uid:_user.uid,account:_user.account},'登陆成功'))
      }else{
        res.send(Data(0,[],'密码不正确'))
      }
    }).catch((err)=>{
      res.send(Data(0,[],'该账号不存在'))
    })
  }else{
    res.send({code: 0,data:[],msg: '账号和密码不能为空'})
  }

});

var arr = getFromUnicode();
function getUid(){
  var str = '';
  for(let i =0;i<5;i++){
    str += arr[Math.round(Math.random()*(arr.length -1))]
  }
  return str;
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

function readJson(id){
  return new Promise((resolve, reject) => {
    var file = resolveDir(id + '_fri.json')
    fs.exists(file, function(exists) {
      if(exists){
        //读取文件
        fs.readFile(file,function (err,data) {
          if(err){
            //throw err;
            reject({err:'读取文件错误'})
          }else{
            if(data){
              data = JSON.parse(data)
              resolve(data)
            }
          }
        })
      }else{
        var data = {
          friends: [],
          groups: []
        }
        resolve(data)
      }
    });
  })
}
function writeJson(id,data){
  return new Promise((resolve,reject) => {
    var file = resolveDir(id + '_fri.json')
    data = JSON.stringify(data)
    fs.writeFile(file,data,'utf-8',function (err) {
      if(err){
        // throw  err;
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}
function insertJson(data,obj,key){
  var flag = true;
  var friends = data.friends;
  for(var i = 0;i<friends.length;i++){
    if(friends[i][key] === obj[key]){
      break;
    }
  }
  if(flag){
    friends.push(obj)
  }
}

module.exports = router;




