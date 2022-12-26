<template>
  <view class="content">
    <view v-for="(obj,i) in goodsList" :key="i" @click="gotoGoodsList(obj)">
     <good-list :objs="obj"></good-list>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        isloading:false
      };
    },
    methods:{
      async getGoodsList(cb){
        this.isloading=true
       const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       console.log(res,'21')
       this.total=res.message.total
       this.goodsList=[...this.goodsList,...res.message.goods]
       cb&&cb()
       this.isloading=false
      },
      gotoGoodsList(value){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+value.goods_id
        })
      }
    },
    onLoad() {
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.goodsList=[]
      this.queryObj.pagenum=1
      this.isloading=false
      this.getGoodsList(()=>{
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom(){
      console.log(1)
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
      if(this.isloading) return uni.$showMsg('正在加载中...')
      this.queryObj.pagenum+=1
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
  .content{
    padding: 0 20rpx;
  }
  
  
</style>
