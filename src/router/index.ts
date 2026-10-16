import { createRouter, createWebHistory } from "@ionic/vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "login"
	},
	{
		name: "Login",
		path: "/login",
		component: () => import("../views/loginPage.vue"),
		meta: {
			skipLogin: true
		}
	},
	{
		name: "Register",
		path: "/register",
		component: () => import("../views/register.vue"),
		meta: {
			skipLogin: true
		}
	},
	{
		name: "Password Change",
		path: "/password-change",
		component: () => import("../views/zmenaHesla.vue")
	},
	{
		name: "Forgot Password",
		path: "/forgot-password",
		component: () => import("../views/forgot.vue")
	},
	{
		name: "Reset Password",
		path: "/reset-password",
		component: () => import("../views/reset.vue")
	},
	{
		path: "/",
		component: () => import("@/layout/default.vue"),
		meta: {
			auth: true
		},
		children: [
			{
				name: "Search",
				path: "/search",
				component: () => import("../views/SearchPage.vue")
			},
			{
				name: "Home",
				path: "/home",
				component: () => import("../views/MainPage.vue")
			},
			{
				name: "Settings",
				path: "/settings",
				component: () => import("../views/settingPage.vue")
			},
			{
				name: "Favorites",
				path: "/favorites",
				component: () => import("../views/FavoritesPage.vue")
			},
			{
				name: "Player",
				path: "/player",
				component: () => import("../views/Player.vue")
			},
			{
				name: "PlayLists",
				path: "/playlists",
				component: () => import("../views/PlayListsPage.vue")
			},
			{
				name: "PlayList",
				path: "/playlist",
				component: () => import("../views/PlayListPage.vue")
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// router.beforeEach(
// 	async (
// 		to: RouteLocationNormalized,
// 		_from: RouteLocationNormalized,
// 		next: NavigationGuardNext
// 	) => {
// 		/**
// 		 * Loads if the user is loggeed in from the capacitor store
// 		 */
// 		const isLoggedIn = await store.isLoggedIn()

// 		if (to.meta.auth && !isLoggedIn) {
// 			return next({ name: "Login" })
// 		} else if (to.meta.skipLogin && isLoggedIn) {
// 			return next({ name: "Home" })
// 		}
// 		return next()
// 	}
// )

export default router
