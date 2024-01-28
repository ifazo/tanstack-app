import { RootRoute, Router } from "@tanstack/react-router";
import indexRoute from "./indexRoute";
import RootLayout from "../layouts/RootLayout";

export const rootRoute = new RootRoute({
    component: () => <RootLayout />,
})

const routeTree = rootRoute.addChildren([ ...indexRoute ])

const router = new Router({ routeTree })

export default router;

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}