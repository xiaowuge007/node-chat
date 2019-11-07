<template>
    <div class="chat-container">
        <div class="chat-name">
            <van-nav-bar
                class="chat-title"
                :title="groupName"
                left-text="返回"
                right-text="按钮"
                left-arrow
            >
                <div slot="right">
                    <van-icon name="friends-o" size="18px"></van-icon>
                </div>
            </van-nav-bar>
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
      Bus.$on('takeMessage',function(data) {

      })
    }
  };
</script>

<style lang="scss">

</style>
