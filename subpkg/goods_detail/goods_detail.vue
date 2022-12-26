<template>
  <view v-if="goods_info.goods_name">
    <swiper class="center" autoplay 	indicator-dots>
      <swiper-item class="centerItem" v-for="(obj,i) in goods_info.pics" @click="pitch(i)" :key="i">
        <image :src="obj.pics_big"></image>
      </swiper-item>
    </swiper>
    
    <view class="goods-info-box">
      <view class="prive">￥{{goods_info.goods_price}}</view>
      <view class="good-into-body">
        <view class="good-name">{{goods_info.goods_name}}</view>
        <view class="fayi">
          <uni-icons type="star" size="18"></uni-icons>
          <text>收藏</text>
        </view>
        
      </view>
      <view>快递：免运费</view>
    </view>
    <view> 
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>
    <view class="box">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: {},
         options: [{
			icon: 'headphones',
			text: '客服'
		}, {
			icon: 'shop',
			text: '店铺',
			info: 2,
			infoBackgroundColor:'#007aff',
			infoColor:"red"
		}, {
			icon: 'cart',
			text: '购物车',
			info: 2
		}],
	    buttonGroup: [{
	      text: '加入购物车',
	      backgroundColor: '#ff0000',
	      color: '#fff'
	    },
	    {
	      text: '立即购买',
	      backgroundColor: '#ffa200',
	      color: '#fff'
	    }
	    ]
      };
    },
    onLoad(options) {
          const goods_id = options.goods_id
          this.getGoodsDetail(goods_id)
        },
    methods:{
      async getGoodsDetail(goods_id) {
              const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
              if (res.meta.status !== 200) return uni.$showMsg()
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
              this.goods_info = res.message
      

            },
            pitch(value){
              uni.previewImage({
                current:value,
                urls:this.goods_info.pics.map(item=>item.pics_big_url)
              })
            },
            onClick(e){
              console.log(e,'e')
              if(e.content.text=="购物车"){
                uni.switchTab({
                  url:'/pages/cart/cart'
                })
              }
            }
    }
  }
</script>

<style lang="scss">
  .box{
    position: sticky;
    bottom: 0;
    // left: 0;
  }
  .goods-info-box{
    padding: 20rpx;
    font-size: 15px;
    .prive{
      color: red;
    }
    .good-into-body{
      display: flex;
      justify-content: space-between;
      
      .good-name{
        padding-right: 20rpx;
        // margin-right: 20rpx;
        border-right: 1px solid #efefef;
      }
      .fayi{
        display: flex;
        flex-direction: column;
        align-items: center;
        // margin-left: 20rpx;
        width: 350rpx;
      }
    }
    
  }
.center{
  height: 700rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
</style>
