import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SetPage from '../views/Set.vue'
import SetView from '../views/SetView.vue'
import CardView from '../views/CardView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/set',
        name: 'Set',
        component: SetPage
    },
    {
        path: '/set/:code',
        name: 'SetView',
        component: SetView
    },
    {
        path: '/card/:name',
        name: 'CardView',
        component: CardView
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
