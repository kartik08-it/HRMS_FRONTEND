import { Outlet } from "react-router-dom";
import { createContext, type ReactNode } from "react";
import Sidebar from "../Sidebar/sidebarLayout";

interface NavbarConfig {
    showSearch?: boolean;
    actionButton?: ReactNode;
}

interface SidebarConfig {
    collapsed?: boolean;
    activePage?: string;
}

export const NavbarContext = createContext<
    (config: NavbarConfig) => void
>(() => { });

export const SidebarContext = createContext<
    (config: SidebarConfig) => void
>(() => { });

const Layout = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;