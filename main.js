
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'
uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'



$http.beforeRequest = function (options) {
 uni.showLoading({
   title:'数据加载中...'
 })
 if(options.url.indexOf('/my/')!==-1){
   options.header={
     Authorization:store.state.m_user.token
   }
 }
 console.log(store,'store')
 console.log(options,'options')
}



$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$showMsg=function(title='数据请求失败',duration=1500){
   uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    store
  }
}
// #endif