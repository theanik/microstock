import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Product from '@/components/Product'
import Login from '@/components/Login'
import Home from '@/components/Home'
import MyProduct from '@/components/MyProduct'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/product',
      component: Product
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: 'my_product',
      component: MyProduct
    },
  ]
})
