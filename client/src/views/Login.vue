<template>
    <div class="login-box">
        <div v-if="flag">
            <div class="chat-sign">CHATS</div>
            <div class="form-item">
                <label><van-icon size="20px" name="manager"></van-icon></label>
                <input type="text"  autocomplete="off" placeholder="请输入账号" class="form-input" v-model="account">
            </div>
            <div class="form-item">
                <label><van-icon size="20px" name="lock"></van-icon></label>
                <input type="password" autocomplete="new-password" placeholder="请输入密码" class="form-input" v-model="password">
            </div>
            <div class="login-sumbit">
                <div class="login-btn" @click="go">登录</div>
            </div>
            <div class="register-box">
                没有账号？<a @click="register(false)">去注册</a>
            </div>
        </div>
        <div v-if="!flag">
            <div class="chat-sign">CHATS</div>
            <div class="form-item">
                <label><van-icon size="20px" name="manager"></van-icon></label>
                <input type="text"  autocomplete="off" placeholder="请输入账号" class="form-input" v-model="account">
            </div>
            <div class="form-item">
                <label><van-icon size="20px" name="lock"></van-icon></label>
                <input type="password" autocomplete="new-password" placeholder="请输入密码" class="form-input" v-model="password">
            </div>
            <div class="login-sumbit">
                <div class="login-btn" @click="go">注册</div>
            </div>
            <div class="register-box">
                <a @click="register(true)">返回登录</a>
            </div>
        </div>
       <!-- <span>GLASS</span>-->
    </div>
</template>

<script>
  import { register, login } from '../api/user'
  import { mapMutations  } from 'vuex'
  import { Toast } from 'vant';
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
          if(!rule.test(this.account)){
            Toast('账号必须由字母和数字组成，且首位必须为字母')
            return false;
          }
          if(!rule.test(this.password)){
            Toast('密码必须由字母和数字组成，且首位必须为字母')
            return false;
          }
          if(!this.flag){
            //注册
            register(params).then(res => {
              if(res.code === 1){
                this.loginConfig(res.data)
              }
            })
          }else{
            //登录
            login(params).then(res => {
              if(res.code === 1){
                this.loginConfig(res.data)
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
        sessionStorage.setItem('UUID',res.uid)
        this.SET_UID(res.uid)
        this.$router.replace({path:'/'})
      },
      register(flag){
        this.flag = flag;
        this.password = '';
        this.account = '';
      }
    }
  };
</script>

<style lang="scss">
    .login-btn{
        cursor: pointer;
        width: 100%;
        height: 40px;
        font-size: $font18;
        line-height: 40px;
        border-radius: 20px;
        box-shadow: 0 3px 10px #fff;
        text-align: center;
        background-color: $green;
        color: #ffffff;
    }
    .chat-sign{
        width: 100px;
        margin: 100px auto 50px;
        height: 100px;
        border-radius: 50%;
        background-color: $green;
        font-size: $font24;
        color: #fff;
        text-align: center;
        line-height: 100px;
    }
    .register-box{
        padding: 10px 20px;
        margin-top: 10px;
        text-align: right;
        a{
            text-decoration: underline;
            color: $green;
        }
    }
    .login-sumbit{
        margin-top: 25px;
        padding: 0 20px;
    }
    .form-item{
        position: relative;
        padding: 0 20px;
        margin-bottom: 20px;
        label{
            width: 30px;
            position: absolute;
            height: 100%;
            top: 0;
            left: 35px;
            display: flex;
            align-items: center;
            text-align: left;
            color: $green;
        }
    }
    .form-input{
        border: 1px solid  #d2d7db;
        border-radius: 20px;
        display: block;
        width: 100%;
        height: 40px;
        color: $gray;
        -webkit-appearance: none;
        box-sizing: border-box;
        padding: 5px 5px 5px 45px;
        outline: none;
        transition: border-color 0.2s ease;
        &:focus,&:active{
            border-color: $green;
            box-shadow: 0 0 20px $tintGreen;
        }
       /* caret-color: $green;*/
    }
    .login-box{
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        height: 100%;
        background-size: cover;
        font-size: 14px;
    }

</style>
