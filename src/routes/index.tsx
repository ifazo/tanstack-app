import { NotFoundRoute, createRootRoute, createRoute } from '@tanstack/react-router'
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
import CartPage from '../pages/CartPage'
import CheackoutPage from '../pages/CheackoutPage'
import NotFoundPage from '../pages/NotFoundPage'

const rootRoute = createRootRoute()

const layoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'layout',
    path: '',
    component: RootLayout,
})

const dashboardLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
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
    getParentRoute: () => productsRoute,
    path: '/$productId',
    component: ProductPage,
})

const categoriesRoute = createRoute({
    getParentRoute: () => layoutRoute,
    path: '/categories',
    component: CategoriesPage,
})

const categoryRoute = createRoute({
    getParentRoute: () => categoriesRoute,
    path: '/$category',
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

const cartRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/cart',
    component: CartPage,
})

const checkoutRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/checkout',
    component: CheackoutPage,
})

const notFoundRoute = new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: () => <NotFoundPage />,
})

export const routeTree = rootRoute.addChildren([
    homeRoute,
    productsRoute,
    productRoute,
    categoriesRoute,
    categoryRoute,
    signInRoute,
    signUpRoute,
    cartRoute,
    checkoutRoute,
    layoutRoute.addChildren([dashboardLayoutRoute]),
])

const router = createRouter({
    routeTree,
    notFoundRoute,
})

export default router

declare module '@tanstack/react-router' {
    interface Register {
        // This infers the type of our router and registers it across your entire project
        router: typeof router
    }
}