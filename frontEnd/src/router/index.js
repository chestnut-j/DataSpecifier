import Vue from 'vue'
import Router from 'vue-router'
import DataSpecifier from '@/components/DataSpecifier'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DataSpecifier',
      component: DataSpecifier
    }
  ]
})
