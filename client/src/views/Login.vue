<template>
    <div class="login-box">
        <div class="glass">
            <div v-if="flag">
                <h4>XX聊天</h4>
                <div class="form-item">
                    <label>账号</label>
                    <input type="text"  autocomplete="off" placeholder="请输入账号" class="form-input" v-model="account">
                </div>
                <div class="form-item">
                    <label>密码</label>
                    <input type="password" autocomplete="new-password" placeholder="请输入密码" class="form-input" v-model="password">
                </div>
                <div class="login-sumbit">
                    <div class="login-btn" @click="go">登录</div>
                </div>
                <div class="register-box">
                    没有账号？<a @click="register">去注册</a>
                </div>
            </div>
            <div v-if="!flag">
                <h4>XX聊天</h4>
                <div class="form-item">
                    <label>账号</label>
                    <input type="text"  autocomplete="off" placeholder="请输入账号" class="form-input" v-model="account">
                </div>
                <div class="form-item">
                    <label>密码</label>
                    <input type="password" autocomplete="new-password" placeholder="请输入密码" class="form-input" v-model="password">
                </div>
                <div class="login-sumbit">
                    <div class="login-btn" @click="go">注册</div>
                </div>
            </div>
        </div>

       <!-- <span>GLASS</span>-->
    </div>
</template>

<script>
  import { register, login } from '../api/user'
  import { mapMutations  } from 'vuex'
  import io from 'socket.io-client'
  import Bus from '../util/bus'
  export default {
    name: "Login",
    data(){
      return {
        account: '',
        password: '',
        flag: true
      }
    },
    mounted(){
      setTimeout(() => {
        this.account = ''
      },100)
    },
    computed:{

    },
    methods:{
      ...mapMutations([
        'SET_SOCKET',
        'SET_UID'
      ]),
      go(){
        if(this.account && this.password){
          let params = {
            account: this.account,
            password: this.password
          }
          let rule = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
          if(rule.test(this.account)){
            Toast('账号必须由字母和数字组成，且首位必须为字母')
            return false;
          }
          if(rule.test(this.password)){
            Toast('密码必须由字母和数字组成，且首位必须为字母')
            return false;
          }
          if(!this.flag){
            //注册
            register(params).then(res => {
              if(res.code === 1){
                this.loginConfig(res)
              }
            })
          }else{
            //登录
            login(params).then(res => {
              if(res.code === 1){
                this.loginConfig(res)
              }
            })

          }
        }else {
          Toast('账号或密码不能为空！')
        }
      },
      loginConfig(res){
        //存session
        sessionStorage.setItem('USER',res.account);
        var socket = io('http://localhost:3000');
        let self = this;
        socket.on('connection',function() {
          //链接上了
          self.SET_SOCKET(socket)
          self.SET_UID(res.uid)
          //监听服务端推送
          self.onMessage(socket,res.uid)
          self.$router.replace({path:'/'})
        })
        // socket.on('news', function (data) {
        //   console.log(data);
        //   socket.emit('my other event', { my: 'data' });
        // });
      },
      register(){
        this.flag =false;
      },
      onMessage(socket,uid){
        //向服务端发送uid
        socket.emit('user_login',{uid:uid})
        socket.on(uid,function(data) {
          //vue进行广播
          Bus.emit('takeMessage',data)
        })
      }
    }
  };
</script>

<style lang="scss">
    .login-btn{
        cursor: pointer;
        width: 100%;
        border: 1px solid #fff;
        padding: 8px 0;
        border-radius: 20px;
        box-shadow: 0 3px 10px #fff;
    }
    .register-box{
        padding: 10px;
        margin-top: 10px;
        text-align: right;
        a{
            text-decoration: underline;
        }
    }
    .login-sumbit{
        margin-top: 50px;
    }
    .form-item{
        display: flex;
        padding: 2px 15px;
        margin-bottom: 20px;
        position: relative;
        border: 1px solid #ddd;
        box-shadow: 0 0px 10px #fff;
        label{
            width: 60px;
            position: absolute;
            top: 0;
            left: 15px;
            line-height: 36px;
            height: 100%;
            text-align: left;
        }
    }
    .form-input{
        background-color: transparent;
        border: 0;
        display: block;
        width: 100%;
        height: 32px;
        -webkit-appearance: none;
        box-sizing: border-box;
        padding: 5px 5px 5px 65px;
        outline: none;
        caret-color: #fff;
        &::-webkit-input-placeholder{
            color: #fff;
        }
    }
    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
        -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0) inset/**/
    }

    .login-box{
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        height: 100%;
        background-image: url($path +'img/login_bg.jpg');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    }
    .glass-content{
        position: relative;
        z-index: 15;
        left: 0;
    }
    .glass{
        width: 82%;
        padding: 15px;
        box-sizing: border-box;
        min-height: 50%;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(255,255,255,0.5);
        z-index: 1;
        position: relative;
    }
    .glass:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter: blur(20px);
        background-color: #fff;
        background-image: url($path +'img/login_bg.jpg');
        background-size: cover;
        background-attachment: fixed;
        z-index: -3;
    }

</style>
