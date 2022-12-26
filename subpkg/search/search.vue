<template>
  <view class="search">
    <uni-search-bar  @input="input" :radius=100 :cancelButton="none"></uni-search-bar>
    
    <view class="guess-list" v-if="qsearch.length!=0">
      <view class="guess-item" v-for="(obj,i) in qsearch" :key="i" @click="gotoDetail(obj)">
        <view class="goods-name">{{obj.goods_name}}</view>
        <uni-icons type="forward" size="17"></uni-icons>
      </view>
    </view>
    
    <view class="hoestory" v-else>
      <view class="hoestoryTop">
        <view>搜索历史</view>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="hoestoryBody">
        <uni-tag @click="gotoGoodsList(item)" v-for="(item,i) in historys" :text="item" :key="i"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
import { set } from 'vue';
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        qsearch:[],
        historyList:[]
      };
    },
    computed:{
      historys(){
        return [...this.historyList.reverse()]
      }
    },
    methods:{
      gotoGoodsList(value){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+value
        })
      },
      input(e){
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
            this.kw=e.value
            this.getsearch()
        },500)
      },
      async getsearch(){
        if(this.kw==='') return this.qsearch=[]
        const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        console.log(res,'res')
        this.qsearch=res.message
        this.saveSearchHistory()
      },
      gotoDetail(value){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?id='+value.goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        let set=new Set(this.historyList);
        set.delete(this.kw);
        set.add(this.kw)
        this.historyList=Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      }
    },
    onLoad() {
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    }
  }
</script>

<style lang="scss">
.search{
  position: sticky;
  top:0
}
.guess-list{
  .guess-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    border: 1px solid #efefef;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.guess-item{
  height: 40px;
}

.hoestory{
  .hoestoryTop{
    display: flex;
    justify-content: space-between;
  }
  .hoestoryBody{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      margin: 10rpx;
      // width: 60rpx;
      border: 1px solid #efefef;
    }
  }
}
</style>
