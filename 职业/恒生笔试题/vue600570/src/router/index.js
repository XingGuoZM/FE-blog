import Vue from 'vue'
import Router from 'vue-router'
import ScrollList from '@/components/ScrollList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScrollList',
      component: ScrollList
    }
  ]
})
