import { Route } from "@tanstack/react-router";
import AboutPage from "../pages/AboutPage";
import { rootRoute } from "./rootRoute";
import SignInPage from "../pages/SignInPage";
import HomePage from "../pages/HomePage";

const homeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <HomePage />,
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

const indexRoute = [ homeRoute, aboutRoute, signInRoute ]

export default indexRoute;