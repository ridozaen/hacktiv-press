import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Admin from './views/Admin.vue'
import ArticleForm from './views/ArticleForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        console.log('before enter register route')
        if (localStorage.getItem('curr-token')) {
          next({name: 'admin'})
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        console.log('before enter register route')
        if (localStorage.getItem('curr-token')) {
          next({name: 'admin'})
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        console.log('before enter admin route')
        if (localStorage.getItem('curr-token')) {
          next()
        } else {
          next({name: 'home'})
        }
      }
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: ArticleForm,
      beforeEnter: (to, from, next) => {
        console.log('before enter addArticle route')
        if (localStorage.getItem('curr-token')) {
          next()
        } else {
          next({name: 'home'})
        }
      }
    },
    {
      path: '/editArticle/:id',
      name: 'editArticle',
      component: ArticleForm,
      beforeEnter: (to, from, next) => {
        console.log('before enter edit route')
        if (localStorage.getItem('curr-token')) {
          next()
        } else {
          next({name: 'home'})
        }
      }
    },
    {
      path: '/articles/filter',
      name: 'category',
      component: Home
      // beforeEnter: (to, from, next) => {
      //   console.log('before enter edit route')
      //   if (localStorage.getItem('curr-token')) {
      //     next()
      //   } else {
      //     next({name: 'home'})
      //   }
      // }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
