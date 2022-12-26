<template>
  <view class="box">
    <view class="left">
      <image :src="objs.goods_small_logo" ></image>
    </view>
    <view class="right">
      <view>{{objs.goods_name}}</view>
      <view class="text">￥{{objs.goods_price | tofix}}</view>
      
    </view>
  </view>
</template>

<script>
  export default {
    name:"good-list",
    data() {
      return {
        
      };
    },
    props:{
      objs:{
        type:Object
      }
    },
    filters:{
      tofix(value){
        return parseFloat(value).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.box{
    display: flex;
    border: 1px solid #efefef;
    box-shadow: 10px 10px 10px #efefef;
    margin: 10rpx 0;
    .left{
      margin-right: 20rpx;
      image{
        width: 280rpx;
        height: 280rpx;
        
      }
    }
    .right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
       .text{
         color: red;
         font-size: 18px;
       }
      }
    }
</style>