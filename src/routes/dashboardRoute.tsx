import { Route } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import DashboardPage from "../pages/DashboardPage";

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: () => <DashboardPage />,
});

const dashboardRoute = [ indexRoute ];

export default dashboardRoute;
