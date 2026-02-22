import { Outlet } from "react-router-dom";
import { createContext, useState, type ReactNode } from "react";
import Navbar from "../navbar/navbar";

interface NavbarConfig {
    showSearch?: boolean;
    actionButton?: ReactNode;
}

export const NavbarContext = createContext<
    (config: NavbarConfig) => void
>(() => { });

const Layout = () => {
    const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>({});

    return (
        <NavbarContext.Provider value={setNavbarConfig}>
            <div className="min-h-screen bg-gray-100">
                <Navbar
                    showSearch={navbarConfig.showSearch}
                    actionButton={navbarConfig.actionButton}
                />
                <Outlet />
            </div>
        </NavbarContext.Provider>
    );
};

export default Layout;