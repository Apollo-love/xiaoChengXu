<template>
  <view class="cc">
    <address-list></address-list>
    <view class="cart-title">
            <uni-icons type="shop" size="18"></uni-icons>
            <text class="cart-title-text">购物车</text>
    </view>

    <uni-swipe-action>
      <block v-for="(obj,i) in cart" :key="i">
      <uni-swipe-action-item :options="options" @click="del(obj)">
        <good-list @changeItem="updateState1" @changeCount="updateCount1" :showNum="true" :showRedio="true" :objs="obj"></good-list>
      </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <jiesuan></jiesuan>
  </view>
</template>

<script>
  import table from '@/mixins/table-bar.js'
  import {mapState,mapMutations,mapGetters} from 'vuex'
  
  export default {
    mixins:[table],
    computed:{
      ...mapState('m_cart',['cart'])
      
    },
    data() {
      return {
        options:[
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#dd524d'
                    }
                }
              ]
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateState']),
      ...mapMutations('m_cart',['updateCount','delGood']),
      updateState1(value){
        // console.log(value,'v2')
        this.updateState(value)
      },
      updateCount1(value){
        console.log(value,1)
        this.updateCount(value)
        // table.methods.setBadge()
      },
      del(value){
        console.log(value,'22')
        this.delGood({
          goods_id:value.goods_id
        })
      }
    }
    
  }
</script>

<style>
.cc{
  padding-bottom: 60px;
}
</style>
