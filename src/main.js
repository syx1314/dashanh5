// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {post, fetch, patch, put} from './axios/http'
import { Tabbar, TabbarItem, PullRefresh, List, Stepper, Rate, RadioGroup, Radio, Field, Grid, GridItem, Swipe, SwipeItem, Lazyload, NoticeBar, Image as VanImage } from 'vant'

import 'lib-flexible/flexible'
Vue.use(Rate)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Stepper)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(NoticeBar)
Vue.use(VanImage)
Vue.config.productionTip = false
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
