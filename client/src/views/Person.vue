<template>
    <div class="chat-container">
        <div class="chat-name">
            <van-nav-bar
                    class="chat-title"
                    :title="groupName"
                    left-text="返回"
                    left-arrow
            >
                <div slot="right">
                    <van-icon name="wap-nav" size="18px"></van-icon>
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
  export default {
    name: "person"
  };
</script>

<style scoped>

</style>
