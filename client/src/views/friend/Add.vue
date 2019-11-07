<template>
    <div>
        <van-search
                @search="onSearch"
                placeholder="请输入朋友的名称或者账号" v-model="value" />
        <ul>
            <li class="msg-item" v-for="lis in list" :key="lis.uid" @click="add(lis)">
                <div class="msg-head">
                    <img src="~@assets/img/boy2.jpeg">
                </div>
                <div class="msg-chat">
                    <div class="friend-name">{{lis.account}}</div>
                    <div class="last-msg">今天天气真好呀</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  import {queryFriend, addFriend} from '../../api/user'
  import { Toast, Dialog } from 'vant';
  import { mapGetters  } from 'vuex'
  export default {
    name: "Add",
    data(){
      return {
        value: '',
        list: []
      }
    },
    computed:{
      ...mapGetters([
        'uid'
      ])
    },
    methods:{
      onSearch(){
        if(this.value.trim()){
          let params = {
            keyword: this.value.trim(),
            account:sessionStorage.getItem('USER')
          }
          queryFriend(params).then(res=>{
            if(res.code === 1){
              this.list = res.data;
            }
          })
        }
        //console.log(this.value)
      },
      add(user){
        let data = {
          uid: sessionStorage.getItem('UUID'),
          friend: user
        }
        Dialog.confirm({
          title: '添加好友',
          message: `是否要添加 ${user.account} 为好友`
        }).then(() => {
          addFriend(data).then(res=>{

          })
        }).catch(() => {
          // on cancel
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    .friend-item{
        padding: 5px 10px;
        color: #888;
        border-bottom: 1px solid #ccc;
    }
</style>
