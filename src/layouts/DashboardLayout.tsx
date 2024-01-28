import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";


export default function DashboardLayout() {
    return (
        <div>
            <Outlet />
            <TanStackRouterDevtools />
        </div>
    )
}
