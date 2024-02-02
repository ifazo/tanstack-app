import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";


export default function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
            <Footer />
        </div>
    )
}
