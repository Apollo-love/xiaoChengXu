<template>
  <view class="a">
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
     <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {

      };
    },
    computed:{
      ...mapState('m_user',['url'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateUrl']),
      // getUserInfo(e) {
      //         console.log(e)
      
      //         if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
      
      //         // console.log(e.detail.userInfo)
      //         this.updateUserInfo(e.detail.userInfo)
      
      //         this.getToken(e.detail)
      //       },
               getUserProfile(e) {
                    uni.getUserProfile({
                      desc: '你的授权信息',
                      success: (res) => {
                        
                        // 将信息存到 vuex 中
                        this.updateUserInfo(res.userInfo)
                        this.getToken(res)
                        console.log(e)
                        console.log(res)
                      },
                      fail: (res) => {
                        return uni.$showMsg('您取消了登录授权')
                      }
                    })},
            async getToken(info){
              const [err, res] = await uni.login().catch(err => err)
              
                      if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
                      console.log(err,'err')
                      console.log(res,'res')
                        const query = {
                                code: res.code,
                                encryptedData: info.encryptedData,
                                iv: info.iv,
                                rawData: info.rawData,
                                signature: info.signature
                              }
                      
                              const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
                              // console.log(loginResult,'data')
                              // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
                              uni.$showMsg('登录成功！')
                              this.updateToken('123')
                              this.navigateBack()
                              
            },
            navigateBack(){
              if(this.url&&this.url.openType=='switchTab'){
                 uni.switchTab({
                  url:this.url.from,
                  complete: () => {
                    this.updateUrl(null)
                  }
                })
              }
            }
    }
    
    }
  
</script>

<style lang="scss">
  .a{
   height: 100%;
  }
  .login-container {
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: ' ';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
