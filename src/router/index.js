import Vue from 'vue'
import Router from 'vue-router'
import TreeNode from '@/components/TreeNode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TreeNode',
      component: TreeNode
    }
  ]
})
