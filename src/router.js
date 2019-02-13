import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Preview from './views/Preview.vue'
import BlogHome from './views/BlogHome.vue'
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'blog-home' }
    },
    {
      path: '/blog',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:uid',
      name: 'post',
      component: Post
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }  
})
