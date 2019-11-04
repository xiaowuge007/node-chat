<template>
    <div class="chat-container">
        <div class="chat-name">
            <van-nav-bar
                class="chat-title"
                :title="groupName"
                left-text="返回"
                right-text="按钮"
                left-arrow
            ></van-nav-bar>
        </div>
        <div class="chat-bottom">
            <div class="enter-msg">
                <input type="text" v-model="message">
            </div>
            <div class="send-msg">
                <button>发送</button>
            </div>
        </div>
        <ul class="chat-content">

        </ul>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Bus from '../util/bus'
  export default {
    name: "People",
    data() {
      return {
        groupName: '聊天室',
        message: ''
      };
    },
    computed:{
      ...mapGetters([
        'socket',
        'uid'
      ])
    },
    mounted() {
      Bus.on('takeMessage',function(data) {

      })
    }
  };
</script>

<style lang="scss">
    .chat-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: #eee;
    }
    .chat-content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 46px 0 54px 0;
        box-sizing: border-box;
        /*background-image: url($path + '/img/chat_bg.jpg');*/
        background-size: cover;
    }
    .chat-title.van-nav-bar{
        background-color: transparent;
        .van-nav-bar__text,.van-nav-bar__title,.van-icon{
            color: #ffffff;
        }
    }
    .enter-msg{
        flex: 1;
        padding: 0 5px;
        input{
            display: block;
            width: 100%;
            height: 28px;
        }
    }
    .send-msg{
        padding-left: 8px;
        button{
            border: 0;
            background-color: forestgreen;
            color: white;
            font-size: 12px;
            padding: 5px 20px 6px;
            border-radius: 2px;
        }
    }
    .chat-bottom{
        position: absolute;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        padding: 0 15px;
        height: 54px;
        align-items: center;
        border-top: 1px solid #ccc;
        background-color: #e3e3e3;
    }
    .chat-name{
        position: absolute;
        top: 0;
        width: 100%;
        border-bottom: 1px solid #fefefe;
        background-color: forestgreen;
    }
</style>
