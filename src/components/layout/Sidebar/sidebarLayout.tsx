import React, { useState } from 'react';

interface SidebarProps {
    activePage: string;
    onPageChange: (page: string) => void;
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
        { id: 'employees', icon: '👥', label: 'Employees', badge: '1,247' },
        { id: 'attendance', icon: '📅', label: 'Attendance', badge: null },
        { id: 'leave', icon: '🏖️', label: 'Leave Management', badge: '17' },
        { id: 'payroll', icon: '💰', label: 'Payroll', badge: '49' },
        { id: 'recruitment', icon: '📝', label: 'Recruitment', badge: '28' },
        { id: 'performance', icon: '⭐', label: 'Performance', badge: null },
        { id: 'departments', icon: '🏢', label: 'Departments', badge: null },
        { id: 'reports', icon: '📄', label: 'Reports', badge: null },
        { id: 'settings', icon: '⚙️', label: 'Settings', badge: null },
        { id: 'compliance', icon: '🔐', label: 'Compliance', badge: '3' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white text-xl hover:scale-105 transition-transform"
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 w-72`}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

                <div className="relative h-full flex flex-col">
                    {/* Logo Section */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg transform hover:scale-105 transition-transform">
                                🏢
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">HRMS</h2>
                                <p className="text-xs text-blue-300 font-semibold">Human Resource System</p>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mt-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    AU
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">Admin User</div>
                                    <div className="text-xs text-blue-300 truncate">admin@company.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onPageChange?.(item.id);
                                    if (window.innerWidth < 1024) setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activePage === item.id
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 text-white'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className={`text-2xl transition-transform group-hover:scale-110 ${activePage === item.id ? 'scale-110' : ''
                                    }`}>
                                    {item.icon}
                                </span>
                                <span className="flex-1 text-left font-semibold text-sm">
                                    {item.label}
                                </span>
                                {item.badge && (
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${activePage === item.id
                                        ? 'bg-white text-blue-600'
                                        : 'bg-blue-500/20 text-blue-300'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Quick Stats */}
                    <div className="p-4 space-y-3 border-t border-white/10">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">System Status</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            </div>
                            <div className="text-2xl font-black text-white mb-1">Online</div>
                            <div className="text-xs text-emerald-300 font-medium">All systems operational</div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                            <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">Last Sync</div>
                            <div className="text-sm font-bold text-white">2 minutes ago</div>
                            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-white/10">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 transition-all duration-200 group">
                            <span className="text-xl transition-transform group-hover:scale-110">🚪</span>
                            <span className="flex-1 text-left font-semibold text-sm">Logout</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Spacer for main content */}
            <div className="lg:w-72 flex-shrink-0"></div>
        </>
    );
}