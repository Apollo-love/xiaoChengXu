export default{
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address')||'{}'),
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    token: uni.getStorageSync('token') || '',
    url:null
    
  }),
  mutations:{
    updateAddress(state,address){
      state.address=address
      this.commit('m_user/saveAddressToStorge')
    },
    saveAddressToStorge(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state, userinfo) {
          state.userinfo = userinfo
    
          this.commit('m_user/saveUserInfoToStorage')
        },
        saveUserInfoToStorage(state) {
          uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        updateToken(state, token) {
              state.token = token
              this.commit('m_user/saveTokenToStorage')
            },
            saveTokenToStorage(state) {
              uni.setStorageSync('token', state.token)
            },
            updateUrl(state,value){
              console.log(value)
              state.url=value
             
            }
    // 每个商品的信息对象，都包含如下 6 个属性：
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    
  },
  getters:{
    addstr(state) {
          if (!state.address.provinceName) return ''
    
          return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
        }
  }
}