import React from 'react';
import dashboardData from './dashboardData.json';
import Sidebar from '../../components/layout/Sidebar/sidebarLayout';

export default function Dashboard() {
  const {
    workforceOverview,
    attendanceSummary,
    leaveManagement,
    payrollOverview,
    recruitmentSnapshot,
    performanceManagement,
    complianceAlerts
  } = dashboardData;

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      rejected: 'bg-rose-100 text-rose-800 border-rose-300',
      active: 'bg-sky-100 text-sky-800 border-sky-300',
      final_round: 'bg-purple-100 text-purple-800 border-purple-300',
      screening: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    };
   'bg-gray-100 text-gray-800 border-gray-300';
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500">½</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
        {/* <Sidebar activePage={''} onPageChange={function (page: string): void {
              throw new Error('Function not implemented.');
          } }/> */}
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Hero Title Section */}
        {/* <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-12 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                🏢
              </div>
              <div>
                <h1 className="text-5xl font-black text-white tracking-tight">HRMS Dashboard</h1>
                <p className="text-blue-100 text-lg mt-1 font-medium">Real-time Workforce Analytics & Management</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                Live Data
              </div>
              <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                Updated 5 mins ago
              </div>
            </div>
          </div>
        </div> */}

        {/* Workforce Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {[
            { icon: '👥', label: 'Total Employees', value: workforceOverview.totalEmployees, trend: workforceOverview.totalEmployeesTrend, color: 'from-blue-500 to-blue-600' },
            { icon: '🆕', label: 'New Hires', value: workforceOverview.newHires, trend: workforceOverview.newHiresTrend, color: 'from-emerald-500 to-emerald-600' },
            { icon: '❌', label: 'Resignations', value: workforceOverview.resignations, trend: workforceOverview.resignationsTrend, color: 'from-rose-500 to-rose-600' },
            { icon: '🏢', label: 'Departments', value: workforceOverview.totalDepartments, trend: workforceOverview.departmentsTrend, color: 'from-purple-500 to-purple-600' },
            { icon: '📍', label: 'Active Employees', value: workforceOverview.activeEmployees, trend: `Inactive: ${workforceOverview.inactiveEmployees}`, color: 'from-teal-500 to-teal-600' },
            { icon: '🕒', label: 'On Leave Today', value: workforceOverview.onLeaveToday, trend: workforceOverview.onLeaveTodayPercentage, color: 'from-amber-500 to-amber-600' }
          ].map((kpi, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${kpi.color}`}></div>
              <div className="text-4xl mb-3">{kpi.icon}</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</div>
              <div className="text-4xl font-black text-gray-900 mb-2">{kpi.value.toLocaleString()}</div>
              <div className="text-xs text-gray-600 font-medium">{kpi.trend}</div>
            </div>
          ))}
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Attendance Summary</h2>
              <p className="text-gray-600 text-sm mt-0.5">Today's workforce status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: '✅ Present', value: attendanceSummary.today.present, percentage: attendanceSummary.today.presentPercentage, color: 'emerald' },
              { label: '❌ Absent', value: attendanceSummary.today.absent, percentage: attendanceSummary.today.absentPercentage, color: 'rose' },
              { label: '⏰ Late Arrivals', value: attendanceSummary.today.lateArrivals, percentage: attendanceSummary.today.lateArrivalsPercentage, color: 'amber' },
              { label: '🏠 Work From Home', value: attendanceSummary.today.workFromHome, percentage: attendanceSummary.today.workFromHomePercentage, color: 'blue' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200">
                <div className="text-sm font-bold text-gray-600 mb-3">{stat.label}</div>
                <div className="text-4xl font-black text-gray-900 mb-3">{stat.value}</div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-full transition-all duration-500`} style={{ width: `${stat.percentage}%` }}></div>
                </div>
                <div className="text-xs text-gray-600 mt-2 font-semibold">{stat.percentage}%</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-sm font-bold text-blue-900 mb-2">📊 Monthly Attendance</div>
              <div className="text-5xl font-black text-blue-900 mb-3">{attendanceSummary.monthlyAttendance}%</div>
              <div className="h-4 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: `${attendanceSummary.monthlyAttendance}%` }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="text-sm font-bold text-purple-900 mb-2">⏳ Overtime Hours</div>
              <div className="text-5xl font-black text-purple-900 mb-1">{attendanceSummary.overtimeHours}</div>
              <div className="text-sm text-purple-700 font-medium">This month</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-6">
            <div className="font-black text-amber-900 mb-4 text-lg flex items-center gap-2">
              <span>⚠️</span> Low Attendance Alert
            </div>
            <div className="space-y-3">
              {attendanceSummary.lowAttendanceEmployees.map((emp, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
                  <span className="font-semibold text-gray-800">{emp.name}</span>
                  <span className="px-4 py-1.5 bg-amber-200 text-amber-900 rounded-full text-sm font-bold">{emp.attendance}% attendance</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Management & Payroll Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Leave Management */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl">
                🏖️
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Leave Management</h2>
                <p className="text-gray-600 text-sm mt-0.5">Requests & approvals</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: '📨 Pending', value: leaveManagement.pendingRequests, color: 'amber' },
                { label: '✅ Approved', value: leaveManagement.approvedThisMonth, color: 'emerald' },
                { label: '❌ Rejected', value: leaveManagement.rejectedThisMonth, color: 'rose' },
                { label: '📆 Avg Balance', value: leaveManagement.avgLeaveBalance, color: 'blue' }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 rounded-2xl p-5 border border-${stat.color}-200`}>
                  <div className={`text-xs font-bold text-${stat.color}-700 mb-2`}>{stat.label}</div>
                  <div className={`text-3xl font-black text-${stat.color}-900`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              {leaveManagement.recentRequests.slice(0, 5).map((req, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{req.employee}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold">{req.type}</span>
                    <span>•</span>
                    <span>{req.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 rounded-2xl p-5">
              <div className="font-black text-rose-900 mb-3 flex items-center gap-2">
                <span>🚨</span> Critical Alerts
              </div>
              {leaveManagement.alerts.map((alert, idx) => (
                <div key={idx} className="text-sm text-rose-800 font-medium py-2 border-b border-rose-200 last:border-0">
                  • {alert}
                </div>
              ))}
            </div>
          </div>

          {/* Payroll Overview */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Payroll Overview</h2>
                <p className="text-gray-600 text-sm mt-0.5">Monthly expenses & processing</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: '💵 Total Expense', value: payrollOverview.totalExpense, color: 'green' },
                { label: '✅ Processed', value: payrollOverview.processed, color: 'blue' },
                { label: '⏳ Pending', value: payrollOverview.pending, color: 'amber' },
                { label: '🧾 Reimbursements', value: payrollOverview.pendingReimbursements, color: 'purple' }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 rounded-2xl p-5 border border-${stat.color}-200`}>
                  <div className={`text-xs font-bold text-${stat.color}-700 mb-2`}>{stat.label}</div>
                  <div className={`text-3xl font-black text-${stat.color}-900`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="font-bold text-gray-900 mb-4 text-lg">💼 Salary Breakdown</div>
              <div className="space-y-3">
                {payrollOverview.salaryBreakdown.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-800">{item.category}</span>
                      <span className="text-lg font-black text-gray-900">{item.amount}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 font-semibold">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-5">
              <div className="font-black text-amber-900 mb-3 flex items-center gap-2">
                <span>⚠️</span> Payroll Alerts
              </div>
              {payrollOverview.alerts.map((alert, idx) => (
                <div key={idx} className="text-sm text-amber-800 font-medium py-2 border-b border-amber-200 last:border-0">
                  • {alert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recruitment & Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recruitment Snapshot */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                📝
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Recruitment</h2>
                <p className="text-gray-600 text-sm mt-0.5">Hiring pipeline status</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: '📌 Open Positions', value: recruitmentSnapshot.openPositions, color: 'indigo' },
                { label: '📝 In Pipeline', value: recruitmentSnapshot.candidatesInPipeline, color: 'blue' },
                { label: '🎯 Interviews Today', value: recruitmentSnapshot.interviewsToday, color: 'purple' },
                { label: '✅ Offers Released', value: recruitmentSnapshot.offersReleased, color: 'emerald' }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 rounded-2xl p-5 border border-${stat.color}-200`}>
                  <div className={`text-xs font-bold text-${stat.color}-700 mb-2`}>{stat.label}</div>
                  <div className={`text-3xl font-black text-${stat.color}-900`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              {recruitmentSnapshot.positions.map((pos, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{pos.title}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(pos.status)}`}>
                      {pos.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold">{pos.department}</span>
                    <span>•</span>
                    <span>{pos.candidates} candidates</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-2xl p-5">
              <div className="font-black text-blue-900 mb-3">📊 Insights</div>
              {recruitmentSnapshot.insights.map((insight, idx) => (
                <div key={idx} className="text-sm text-blue-800 font-medium py-2 border-b border-blue-200 last:border-0">
                  • {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Management */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Performance</h2>
                <p className="text-gray-600 text-sm mt-0.5">Employee evaluations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: '📊 Ongoing Appraisals', value: performanceManagement.ongoingAppraisals, color: 'blue' },
                { label: '⭐ Top Performers', value: performanceManagement.topPerformers, color: 'yellow' },
                { label: '⚠️ Under Review', value: performanceManagement.underReview, color: 'rose' },
                { label: '📈 Avg Rating', value: `${performanceManagement.avgRating}/5`, color: 'green' }
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 rounded-2xl p-5 border border-${stat.color}-200`}>
                  <div className={`text-xs font-bold text-${stat.color}-700 mb-2`}>{stat.label}</div>
                  <div className={`text-3xl font-black text-${stat.color}-900`}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="font-bold text-gray-900 mb-4 text-lg">🏆 Top Performers This Quarter</div>
              <div className="space-y-3">
                {performanceManagement.topPerformersList.map((perf, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{perf.name}</span>
                      {renderStars(perf.rating)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">{perf.department}</span>
                      <span>•</span>
                      <span className="text-yellow-700 font-bold">{perf.rating}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System & Compliance Alerts */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-2xl">
              🔐
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Compliance & System Alerts</h2>
              <p className="text-gray-600 text-sm mt-0.5">Critical notifications & status</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-red-50 border-l-4 border-rose-500 rounded-2xl p-6">
              <div className="font-black text-rose-900 mb-4 flex items-center gap-2">
                <span>📄</span> Expiring Contracts
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-rose-800">Next 30 days</span>
                  <span className="px-3 py-1 bg-rose-200 text-rose-900 rounded-full text-sm font-bold">{complianceAlerts.expiringContracts.next30Days}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-rose-800">Expired</span>
                  <span className="px-3 py-1 bg-rose-300 text-rose-900 rounded-full text-sm font-bold">{complianceAlerts.expiringContracts.expired}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-2xl p-6">
              <div className="font-black text-amber-900 mb-4 flex items-center gap-2">
                <span>🆔</span> Missing Documents
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-amber-800">PAN Card</span>
                  <span className="font-bold text-amber-900">{complianceAlerts.missingDocuments.panCard}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-amber-800">Aadhar Card</span>
                  <span className="font-bold text-amber-900">{complianceAlerts.missingDocuments.aadharCard}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-amber-800">KYC Incomplete</span>
                  <span className="font-bold text-amber-900">{complianceAlerts.missingDocuments.kycIncomplete}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-2xl p-6">
              <div className="font-black text-blue-900 mb-4 flex items-center gap-2">
                <span>📅</span> Probation Ending
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">This month</span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-bold">{complianceAlerts.probationEnding.thisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">Review pending</span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-bold">{complianceAlerts.probationEnding.reviewPending}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-2xl p-6">
              <div className="font-black text-purple-900 mb-4 flex items-center gap-2">
                <span>📢</span> Policy Updates
              </div>
              <div className="text-5xl font-black text-purple-900 mb-2">{complianceAlerts.policyUpdates.new}</div>
              <div className="text-sm text-purple-700 font-medium">New policies require acknowledgment</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-l-4 border-indigo-500 rounded-2xl p-6">
              <div className="font-black text-indigo-900 mb-4 flex items-center gap-2">
                <span>🔐</span> User Roles
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-indigo-800">Admin</span>
                  <span className="font-bold text-indigo-900">{complianceAlerts.userRoles.admin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-indigo-800">Manager</span>
                  <span className="font-bold text-indigo-900">{complianceAlerts.userRoles.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-indigo-800">Employee</span>
                  <span className="font-bold text-indigo-900">{complianceAlerts.userRoles.employee}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-2xl p-6">
              <div className="font-black text-emerald-900 mb-4 flex items-center gap-2">
                <span>🗃️</span> Data Backup
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-2xl font-black text-emerald-900 uppercase">{complianceAlerts.dataBackup.status}</span>
              </div>
              <div className="text-sm text-emerald-700 font-medium">Last backup: {complianceAlerts.dataBackup.lastBackup}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}