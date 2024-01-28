import { Route } from "@tanstack/react-router";
import AboutPage from "../pages/AboutPage";
import { rootRoute } from "./rootRoute";
import SignInPage from "../pages/SignInPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductPage from "../pages/ProductPage";
import SignUpPage from "../pages/SignUpPage";
import ErrorPage from "../pages/ErrorPage";

const homeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <HomePage />,
})

const productsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: () => <ProductsPage />,
})

const productRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/products/$postId',
    component: () => <ProductPage />,
})

const categoriesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/categories',
    component: () => <CategoriesPage />,
})

const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <AboutPage />,
})

const signInRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/sign-in',
    component: () => <SignInPage />,
})

const signUpRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/sign-up',
    component: () => <SignUpPage />,
})

const errorRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '*',
    component: () => <ErrorPage />,
})

const indexRoute = [ homeRoute, productsRoute, productRoute, categoriesRoute, aboutRoute, signInRoute, signUpRoute, errorRoute]

export default indexRoute;