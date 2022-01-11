import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SendPost from '@/components/SendPost'
import WriteAddress from '@/components/WriteAddress'
import HomePage from '@/components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sendPost',
      name: 'SendPost',
      component: SendPost
    },
    {
      path: '/WriteAddress',
      name: 'WriteAddress',
      component: WriteAddress
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
