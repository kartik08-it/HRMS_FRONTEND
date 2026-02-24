import React, { useState } from 'react';

export default function LeaveManagementPage() {
    const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected, all
    const [viewMode, setViewMode] = useState('list'); // list, calendar
    const [selectedLeaveType, setSelectedLeaveType] = useState('all');
    const [showApplyModal, setShowApplyModal] = useState(false);

    // Mock data
    const leaveData = {
        summary: {
            totalRequests: 167,
            pending: 17,
            approved: 142,
            rejected: 8,
            availableLeave: 12,
            usedLeave: 8,
            totalLeave: 20
        },
        leaveTypes: [
            { type: 'Casual Leave', available: 5, used: 3, total: 8, color: 'blue' },
            { type: 'Sick Leave', available: 4, used: 2, total: 6, color: 'rose' },
            { type: 'Earned Leave', available: 3, used: 3, total: 6, color: 'emerald' },
            { type: 'Vacation', available: 0, used: 0, total: 0, color: 'purple' }
        ],
        pendingRequests: [
            {
                id: 1,
                employee: 'Sarah Williams',
                employeeId: 'EMP001',
                department: 'Engineering',
                leaveType: 'Sick Leave',
                startDate: '2024-02-28',
                endDate: '2024-03-01',
                duration: '2 days',
                reason: 'Medical appointment and recovery',
                appliedOn: '2024-02-24',
                status: 'pending',
                priority: 'high'
            },
            {
                id: 2,
                employee: 'Emily Davis',
                employeeId: 'EMP034',
                department: 'Finance',
                leaveType: 'Personal',
                startDate: '2024-03-05',
                endDate: '2024-03-05',
                duration: '1 day',
                reason: 'Personal work',
                appliedOn: '2024-02-23',
                status: 'pending',
                priority: 'normal'
            },
            {
                id: 3,
                employee: 'Michael Chen',
                employeeId: 'EMP089',
                department: 'Sales',
                leaveType: 'Casual Leave',
                startDate: '2024-03-10',
                endDate: '2024-03-12',
                duration: '3 days',
                reason: 'Family function',
                appliedOn: '2024-02-24',
                status: 'pending',
                priority: 'normal'
            },
            {
                id: 4,
                employee: 'Alex Thompson',
                employeeId: 'EMP056',
                department: 'Marketing',
                leaveType: 'Vacation',
                startDate: '2024-03-15',
                endDate: '2024-03-20',
                duration: '6 days',
                reason: 'Vacation trip',
                appliedOn: '2024-02-22',
                status: 'pending',
                priority: 'low'
            }
        ],
        approvedRequests: [
            {
                id: 5,
                employee: 'Robert Brown',
                employeeId: 'EMP023',
                department: 'Engineering',
                leaveType: 'Vacation',
                startDate: '2024-02-26',
                endDate: '2024-03-01',
                duration: '5 days',
                reason: 'Family vacation',
                appliedOn: '2024-02-15',
                approvedOn: '2024-02-16',
                approvedBy: 'John Manager',
                status: 'approved'
            },
            {
                id: 6,
                employee: 'Lisa Anderson',
                employeeId: 'EMP067',
                department: 'HR',
                leaveType: 'Sick Leave',
                startDate: '2024-02-23',
                endDate: '2024-02-23',
                duration: '1 day',
                reason: 'Fever and cold',
                appliedOn: '2024-02-22',
                approvedOn: '2024-02-22',
                approvedBy: 'Sarah HR Head',
                status: 'approved'
            }
        ],
        rejectedRequests: [
            {
                id: 7,
                employee: 'David Lee',
                employeeId: 'EMP098',
                department: 'Operations',
                leaveType: 'Casual Leave',
                startDate: '2024-03-01',
                endDate: '2024-03-03',
                duration: '3 days',
                reason: 'Personal work',
                appliedOn: '2024-02-20',
                rejectedOn: '2024-02-21',
                rejectedBy: 'Mark Director',
                rejectionReason: 'Critical project deadline',
                status: 'rejected'
            }
        ],
        upcomingLeaves: [
            {
                date: '2024-02-26',
                count: 8,
                employees: ['Robert Brown', 'Maria Garcia', '6 others']
            },
            {
                date: '2024-02-27',
                count: 12,
                employees: ['Sarah Williams', 'Alex Thompson', '10 others']
            },
            {
                date: '2024-02-28',
                count: 15,
                employees: ['Emily Davis', 'Michael Chen', '13 others']
            }
        ],
        criticalAlerts: [
            'Marketing team has 5 employees on leave next week',
            '3 leaves overlap with Q1 deadline',
            'Engineering team below minimum staffing on March 5th'
        ],
        leaveBalance: {
            thisMonth: 34,
            lastMonth: 28,
            thisYear: 342,
            avgPerEmployee: 12.5
        }
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            pending: 'bg-amber-100 text-amber-800 border-amber-300',
            approved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            rejected: 'bg-rose-100 text-rose-800 border-rose-300'
        };
        return badges[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const getPriorityBadge = (priority: string) => {
        const badges: Record<string, string> = {
            high: 'bg-rose-500 text-white',
            normal: 'bg-blue-500 text-white',
            low: 'bg-gray-400 text-white'
        };
        return badges[priority] || 'bg-gray-400 text-white';
    };

    const getLeaveRequests = () => {
        switch (activeTab) {
            case 'pending':
                return leaveData.pendingRequests;
            case 'approved':
                return leaveData.approvedRequests;
            case 'rejected':
                return leaveData.rejectedRequests;
            case 'all':
                return [...leaveData.pendingRequests, ...leaveData.approvedRequests, ...leaveData.rejectedRequests];
            default:
                return leaveData.pendingRequests;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
            <div className="max-w-[1800px] mx-auto space-y-8">

                {/* Page Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-10 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    <div className="relative">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                                        🏖️
                                    </div>
                                    <div>
                                        <h1 className="text-5xl font-black text-white tracking-tight">Leave Management</h1>
                                        <p className="text-cyan-100 text-lg mt-1 font-medium">Request, approve & track employee leaves</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                                        📊 {leaveData.summary.totalRequests} Total Requests
                                    </div>
                                    <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                                        ⏳ {leaveData.summary.pending} Pending Approval
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap gap-3">
                                {/* <button
                                    onClick={() => setShowApplyModal(true)}
                                    className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg"
                                >
                                    ➕ Apply for Leave
                                </button> */}
                                <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                                    📥 Export Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Balance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Available Leave</div>
                            <div className="text-3xl">📅</div>
                        </div>
                        <div className="text-5xl font-black text-emerald-600 mb-2">{leaveData.summary.availableLeave}</div>
                        <div className="text-sm text-gray-600 font-semibold">Out of {leaveData.summary.totalLeave} days</div>
                        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                                style={{ width: `${(leaveData.summary.availableLeave / leaveData.summary.totalLeave) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Used Leave</div>
                            <div className="text-3xl">✅</div>
                        </div>
                        <div className="text-5xl font-black text-blue-600 mb-2">{leaveData.summary.usedLeave}</div>
                        <div className="text-sm text-gray-600 font-semibold">This year</div>
                        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                style={{ width: `${(leaveData.summary.usedLeave / leaveData.summary.totalLeave) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Pending</div>
                            <div className="text-3xl">⏳</div>
                        </div>
                        <div className="text-5xl font-black text-amber-600 mb-2">{leaveData.summary.pending}</div>
                        <div className="text-sm text-gray-600 font-semibold">Awaiting approval</div>
                        <button className="mt-4 w-full px-4 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors text-sm">
                            Review Now →
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Approved</div>
                            <div className="text-3xl">🎉</div>
                        </div>
                        <div className="text-5xl font-black text-emerald-600 mb-2">{leaveData.summary.approved}</div>
                        <div className="text-sm text-gray-600 font-semibold">This year</div>
                        <div className="text-xs text-emerald-700 mt-4 font-bold">
                            {leaveData.summary.rejected} rejected
                        </div>
                    </div>
                </div>

                {/* Leave Type Breakdown */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                            📊
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Leave Type Breakdown</h2>
                            <p className="text-gray-600 text-sm mt-0.5">Your leave balance by category</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {leaveData.leaveTypes.map((leave, idx) => (
                            <div key={idx} className={`bg-gradient-to-br from-${leave.color}-50 to-${leave.color}-100/50 rounded-2xl p-6 border border-${leave.color}-200`}>
                                <div className="font-bold text-gray-900 mb-4 text-lg">{leave.type}</div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-700">Available</span>
                                        <span className={`text-2xl font-black text-${leave.color}-700`}>{leave.available}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-700">Used</span>
                                        <span className="text-lg font-bold text-gray-600">{leave.used}</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r from-${leave.color}-400 to-${leave.color}-600 rounded-full`}
                                            style={{ width: `${leave.total > 0 ? (leave.used / leave.total) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-600 font-bold">
                                        Total: {leave.total} days
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tab Navigation & View Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        {[
                            { id: 'pending', label: 'Pending', count: leaveData.summary.pending },
                            { id: 'approved', label: 'Approved', count: leaveData.summary.approved },
                            { id: 'rejected', label: 'Rejected', count: leaveData.summary.rejected },
                            { id: 'all', label: 'All', count: leaveData.summary.totalRequests }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white/30' : 'bg-gray-200'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <select
                            value={selectedLeaveType}
                            onChange={(e) => setSelectedLeaveType(e.target.value)}
                            className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="all">All Leave Types</option>
                            <option value="casual">Casual Leave</option>
                            <option value="sick">Sick Leave</option>
                            <option value="earned">Earned Leave</option>
                            <option value="vacation">Vacation</option>
                        </select>

                        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-lg font-bold transition-all ${viewMode === 'list'
                                        ? 'bg-cyan-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                📋
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                className={`p-3 rounded-lg font-bold transition-all ${viewMode === 'calendar'
                                        ? 'bg-cyan-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                📅
                            </button>
                        </div>
                    </div>
                </div>

                {/* Leave Requests List */}
                {viewMode === 'list' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
                                    📝
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900">
                                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Requests
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-0.5">
                                        {getLeaveRequests().length} {activeTab === 'all' ? 'total' : activeTab} leave requests
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {getLeaveRequests().map((request) => (
                                <div
                                    key={request.id}
                                    className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                        {/* Employee Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                                {request.employee.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="font-black text-gray-900 text-lg">{request.employee}</div>
                                                    {'priority' in request && request.priority && (
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPriorityBadge(request.priority)}`}>
                                                            {request.priority.toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-600 font-semibold">
                                                    {request.employeeId} • {request.department}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Leave Details */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Leave Type</div>
                                                <div className="text-sm font-bold text-gray-900">{request.leaveType}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Duration</div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                                <div className="text-xs text-cyan-600 font-semibold">{request.duration}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Applied On</div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    {new Date(request.appliedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Actions */}
                                        <div className="flex items-center gap-3">
                                            <span className={`px-4 py-2 rounded-xl font-bold text-sm border ${getStatusBadge(request.status)}`}>
                                                {request.status.toUpperCase()}
                                            </span>

                                            {request.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                                        ✓
                                                    </button>
                                                    <button className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                                                        ✕
                                                    </button>
                                                </div>
                                            )}

                                            <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                                👁️
                                            </button>
                                        </div>
                                    </div>

                                    {/* Reason */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-xs font-bold text-gray-500 uppercase mb-2">Reason</div>
                                        <div className="text-sm text-gray-700 font-medium">{request.reason}</div>

                                        {'approvedBy' in request && request.approvedBy && (
                                            <div className="text-xs text-emerald-700 font-semibold mt-2">
                                                ✓ Approved by {request.approvedBy} on {new Date(request.approvedOn).toLocaleDateString()}
                                            </div>
                                        )}

                                        {'rejectedBy' in request && request.rejectedBy && (
                                            <div className="text-xs text-rose-700 font-semibold mt-2">
                                                ✕ Rejected by {request.rejectedBy} on {new Date(request.rejectedOn).toLocaleDateString()}
                                                {'rejectionReason' in request && request.rejectionReason && ` • Reason: ${request.rejectionReason}`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {getLeaveRequests().length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📭</div>
                                <div className="text-2xl font-bold text-gray-400">No {activeTab} requests found</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Calendar View */}
                {viewMode === 'calendar' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                                📅
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Leave Calendar</h2>
                                <p className="text-gray-600 text-sm mt-0.5">Upcoming leaves overview</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {leaveData.upcomingLeaves.map((leave, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-black text-purple-900 mb-1">
                                                {new Date(leave.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                            </div>
                                            <div className="text-sm text-purple-700 font-semibold">
                                                {leave.employees.join(', ')}
                                            </div>
                                        </div>
                                        <div className="px-6 py-3 bg-purple-500 text-white rounded-xl font-black text-2xl">
                                            {leave.count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <div className="text-6xl mb-4">🗓️</div>
                            <div className="text-gray-500 font-semibold">Full calendar view coming soon</div>
                        </div>
                    </div>
                )}

                {/* Critical Alerts */}
                {leaveData.criticalAlerts.length > 0 && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                                🚨
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Critical Alerts</h2>
                                <p className="text-gray-600 text-sm mt-0.5">Issues requiring immediate attention</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {leaveData.criticalAlerts.map((alert, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 rounded-xl p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">⚠️</div>
                                        <div className="text-sm font-bold text-rose-900">{alert}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Apply Leave Modal (Simple Overlay) */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-black text-gray-900">Apply for Leave</h2>
                            <button
                                onClick={() => setShowApplyModal(false)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Leave Type</label>
                                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                    <option>Casual Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Earned Leave</option>
                                    <option>Vacation</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                                    <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                                    <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Reason</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Please provide a reason for your leave..."
                                ></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}