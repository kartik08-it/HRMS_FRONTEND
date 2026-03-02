import React, { useState } from 'react';
import performanceData from './performanceData.json';

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const {
    performanceSummary,
    appraisalCycle,
    ratingDistribution,
    topPerformers,
    departmentPerformance,
    goalsOverview
  } = performanceData;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-300',
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    };
    return badges[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-xl">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500 text-xl">½</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                    ⭐
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white tracking-tight">Performance Management</h1>
                    <p className="text-yellow-100 text-lg mt-1 font-medium">Employee appraisals & development tracking</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    📊 Avg Rating: {performanceSummary.avgRating}/5
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    🏆 {performanceSummary.topPerformers} Top Performers
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    ⏳ {performanceSummary.pending} Reviews Pending
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg">
                  ➕ Start Review
                </button>
                <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                  📈 Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appraisal Cycle Status */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <div className="text-3xl">🎯</div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">{appraisalCycle.currentCycle}</h2>
                <p className="text-gray-600 font-semibold mt-1">
                  {new Date(appraisalCycle.startDate).toLocaleDateString()} - {new Date(appraisalCycle.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black text-orange-600">{appraisalCycle.progress}%</div>
              <div className="text-sm text-gray-600 font-semibold mt-1">{appraisalCycle.daysRemaining} days remaining</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm font-bold text-gray-600 mb-2">
              <span>Review Progress</span>
              <span>{appraisalCycle.completedReviews} / {appraisalCycle.totalReviews} completed</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${appraisalCycle.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600 font-semibold mb-1">Review Deadline</div>
              <div className="font-bold text-rose-600">{new Date(appraisalCycle.reviewDeadline).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-gray-600 font-semibold mb-1">Status</div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(appraisalCycle.status)}`}>
                {appraisalCycle.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-gray-600 font-semibold mb-1">Completion Rate</div>
              <div className="font-bold text-emerald-600">{performanceSummary.avgCompletionRate}%</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {[
            { label: 'Total Employees', value: performanceSummary.totalEmployees, icon: '👥', color: 'from-blue-500 to-blue-600' },
            { label: 'Under Review', value: performanceSummary.underReview, icon: '📝', color: 'from-purple-500 to-purple-600' },
            { label: 'Completed', value: performanceSummary.completed, icon: '✅', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Pending', value: performanceSummary.pending, icon: '⏳', color: 'from-amber-500 to-amber-600' },
            { label: 'Top Performers', value: performanceSummary.topPerformers, icon: '🏆', color: 'from-yellow-500 to-yellow-600' },
            { label: 'Need Improvement', value: performanceSummary.needsImprovement, icon: '⚠️', color: 'from-rose-500 to-rose-600' },
            { label: 'Avg Rating', value: `${performanceSummary.avgRating}/5`, icon: '⭐', color: 'from-orange-500 to-orange-600' }
          ].map((metric, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="text-3xl font-black text-gray-900">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Rating Distribution</h2>
              <p className="text-gray-600 text-sm mt-0.5">Performance rating breakdown across organization</p>
            </div>
          </div>

          <div className="space-y-4">
            {ratingDistribution.map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-2xl p-6 border border-${item.color}-200`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-black text-gray-900 text-lg mb-1">{item.rating}</div>
                    <div className="text-sm text-gray-600 font-semibold">{item.count} employees ({item.percentage}%)</div>
                  </div>
                  <div className={`text-5xl font-black text-${item.color}-700`}>{item.count}</div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 rounded-full`}
                    style={{ width: `${item.percentage * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'top_performers', label: 'Top Performers', icon: '🏆' },
              { id: 'departments', label: 'Departments', icon: '🏢' },
              { id: 'goals', label: 'Goals', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="product">Product</option>
          </select>
        </div>

        {/* Top Performers Tab */}
        {activeTab === 'top_performers' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl">
                🏆
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Top Performers</h2>
                <p className="text-gray-600 text-sm mt-0.5">{topPerformers.length} outstanding employees</p>
              </div>
            </div>

            <div className="space-y-6">
              {topPerformers.map((emp) => (
                <div key={emp.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl">
                        {emp.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900">{emp.employeeName}</h3>
                        <div className="text-sm text-gray-700 font-semibold">{emp.designation} • {emp.department}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-1">{emp.employeeId} • Manager: {emp.manager}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black text-orange-700 mb-1">{emp.rating}</div>
                      {renderStars(emp.rating)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4 border border-yellow-200">
                      <div className="text-xs text-gray-600 font-semibold mb-1">KPI Score</div>
                      <div className="text-3xl font-black text-blue-700">{emp.kpiScore}%</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-yellow-200">
                      <div className="text-xs text-gray-600 font-semibold mb-1">Goals Achieved</div>
                      <div className="text-3xl font-black text-emerald-700">{emp.goalsAchieved}/{emp.totalGoals}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-yellow-200">
                      <div className="text-xs text-gray-600 font-semibold mb-1">Last Review</div>
                      <div className="text-sm font-bold text-gray-900">{new Date(emp.lastReviewDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">💪 Key Strengths</div>
                    <div className="flex flex-wrap gap-2">
                      {emp.strengths.map((strength, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-gray-700 mb-2">🎯 Key Achievements</div>
                    <ul className="space-y-1">
                      {emp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-800 font-medium flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Department Performance Tab */}
        {activeTab === 'departments' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                🏢
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Department Performance</h2>
                <p className="text-gray-600 text-sm mt-0.5">Team-wise performance metrics</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentPerformance.map((dept, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900">{dept.department}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTrendIcon(dept.trend)}</span>
                      <span className={`text-sm font-bold ${
                        dept.trend === 'up' ? 'text-emerald-600' :
                        dept.trend === 'down' ? 'text-rose-600' :
                        'text-gray-600'
                      }`}>
                        {dept.changePercent > 0 ? '+' : ''}{dept.changePercent}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600">Average Rating</span>
                        <span className="text-2xl font-black text-orange-700">{dept.avgRating}</span>
                      </div>
                      {renderStars(dept.avgRating)}
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                        <div className="text-2xl font-black text-yellow-700">{dept.topPerformers}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-1">Top</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-2xl font-black text-blue-700">{dept.employees}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-1">Total</div>
                      </div>
                      <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
                        <div className="text-2xl font-black text-rose-700">{dept.needsImprovement}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-1">Need Work</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 font-semibold">Goal Completion</span>
                        <span className="font-bold text-gray-900">{dept.goalsCompleted} / {dept.totalGoals}</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                          style={{ width: `${(dept.goalsCompleted / dept.totalGoals) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 font-semibold">KPI Achievement</span>
                        <span className="font-bold text-gray-900">{dept.kpiAchievement}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                          style={{ width: `${dept.kpiAchievement}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Overview Tab */}
        {activeTab === 'goals' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Goals Overview</h2>
                <p className="text-gray-600 text-sm mt-0.5">Organization-wide goal tracking</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: 'Total Goals', value: goalsOverview.totalGoals, color: 'blue' },
                { label: 'Completed', value: goalsOverview.completed, color: 'emerald' },
                { label: 'In Progress', value: goalsOverview.inProgress, color: 'purple' },
                { label: 'Overdue', value: goalsOverview.overdue, color: 'rose' },
                { label: 'Completion Rate', value: `${goalsOverview.completionRate}%`, color: 'cyan' }
              ].map((item, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-2xl p-6 border border-${item.color}-200`}>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">{item.label}</div>
                  <div className={`text-4xl font-black text-${item.color}-700`}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-indigo-900">Overall Completion Rate</span>
                <span className="text-4xl font-black text-indigo-900">{goalsOverview.completionRate}%</span>
              </div>
              <div className="h-4 bg-indigo-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  style={{ width: `${goalsOverview.completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}