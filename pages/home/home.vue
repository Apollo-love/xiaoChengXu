<template>
  <view>
    <swiper class="maxBox" indicator-dots>
      <swiper-item v-for="(obj,i) in swiperList" :key="i">
        <navigator class="images" :url="`/subpkg/goods_detail/goods_detail?goods_id=${obj.goods_id}`">
          <image :src="obj.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="tab-list">
      <view class="imgs" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(obj,i) in floorList" :key="i">
        <image :src="obj.floor_title.image_src"></image>
        <view class="yifu">
          <view class="left">
            <navigator :url="obj.product_list[0].url">
            <image :src="obj.product_list[0].image_src" :style="{width:obj.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
          <view class="right">
            <navigator :url="item.url" v-for="(item,index) in obj.product_list" :key="index" v-if="index!==0">
            <image  :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix" ></image>
            </navigator>
          </view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList(){
        const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata');
        console.log(res)
        // if(res.meta.status!==200){
        //   return uni.showToast({
        //     title: '请求失败',
        //     icon: '',
        //     duration: 2000
        //   })
        // }
        if(res.meta.status!==200) return uni.$showMsg()
        this.swiperList=res.message
        // uni.$showMsg('数据请求成功')
      },
      async getNavList(){
        const {data:res}=await uni.$http.get("/api/public/v1/home/catitems")
        console.log(res,1)
        if(res.meta.status!==200) return uni.$showMsg()
        this.navList=res.message
      },
     navClickHandler(value){
       console.log(value)
       if(value.name==='分类'){
         uni.switchTab({
           url:'/pages/cate/cate'
         })
       }
     },
     async getFloorList() {
             const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
             if (res.meta.status !== 200) return uni.$showMsg()
     
             // 对数据进行处理
             res.message.forEach(floor => {
               floor.product_list.forEach(prod => {
                 prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
               })
             })
             this.floorList = res.message
           }
    },
    
  }
</script>

<style lang="scss">
  .images{
    height: 330rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
  
  .tab-list{
    
    // background-color: black;
    display: flex;
    justify-content: space-around;
    padding-top: 20rpx;
    height: 200rpx;
    .imgs{
      height: 200rpx;
      image{
        height:150rpx;
        width: 150rpx;
      }
    }
  }
  
 .floor-item{
   image{
     width: 100%;
     height: 60rpx;
   }
   
   .yifu{
     display: flex;
     margin-left: 25rpx;
     .right{
       display: flex;
      flex-wrap: wrap;
     }
   }
   
 }
</style>
