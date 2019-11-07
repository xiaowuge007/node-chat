<template>
    <div class="common-content">
        <van-nav-bar
                class="chat-title"
                title="好友"
                :fixed="true"
                @click-right="onClickLeft"
        >
            <div slot="right">
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
        <van-index-bar :sticky="sticky" :index-list="indexList">
            <template v-for="li in list">
                <van-index-anchor :index="li.title"></van-index-anchor>
                <van-cell v-for="item in li.children" :key="item.p_name"
                        >
                    <div slot="default">
                        <div class="friend-item">
                            <div class="friend-head">
                                <img src="~@assets/img/boy2.jpeg">
                            </div>
                            <div class="friend-chat">
                                <div class="friend-name">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </van-cell>
            </template>
        </van-index-bar>
    </div>
</template>

<script>
  import Mtils from 'mtils';
  import { getFriends } from '../../api/user'
  export default {
    name: "Friend",
    data(){
      return {
        list: [],
        sticky: false,
        flag: false
      }
    },
    mounted() {
      var id = sessionStorage.getItem('UUID');
      getFriends(id).then(res=>{
        this.list = this.getList(res.friends);
      })

    },
    computed:{
      indexList() {
        if(this.list.length<1){
          return []
        }else{
          return this.list.map(val => {
            return val.title;
          })
        }
      }
    },
    methods:{
      onClickLeft(){
        this.flag = !this.flag;
      },
      goAddFriend(){
        this.$router.push({path: '/addFriend'})
      },
      goAddGroup(){
        this.$router.push({path: '/addGroup'})
      },
      getList(arr){
        // var arr = ['张三','李四','李四','李四','李四','王二','a','v','钱六','李武','望天']
        let p_arr = arr.map(val => {
          val.name = val.account;
          val.p_name = Mtils.utils.makePy(val.name);
          val.firstNO = val.p_name.substring(0,1).toUpperCase();
          return val;
        })
        p_arr = this.sortName(p_arr);
        let list = [];
        let cur = ''
        for(let i = 0;i< p_arr.length;i++){
          if(p_arr[i].firstNO !== cur){
            cur = p_arr[i].firstNO;
            list.push({
              title: cur,
              children:[p_arr[i]]
            })
          }else{
            list[list.length-1].children.push(p_arr[i])
          }
        }
        return list;
      },
      sortName(arr){
        return arr.sort(function(a,b) {
          return a.firstNO.localeCompare(b.firstNO);
        })
      }
    }
  };
</script>

<style lang="scss">
.common-content{
    padding-top: 50px;
}
</style>
