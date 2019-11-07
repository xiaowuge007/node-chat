<template>
    <div >
        <van-nav-bar class="chat-title" title="会话" @click-right="onClickRight">
            <div slot="left">
                <van-icon name="bars" size="18px"></van-icon>
            </div>
            <div slot="right" class="add-head">
                <van-icon name="plus" size="18px"></van-icon>
                <transition name="fade">
                    <div class="add-select" v-show="flag">
                        <div class="arrow-add"></div>
                        <div class="add-item" @click="goAddGroup">
                            <div class="add-item-left"><van-icon size="14px" name="chat"></van-icon></div>
                            <div class="add-item-right">发起群聊</div>
                        </div>
                        <div class="add-item" @click="goAddFriend">
                            <div class="add-item-left"><van-icon size="14px" name="friends"></van-icon></div>
                            <div class="add-item-right">添加朋友</div>
                        </div>
                    </div>
                </transition>
            </div>
        </van-nav-bar>
        <ul class="msg-list">
            <li class="msg-item" v-long-click="longClick" @click="handlerClick">
                <div class="msg-head">
                    <img src="~@assets/img/boy2.jpeg" alt="">
                </div>
                <div class="msg-chat">
                    <div class="friend-name">张三</div>
                    <div class="last-msg">今天天气真好呀</div>
                </div>
            </li>
        </ul>
        <div class="select-modal">
            <div class="modal-item">
                删除聊天
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Message",
    data(){
      return {
        flag: false
      }
    },
    methods:{
      handlerClick(){
        console.log('点击')
      },
      longClick(){
        console.log('长按事件。。。')
      },
      onClickRight(){
        this.flag = !this.flag;
      },
      goAddFriend(){
        this.$router.push({path: '/addFriend'})
      },
      goAddGroup(){
        this.$router.push({path: '/addGroup'})
      },
    }
  };
</script>

<style lang="scss">
    .select-modal{
        position: fixed;
        top: 50px;
        right: 50px;
        box-shadow: 0 0 10px #ccc;
        border: 1px solid $tintGray;
        padding: 5px 15px;
        background-color: #fff;
        color: #333;
    }
</style>
