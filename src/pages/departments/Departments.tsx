import { useState } from 'react';
import departmentsData from './departmentsData.json';

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('grid');

  const {
    departmentsSummary,
    departments,
    budgetAllocation,
    headcountTrends
  } = departmentsData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const selectedDepartment = selectedDept 
    ? departments.find(d => d.id === selectedDept)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                    🏢
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white tracking-tight">Departments</h1>
                    <p className="text-purple-100 text-lg mt-1 font-medium">Organizational structure & team management</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    🏢 {departmentsSummary.totalDepartments} Departments
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    👥 {departmentsSummary.totalEmployees} Employees
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    📊 {departmentsSummary.vacantPositions} Vacancies
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg">
                  ➕ Add Department
                </button>
                <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                  📊 Org Chart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {[
            { label: 'Total Departments', value: departmentsSummary.totalDepartments, icon: '🏢', color: 'from-indigo-500 to-indigo-600' },
            { label: 'Total Employees', value: departmentsSummary.totalEmployees, icon: '👥', color: 'from-blue-500 to-blue-600' },
            { label: 'Headcount', value: departmentsSummary.totalHeadcount, icon: '📊', color: 'from-purple-500 to-purple-600' },
            { label: 'Vacancies', value: departmentsSummary.vacantPositions, icon: '📌', color: 'from-rose-500 to-rose-600' },
            { label: 'Total Budget', value: formatCurrency(departmentsSummary.totalBudget), icon: '💰', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Budget Used', value: formatCurrency(departmentsSummary.budgetUtilized), icon: '💵', color: 'from-green-500 to-green-600' },
            { label: 'Utilization', value: `${departmentsSummary.utilizationRate}%`, icon: '📈', color: 'from-cyan-500 to-cyan-600' },
            { label: 'Avg Team Size', value: departmentsSummary.avgTeamSize, icon: '👫', color: 'from-amber-500 to-amber-600' }
          ].map((metric, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="text-2xl font-black text-gray-900">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">All Departments</h2>
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📋 List
            </button>
          </div>
        </div>

        {/* Departments Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 hover:border-purple-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl">{dept.icon}</div>
                  <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                    {dept.employees} emp
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">{dept.name}</h3>
                <div className="text-sm text-gray-600 font-semibold mb-4">
                  {dept.head} • {dept.costCenter}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Budget</span>
                    <span className="font-black text-emerald-700">{formatCurrency(dept.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Performance</span>
                    <span className="font-black text-orange-700">{dept.performanceRating}/5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Vacancies</span>
                    <span className="font-black text-rose-700">{dept.vacancies}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-600 font-semibold mb-2">Budget Utilization</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                      style={{ width: `${dept.budgetUtilization}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 font-bold mt-1">{dept.budgetUtilization}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Department</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Head</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase">Employees</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase">Vacancies</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase">Budget</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase">Utilization</th>
                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{dept.icon}</div>
                          <div>
                            <div className="font-bold text-gray-900">{dept.name}</div>
                            <div className="text-xs text-gray-600">{dept.costCenter}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{dept.head}</div>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900">{dept.employees}</td>
                      <td className="px-4 py-4 text-right font-bold text-rose-700">{dept.vacancies}</td>
                      <td className="px-4 py-4 text-right font-bold text-emerald-700">{formatCurrency(dept.budget)}</td>
                      <td className="px-4 py-4 text-right font-bold text-blue-700">{dept.budgetUtilization}%</td>
                      <td className="px-4 py-4 text-center font-bold text-orange-700">{dept.performanceRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Budget Allocation */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
              💰
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Budget Allocation</h2>
              <p className="text-gray-600 text-sm mt-0.5">Organization-wide budget distribution</p>
            </div>
          </div>

          <div className="space-y-4">
            {budgetAllocation.map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-2xl p-6 border border-${item.color}-200`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900 text-lg">{item.category}</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">{formatCurrency(item.amount)}</div>
                    <div className="text-sm font-bold text-gray-600">{item.percentage}%</div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Headcount Trends */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
              📈
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Headcount Growth</h2>
              <p className="text-gray-600 text-sm mt-0.5">Employee growth trends</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-sm font-bold text-blue-900 mb-2">Last Quarter</div>
              <div className="text-4xl font-black text-blue-900">{headcountTrends.lastQuarter}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
              <div className="text-sm font-bold text-emerald-900 mb-2">This Quarter</div>
              <div className="text-4xl font-black text-emerald-900">{headcountTrends.thisQuarter}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="text-sm font-bold text-purple-900 mb-2">Growth</div>
              <div className="text-4xl font-black text-purple-900">+{headcountTrends.growth}%</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="text-sm font-bold text-amber-900 mb-2">Projected</div>
              <div className="text-4xl font-black text-amber-900">{headcountTrends.projectedNext}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedDepartment.icon}</div>
                <div>
                  <h2 className="text-4xl font-black text-gray-900">{selectedDepartment.name}</h2>
                  <p className="text-gray-600 font-semibold mt-1">{selectedDepartment.head} • {selectedDepartment.costCenter}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-xs text-blue-700 font-bold mb-1">Employees</div>
                <div className="text-3xl font-black text-blue-900">{selectedDepartment.employees}</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="text-xs text-emerald-700 font-bold mb-1">Budget</div>
                <div className="text-2xl font-black text-emerald-900">{formatCurrency(selectedDepartment.budget)}</div>
              </div>
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                <div className="text-xs text-rose-700 font-bold mb-1">Vacancies</div>
                <div className="text-3xl font-black text-rose-900">{selectedDepartment.vacancies}</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <div className="text-xs text-orange-700 font-bold mb-1">Performance</div>
                <div className="text-3xl font-black text-orange-900">{selectedDepartment.performanceRating}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-black text-gray-900 mb-4">Teams</h3>
              <div className="space-y-3">
                {selectedDepartment.teams.map((team, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">{team.name}</div>
                        <div className="text-sm text-gray-600">Lead: {team.lead}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Members: <span className="font-bold text-gray-900">{team.members}</span></div>
                        <div className="text-sm text-gray-600">Projects: <span className="font-bold text-gray-900">{team.projects}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-bold text-gray-600 mb-2">Locations</div>
                <div className="flex flex-wrap gap-2">
                  {selectedDepartment.location.map((loc, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-600 mb-2">Established</div>
                <div className="font-bold text-gray-900">{new Date(selectedDepartment.established).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}