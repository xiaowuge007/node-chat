<template>
    <div class="common-content">
        <van-nav-bar
                class="chat-title"
                title="发起群聊"
                left-text=""
                left-arrow
                :fixed="true"
                @click-right="onClickRight"
                @click-left="onClickLeft"
        >
            <div slot="right">
                <van-button size="mini" :disabled="nextFlag" type="default">确定</van-button>
            </div>
        </van-nav-bar>
        <div>
            <van-cell-group title="群名称">
                <van-cell-group>
                    <van-field label="群名称" v-model="value" placeholder="请输入群名字" />
                </van-cell-group>
            </van-cell-group>
            <div class="line"></div>
            <van-cell-group title="群好友">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
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
                                        <div class="friend-check">
                                            <van-checkbox shape="square" :name="item.name"></van-checkbox>
                                        </div>
                                    </div>
                                </div>
                            </van-cell>
                        </template>
                    </van-index-bar>
                </van-checkbox-group>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
  import Mtils from 'mtils';
  export default {
    name: "Add",
    data(){
      return {
        list: [],
        sticky: false,
        flag: false,
        value: '',
        result: []
      }
    },
    mounted() {
      this.list = this.getList();
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
      },
      nextFlag(){
        return !(this.value && this.result.length > 0);
      }
    },
    methods:{
      onClickRight(){

      },
      onClickLeft(){
        this.$router.back()
      },
      getList(){
        var arr = ['张三','李四','李四','李四','李四','王二','a','v','钱六','李武','望天']
        let p_arr = arr.map(val => {
          let obj = {}
          obj.name = val;
          obj.p_name = Mtils.utils.makePy(val);
          obj.firstNO = obj.p_name.substring(0,1).toUpperCase();
          return obj;
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
    .friend-check{
        padding-right: 15px;
        .van-icon{
            border-color: $gray;
        }
        .van-checkbox__icon--checked .van-icon{
            border-color: #1989fa;
        }
    }
</style>
