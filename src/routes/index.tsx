import { createRootRoute, createRoute } from '@tanstack/react-router'
import HomePage from '../pages/HomePage'
import { createRouter } from '@tanstack/react-router'
import RootLayout from '../layouts/RootLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProductsPage from '../pages/ProductsPage'
import ProductPage from '../pages/ProductPage'
import CategoriesPage from '../pages/CategoriesPage'
import CategoryPage from '../pages/CategoryPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import CheackoutPage from '../pages/CheackoutPage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/DashboardPage'
import Wishlist from '../components/Wishlist'
import Cart from '../components/Cart'

const rootRoute = createRootRoute()

const layoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'layout',
    path: '',
    component: RootLayout,
})

const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'dashboard-layout',
    path: '',
    component: DashboardLayout,
})

const homeRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/',
    component: HomePage,
})

const productsRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/products',
    component: ProductsPage,
})

const productRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/products/$productId',
    component: ProductPage,
})

const categoriesRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/categories',
    component: CategoriesPage,
})

const categoryRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/categories/$category',
    component: CategoryPage,
})

const signInRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/sign-in',
    component: SignInPage,
})

const signUpRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/sign-up',
    component: SignUpPage,
})

const dashboardRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/dashboard',
    component: DashboardPage,
})

const wishlistRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/dashboard/wishlist',
    component: Wishlist
})

const cartRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/dashboard/cart',
    component: Cart,
})

const checkoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/dashboard/checkout',
    component: CheackoutPage,
})

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFoundPage
})

export const routeTree = rootRoute.addChildren([
    homeRoute,
    productsRoute,
    productRoute,
    categoriesRoute,
    categoryRoute,
    signInRoute,
    signUpRoute,
    dashboardRoute,
    wishlistRoute,
    cartRoute,
    checkoutRoute,
    layoutRoute.addChildren([dashboardLayoutRoute]),
    notFoundRoute,
])

const router = createRouter({
    routeTree,
})

export default router

declare module '@tanstack/react-router' {
    interface Register {
        // This infers the type of our router and registers it across your entire project
        router: typeof router
    }
}