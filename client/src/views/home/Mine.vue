<template>
    <div>
        <div class="mine-head">
            <div class="head-img">
                <img src="~@assets/img/girl1.jpeg" alt="">
            </div>
            <div class="nickname">孙悟空</div>
            <div class="remark">弼马温是个什么官</div>
        </div>
        <van-cell-group>
            <van-cell title="收藏" :border="true" icon="location-o" is-link></van-cell>
            <van-cell title="设置" icon="location-o" is-link></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "Mine"
  };
</script>

<style lang="scss">
    .mine-head{
        padding: 20px 20px;
        border-bottom: 1px solid $tintDark;
        text-align: center;
        .msg-item{
            border: 0;
        }
        margin-top: 30px;
    }
    .head-img{
        width: 80px;
        height: 80px;
        margin: auto;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .nickname{
        font-size: $font;
        color: $green;
        margin: 10px 0 5px;
    }
    .remark{
        font-size: $font-12;
        color: $middleGray;
    }
</style>
