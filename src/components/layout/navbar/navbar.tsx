import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "../../icons/icons";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    showSearch?: boolean;
    actionButton?: ReactNode;
}

const Navbar = ({ showSearch = false, actionButton }: NavbarProps) => {
    const [darkMode, setDarkMode] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setOpenProfile(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-#f3f4f6-900 shadow-sm border-b border-gray-200 dark:border-#f3f4f6-800">

            {/* Left Section */}
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">
P-D                </div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-800">
                    p-Desk
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Optional Search */}
                {showSearch && (
                    <div className="relative">
                        <SearchIcon
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="pl-10 pr-4 py-2 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-200 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                )}

                {/* Optional Action Button */}
                {actionButton}

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                >
                    {darkMode ? (
                        <Sun size={18} className="text-yellow-600" />
                    ) : (
                        <Moon size={18} className="text-gray-600 dark:text-gray-600" />
                    )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenProfile(!openProfile);
                        }}
                        className="h-9 w-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-medium cursor-pointer"
                    >
                        AJ
                    </div>

                    {openProfile && (
                        <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">

                                <li
                                    onClick={() => navigate("/profile")}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                                >
                                    <User size={16} />
                                    Profile
                                </li>

                                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

                                <li
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </li>

                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;