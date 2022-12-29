<template>
  <view>
    <view class="pic">
      <image :src="userinfo.avatarUrl"></image>
      <text>{{userinfo.nickName}}</text>
    </view>
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>12</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>0</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>900</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
    </view>
    <view class="panel-list1">
      <view class="top">
        我的订单
      </view>
      <view class="bottom">
      <view >
        <image src="/static/my-icons/icon1.png"></image>
        <view>待收货</view>
      </view>
      <view>
        <image src="/static/my-icons/icon2.png"></image>
        <view>待发货</view>
      </view>
      <view>
        <image src="/static/my-icons/icon3.png"></image>
        <view>退货/退款</view>
      </view>
      <view>
        <image src="/static/my-icons/icon4.png"></image>
        <view>全部订单</view>
      </view>
      </view>
    </view>
    <view class="panel-list2">
      <view>
      <text>收货地址</text>
      <uni-icons type="arrowright"></uni-icons>
      </view>
      <view>
      <text>联系客服</text>
      <uni-icons type="arrowright"></uni-icons>
      </view>
      <view @click="logout">
      <text>退出登录</text>
      <uni-icons type="arrowright" ></uni-icons>
      </view>
      </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-useInfo",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      async logout(){
        const [err,succ]=await uni.showModal({
          title:'提示',
          content:'确定退出码'
        }).catch(err=>err)
        console.log(err)
        console.log(succ)
        if(succ.confirm){
          this.updateAddress({})
          this.updateUserInfo({})
          this.updateToken('')
        }
      }
    }
  }
</script>

<style lang="scss">
.pic{
  background-color: #c00000;
  height: 500rpx;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  image{
    width: 90px;
    height: 90px;
    border: 1px solid white;
    border-radius: 100%;
    box-shadow: 0 1px 0 0;
    margin-bottom: 10rpx;
  }
}
.panel-list{
  // margin-top: 100px;
  position: relative;
  top: -10px !important;
  left: 9px;
  background-color: white;
  z-index: 100;
height: 60px;
border-radius: 5%;
width: 95%;

.panel-body{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  .panel-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
}
}
.panel-list1{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  height: 300rpx;
  width: 95%;
  margin-left: 9px;
  .top{
    margin-left: 20px;
  }
}
.bottom{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  view{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  image{
    width: 90rpx;
    height: 90rpx;
  }
}
.panel-list2{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  view{
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
  }
  height: 200rpx;
  background-color: white;
  width: 95%;
  margin-left: 9px;
  margin-top: 10px;
}
</style>