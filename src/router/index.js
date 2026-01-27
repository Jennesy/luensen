import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Clinics from '../views/Clinics.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'root',
		component: Home,
	},
	{
		path: '/clinics',
		redirect: '/clinics/lkdiang',
	},
	{
		path: '/clinics/:branch',
		name: 'clinics',
		component: Clinics,
	},
	{
		path: '/team',
		name: 'team',
		component: () => import('@/views/Team.vue'),
	},
	{
		path: '/services',
		name: 'services',
		component: () => import('@/views/Services.vue'),
	},
	{
		path: '/learningResources',
		name: 'learning-resources',
		component: () => import('@/views/LearningResources.vue'),
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/About.vue'),
	},
	{
		path: '/*',
		name: 'not-found',
		component: () => import('@/views/NotFound.vue'),
	},
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'active',
	routes,
})

export default router
