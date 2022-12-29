<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-useInfo v-else></my-useInfo>
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">
view{
  // background-color: white;
}
</style>
