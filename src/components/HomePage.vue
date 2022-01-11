<template>
   <!--主页-->
    <div>
     <order></order>
     <div class="tool_bar">
       <van-tabbar v-model="active">
         <van-tabbar-item icon="home-o">寄快递</van-tabbar-item>
         <van-tabbar-item icon="search">订单</van-tabbar-item>
         <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
       </van-tabbar>
     </div>
    </div>
</template>

<script>
import order from './Order'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0
    }
  },
  components: {
    order
  }
}
</script>

<style scoped>

</style>
