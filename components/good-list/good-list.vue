<template>
  <view class="box">
    <view class="left">
      <radio @click="change(objs)" :checked="objs.goods_state" color="#C00000" v-if="showRedio"></radio>
      <image :src="objs.goods_small_logo" ></image>
    </view>
    <view class="right">
      <view>{{objs.goods_name}}</view>
      <view class="text">￥{{objs.goods_price | tofix}}
     
      </view>
       <uni-number-box v-if="showNum" :min="1" :value="objs.goods_count" @change="changeCountt" :max="9"></uni-number-box>

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
      },
      showRedio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    filters:{
      tofix(value){
        return parseFloat(value).toFixed(2)
      }
    },
    methods:{
      change(value){
        console.log(value,'v')
        this.$emit('changeItem',{
          goods_id:value.goods_id,
          goods_state:!value.goods_state
        })
      },
      changeCountt(e){
        console.log(e,'sd')
        this.$emit('changeCount',{
          goods_id:this.objs.goods_id,
          goods_count:e-0
        })
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
      display: flex;
      justify-content: space-around;
      align-items: center;
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
         // display: flex;
         // justify-content: space-around;
         color: red;
         font-size: 18px;
       }
      }
    }
</style>