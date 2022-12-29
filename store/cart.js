export default{
  namespaced:true,
  state:()=>({
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  }),
  mutations:{
    // 每个商品的信息对象，都包含如下 6 个属性：
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    addToCart(state,good){
      const findResult=state.cart.find(x=>x.goods_id===good.goods_id)
      console.log(findResult,'findResult')
      if(!findResult){
        state.cart.push(good)
      }else{
        findResult.goods_count++
      }
      console.log(state.cart,'cart')
      this.commit('m_cart/saveToCart')
    },
    saveToCart(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    updateState(state,good){
      const findResult=state.cart.find(x=>x.goods_id===good.goods_id)
      if(findResult){
        findResult.goods_state=good.goods_state
      this.commit('m_cart/saveToCart')
      }
    },
    updateCount(state,good){
      const findResult=state.cart.find(x=>x.goods_id===good.goods_id)
      console.log(findResult,'findResult')
      if(findResult){
        findResult.goods_count=good.goods_count
        this.commit('m_cart/saveToCart')
      }
    },
    delGood(state,good){
      const findIndex=state.cart.findIndex(x=>x.goods_id===good.goods_id)
      // state.cart=state.cart.filter(x=>x.goods_id!=good.goods_id)
      console.log(findIndex,'findIndex')
      state.cart.splice(findIndex,1)
      this.commit('m_cart/saveToCart')
    },
    updateTotal(state,good){
      state.cart.forEach(item=>item.goods_state=good)
      this.commit('m_cart/saveToCart')
    }
  },
  getters:{
    total(state){
      return state.cart.reduce((total,item)=>total+=item.goods_count,0)
    },
    gouTotal(state){
      return state.cart.filter(x=>x.goods_state).reduce((sum,item)=>sum+=item.goods_count,0)
    },
    gouMoney(state){
      return state.cart.filter(x=>x.goods_state).reduce((sum,item)=>sum+=item.goods_count*item.goods_price,0).toFixed(2)
    }
  }
}