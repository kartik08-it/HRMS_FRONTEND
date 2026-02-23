import React, { useState } from 'react';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('today'); // today, weekly, monthly
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock data
  const attendanceData = {
    summary: {
      totalEmployees: 1247,
      present: 1089,
      absent: 41,
      late: 28,
      workFromHome: 55,
      onLeave: 34,
      halfDay: 12
    },
    departments: [
      { name: 'Engineering', present: 298, absent: 12, late: 8, total: 318 },
      { name: 'Sales', present: 142, absent: 8, late: 4, total: 154 },
      { name: 'Marketing', present: 78, absent: 5, late: 3, total: 86 },
      { name: 'HR', present: 45, absent: 2, late: 1, total: 48 },
      { name: 'Finance', present: 67, absent: 3, late: 2, total: 72 },
      { name: 'Operations', present: 189, absent: 6, late: 5, total: 200 }
    ],
    recentActivity: [
      { id: 1, employee: 'John Doe', action: 'Check In', time: '09:02 AM', status: 'late', department: 'Engineering' },
      { id: 2, employee: 'Sarah Williams', action: 'Check In', time: '08:58 AM', status: 'on-time', department: 'Sales' },
      { id: 3, employee: 'Mike Johnson', action: 'Check Out', time: '06:15 PM', status: 'on-time', department: 'Marketing' },
      { id: 4, employee: 'Emily Davis', action: 'Check In', time: '09:15 AM', status: 'late', department: 'Finance' },
      { id: 5, employee: 'Robert Brown', action: 'Check In', time: '08:45 AM', status: 'on-time', department: 'Engineering' },
      { id: 6, employee: 'Lisa Anderson', action: 'Check Out', time: '05:45 PM', status: 'on-time', department: 'HR' },
      { id: 7, employee: 'David Lee', action: 'Check In', time: '10:30 AM', status: 'late', department: 'Operations' },
      { id: 8, employee: 'Maria Garcia', action: 'Check In', time: '08:30 AM', status: 'on-time', department: 'Sales' }
    ],
    lateArrivals: [
      { name: 'John Doe', department: 'Engineering', checkIn: '09:02 AM', delay: '2 mins' },
      { name: 'Emily Davis', department: 'Finance', checkIn: '09:15 AM', delay: '15 mins' },
      { name: 'David Lee', department: 'Operations', checkIn: '10:30 AM', delay: '1.5 hrs' },
      { name: 'Alex Thompson', department: 'Marketing', checkIn: '09:45 AM', delay: '45 mins' }
    ],
    absentees: [
      { name: 'Michael Chen', department: 'Engineering', reason: 'Sick Leave', approved: true },
      { name: 'Sophie Anderson', department: 'Sales', reason: 'Personal Leave', approved: true },
      { name: 'James Wilson', department: 'Marketing', reason: 'Unplanned', approved: false },
      { name: 'Emma Taylor', department: 'Finance', reason: 'Medical Emergency', approved: true },
      { name: 'Oliver Martin', department: 'Operations', reason: 'Unplanned', approved: false }
    ],
    weeklyTrend: [
      { day: 'Mon', present: 1145, absent: 38, late: 32 },
      { day: 'Tue', present: 1167, absent: 35, late: 25 },
      { day: 'Wed', present: 1089, absent: 41, late: 28 },
      { day: 'Thu', present: 1134, absent: 42, late: 30 },
      { day: 'Fri', present: 1098, absent: 48, late: 35 }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'on-time': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'late': 'bg-amber-100 text-amber-800 border-amber-300',
      'absent': 'bg-rose-100 text-rose-800 border-rose-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const calculatePercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                    📅
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white tracking-tight">Attendance</h1>
                    <p className="text-blue-100 text-lg mt-1 font-medium">Real-time tracking & analytics</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    📍 Live Status
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105">
                  📥 Download Report
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                  📧 Send Summary
                </button>
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:bg-emerald-600 transition-all">
                  ➕ Mark Attendance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Selector & Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {['today', 'weekly', 'monthly'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {[
            { label: 'Total', value: attendanceData.summary.totalEmployees, icon: '👥', color: 'from-blue-500 to-blue-600' },
            { label: 'Present', value: attendanceData.summary.present, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Absent', value: attendanceData.summary.absent, icon: '❌', color: 'from-rose-500 to-rose-600' },
            { label: 'Late', value: attendanceData.summary.late, icon: '⏰', color: 'from-amber-500 to-amber-600' },
            { label: 'WFH', value: attendanceData.summary.workFromHome, icon: '🏠', color: 'from-cyan-500 to-cyan-600' },
            { label: 'On Leave', value: attendanceData.summary.onLeave, icon: '🏖️', color: 'from-purple-500 to-purple-600' },
            { label: 'Half Day', value: attendanceData.summary.halfDay, icon: '⏱️', color: 'from-indigo-500 to-indigo-600' }
          ].map((stat, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${stat.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600 mt-1 font-semibold">
                {calculatePercentage(stat.value, attendanceData.summary.totalEmployees)}%
              </div>
            </div>
          ))}
        </div>

        {/* Department-wise Attendance */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
              🏢
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Department-wise Breakdown</h2>
              <p className="text-gray-600 text-sm mt-0.5">Attendance status by department</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceData.departments.map((dept, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900">{dept.name}</h3>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    {dept.total} total
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">✅ Present</span>
                    <span className="text-lg font-black text-emerald-600">{dept.present}</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                      style={{ width: `${calculatePercentage(dept.present, dept.total)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">❌ Absent: <span className="font-bold text-rose-600">{dept.absent}</span></span>
                    <span className="text-gray-600">⏰ Late: <span className="font-bold text-amber-600">{dept.late}</span></span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="text-xs text-gray-600 font-semibold">
                    Attendance Rate: <span className="text-lg font-black text-gray-900">{calculatePercentage(dept.present, dept.total)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Weekly Attendance Trend</h2>
              <p className="text-gray-600 text-sm mt-0.5">Last 5 working days</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {attendanceData.weeklyTrend.map((day, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-sm font-bold text-blue-900 mb-2">{day.day}</div>
                  <div className="text-4xl font-black text-blue-900">{day.present}</div>
                  <div className="text-xs text-blue-700 font-semibold mt-1">Present</div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Absent</span>
                    <span className="px-2 py-0.5 bg-rose-200 text-rose-800 rounded-full font-bold">{day.absent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Late</span>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full font-bold">{day.late}</span>
                  </div>
                </div>

                <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${calculatePercentage(day.present, attendanceData.summary.totalEmployees)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Late Arrivals & Absentees Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Late Arrivals */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl">
                ⏰
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Late Arrivals Today</h2>
                <p className="text-gray-600 text-sm mt-0.5">{attendanceData.summary.late} employees</p>
              </div>
            </div>

            <div className="space-y-3">
              {attendanceData.lateArrivals.map((person, idx) => (
                <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-black text-gray-900 text-lg">{person.name}</div>
                      <div className="text-sm text-gray-600 font-semibold">{person.department}</div>
                    </div>
                    <div className="px-4 py-2 bg-amber-200 text-amber-900 rounded-xl font-bold text-sm">
                      ⏰ {person.delay} late
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-800">
                    <span className="font-semibold">Check-in:</span>
                    <span className="font-bold">{person.checkIn}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
              View All Late Arrivals →
            </button>
          </div>

          {/* Absentees */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                ❌
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Absentees Today</h2>
                <p className="text-gray-600 text-sm mt-0.5">{attendanceData.summary.absent} employees</p>
              </div>
            </div>

            <div className="space-y-3">
              {attendanceData.absentees.map((person, idx) => (
                <div key={idx} className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-5 border border-rose-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-black text-gray-900 text-lg">{person.name}</div>
                      <div className="text-sm text-gray-600 font-semibold">{person.department}</div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-bold text-sm ${
                      person.approved 
                        ? 'bg-emerald-200 text-emerald-900' 
                        : 'bg-rose-300 text-rose-900'
                    }`}>
                      {person.approved ? '✓ Approved' : '⚠ Unplanned'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-rose-800">
                    <span className="font-semibold">Reason:</span>
                    <span className="font-bold">{person.reason}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
              View All Absentees →
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                🔄
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Live Activity Feed</h2>
                <p className="text-gray-600 text-sm mt-0.5">Real-time check-in/check-out updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-bold text-emerald-600">LIVE</span>
            </div>
          </div>

          <div className="space-y-3">
            {attendanceData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {activity.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-lg">{activity.employee}</div>
                    <div className="text-sm text-gray-600 font-semibold">{activity.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{activity.action}</div>
                    <div className="text-xs text-gray-600 font-semibold">{activity.time}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(activity.status)}`}>
                    {activity.status === 'on-time' ? '✓ On Time' : '⚠ Late'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all text-lg">
            View Complete Activity Log →
          </button>
        </div>

      </div>
    </div>
  );
}