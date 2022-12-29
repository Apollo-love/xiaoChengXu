<template>
  <view class="content">
    <view class="aa">
      <radio :checked="tt" color="#C00000" @click="changRadio(tt)"></radio>
      <text>全选</text>
    </view>
    <view class="momeny">
      <text>合计：</text>
      <text>￥{{gouMoney}}</text>
    </view>
    <view class="zhifu">
      <text @click="settlement">结算({{gouTotal}})</text>
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"jiesuan",
    data() {
      return {
        second:3,
        timer:null
      };
    },
    computed:{
      ...mapState('m_user',['token']),
      ...mapState('m_cart',['cart']),
      ...mapGetters('m_cart',['total','gouTotal','gouMoney']),
      ...mapGetters('m_user',['addstr']),
      tt(){
        if(this.total==this.gouTotal){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateTotal']),
      ...mapMutations('m_user',['updateUrl']),
      changRadio(value){
        console.log(value,'changRadio')
        this.updateTotal(!value)
      },
      settlement(){
        if(!this.gouTotal) return uni.$showMsg('请选择结算的商品')
        if(!this.addstr) return uni.$showMsg('请选择收货地址')
        if(!this.token) return this.daojishi()
        this.zhifu()
      },
     async zhifu(){
        const chanshu={
          order_price:0.01,
          consignee_addr:this.addstr,
          goods:this.cart.filter(x=>x.goods_state==true).map(x=>({
            goods_id:x.goods_id,
            goods_number:x.goods_count,
            goods_price:x.goods_price
          }))
        }
        const {data}=await uni.$http.post('/api/public/v1/my/orders/create',chanshu)
        console.log(data,'res')
        const orderNumber='GD20180507000000000110'
        const {datas}=await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
        console.log(datas,'datas')
        const payInfo={
                "timeStamp": "1525681145",
                "nonceStr": "BkPggorBXZwPGXe3",
                "package": "prepay_id=wx071619042918087bb4c1d3d72999385683",
                "signType": "MD5",
                "paySign": "D1642DEEF1663C8012EDEB9297E1D516"
              
        }
        const [err,succ]=await uni.requestPayment(payInfo)
        console.log(err,succ,'12')
        if(err){
          await uni.showToast({
            title:'订单已完成',
            icon:'none'
          })
        }
      },
      daojishi(){
        this.second=3
         this.showTip(this.second)
          this.timer=setInterval(()=>{
           
            this.second--
            if(this.second<=0){
              clearInterval(this.timer)
              uni.switchTab({
                url:'/pages/my/my',
                success: () => {
                  console.log('成功')
                  this.updateUrl({
                    openType:'switchTab',
                    from:'/pages/cart/cart'
                  })
                }
              })
              return
            }
            this.showTip(this.second)
          },1000)
      },
     async showTip(value){
        await uni.showToast({
          icon:'none',
          title:'请登录后再结算'+this.second+'秒后自动跳转到登录页',
          mask:true,
          duration:1500
        })
      }
    }
  }
</script>

<style lang="scss">
.content{
  
  .aa{
    display: flex;
    align-items: center;
  }
  display: flex;
  // position: fixed;
  
  position: fixed;
  width: 100%;
  bottom: 0;
  
  background-color: white;
  justify-content: space-between;
  align-items: center;
  .momeny{
    text:nth-child(2){
      color: red;
    }
  }
  .zhifu{
    color: white;
    text-align: center;
    line-height: 60px;
    height: 60px;
    width: 100px;
    background-color: #C00000;
  }
}
</style>