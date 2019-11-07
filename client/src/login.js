import router from './router/index'
import Store from './store/index'
import Bus from './util/bus'
import io from 'socket.io-client'
router.beforeEach((to, from, next) => {
   let user = sessionStorage.getItem('USER');
   if(!user){
     if(to.name === 'login'){
       next()
     }else{
       next({path:'/login'})
     }
   }else{
     //建立连接
     connectWebsocket()
     if(to.name === 'login'){
       next({path:'/'})
     }else{
       next()
     }
   }
})

function connectWebsocket() {
  var socket = io('http://localhost:3000');
  socket.on('connection',function() {
    //链接上了
    Store.commit('SET_SOCKET',socket)
    var uid = sessionStorage.getItem('UUID');
    //监听服务端推送
    onMessage(socket,uid)
  })
  socket.on('news',function(data) {
    console.log(data)
  })
}

function onMessage(socket,uid){
  //向服务端发送uid
  socket.$emit('user_login',{uid:uid})
  socket.on(uid,function(data) {
    //vue进行广播
    Bus.emit('takeMessage',data)
  })
}
