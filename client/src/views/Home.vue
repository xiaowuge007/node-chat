<template>
  <div class="home">
    <div class="home-content">
      <component v-bind:is="currentTabComponent"></component>
    </div>
    <van-tabbar
            :active-color="color"
            v-model="active">
      <van-tabbar-item icon="chat">聊天</van-tabbar-item>
      <van-tabbar-item icon="friends">朋友</van-tabbar-item>
      <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import Friend from './home/Friend'
import Message from './home/Message'
import Mine from './home/Mine'
export default {
  name: "home",
  components: {
    'friend': Friend,
    'message': Message,
    'mine': Mine
  },
  data(){
    return {
      active:0,
      color: '#22cece'
    }
  },
  computed:{
    currentTabComponent (){
      switch (this.active) {
        case 0: return 'message';
        break;
        case 1: return 'friend';
        break;
        case 2: return 'mine';
        break;
      }
    }
  },
  methods:{
  }
};
</script>
<style lang="scss">
  .home-content{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .home{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .msg-item{
    height: 60px;
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  .msg-head{
    width: 60px;
    height: 60px;
    padding:  10px;
    box-sizing: border-box;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .friend-name{
    color: #000;
    font-size: $font16;
    margin-bottom: 5px;
  }
  .last-msg{
    font-size: $font-12;
  }
  .msg-chat{
    flex: 1;
    text-align: left;
    padding: 10px;
  }
</style>
