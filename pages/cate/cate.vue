<template>
  <view>
    <view class="top">
    <my-search @click='gotoSearch'></my-search>
    </view>

    <view class="scroll-view-container">
      <!-- 左侧的滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
       <block v-for="(obj,i) in cateList" :key="i">
         <view :class="['left-scroll-view-item',active===i?'active':'']" @click="activeChanged(i)">{{obj.cat_name}}</view>
       </block>
      </scroll-view>
      <!-- 右侧的滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
      <view class="cate-lv2" v-for="(obj,i) in cateLevel2" :key="i">
        <view class="cate-lv2-title">/{{obj.cat_name}}</view>
        <view class="cate-lv3">
          <view class="cate-lv3-item" @click="gotoGoodsList(item)" v-for="(item,i) in obj.children">
            <text>{{item.cat_name}}</text>
          </view>
        </view>
      </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 当前设备可用的高度
        wh: 0,
        cateList: [],
        active: 0,
        // 二级分类的列表
        cateLevel2: [],
        scrollTop:0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 40

      this.getCateList()
    },
    methods: {
      // 获取分类列表的数据
      async getCateList() {
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        console.log(res.message,1)
        // 为二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(i) {
        this.active = i

        // 重新为二级分类赋值
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop=this.scrollTop===0?1:0
    
      },
      gotoGoodsList(value){
        console.log(value,'2');
        uni.navigateTo({
          url:"/subpkg/goods_list/goods_list?cid="+value.cat_id
        })
      },
      gotoSearch(){
        console.log('my')
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
       
      }
    }
  }
</script>

<style lang="scss">
  
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #FFFFFF;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #C00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

.cate-lv3{
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;
  .cate-lv3-item{
    width: 33%;
    
    
  }
}
 
  
</style>
