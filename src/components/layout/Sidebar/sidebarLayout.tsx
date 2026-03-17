import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DigitalClock from "../../clock/DigitalClock";
import { authService } from "../../../services/auth.service";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();

            localStorage.removeItem("auth");
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const menuItems = [
        { id: "employees", icon: "👥", label: "Employees", badge: "1,247" },
        { id: "attendance", icon: "📅", label: "Attendance", badge: null },
        { id: "leave", icon: "🏖️", label: "Leave Management", badge: "17" },
        { id: "payroll", icon: "💰", label: "Payroll", badge: "49" },
        { id: "recruitment", icon: "📝", label: "Recruitment", badge: "28" },
        { id: "performance", icon: "⭐", label: "Performance", badge: null },
        { id: "departments", icon: "🏢", label: "Departments", badge: null },
        { id: "reports", icon: "📄", label: "Reports", badge: null },
        { id: "settings", icon: "⚙️", label: "Settings", badge: null },
        { id: "compliance", icon: "🔐", label: "Compliance", badge: "3" },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white text-xl"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 w-72`}
            >
                <div className="h-full flex flex-col">

                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-4 mb-2">
                            <div
                                onClick={() => navigate("/dashboard")}
                                className="flex items-center gap-4 mb-2 cursor-pointer group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-105 transition-transform">
                                    🏢
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors">
                                        HRMS
                                    </h2>
                                    <p className="text-xs text-blue-300 font-semibold">
                                        Human Resource System
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={`/${item.id}`}
                                onClick={() => {
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg text-white"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                <span className="text-2xl">{item.icon}</span>

                                <span className="flex-1 text-left font-semibold text-sm">
                                    {item.label}
                                </span>

                                {item.badge && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Digital Clock */}
                    <div className="p-4 border-t border-white/10">
                        <DigitalClock />
                    </div>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/10">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all duration-200">
                            <span className="text-xl">🚪</span>
                            <span className="flex-1 text-left font-semibold text-sm">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Spacer */}
            <div className="lg:w-72 flex-shrink-0"></div>
        </>
    );
}