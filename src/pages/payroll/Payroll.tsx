import { useState } from 'react';
import payrollData from './payrollData.json';

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, employees, reimbursements, compliance
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showProcessModal, setShowProcessModal] = useState(false);

  const {
    payrollSummary,
    processStatus,
    salaryBreakdown,
    deductions,
    employeePayroll,
    departmentWiseExpense,
    reimbursements,
    payrollErrors,
    complianceTracking,
    bonusAllocation,
    salaryBands,
    paymentSchedule,
    ytdSummary
  } = payrollData;

  const getStatusBadge = (status: string | number) => {
    const badges: Record<string, string> = {
      'processed': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'pending': 'bg-amber-100 text-amber-800 border-amber-300',
      'error': 'bg-rose-100 text-rose-800 border-rose-300',
      'approved': 'bg-blue-100 text-blue-800 border-blue-300',
      'paid': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'compliant': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-300'
    };
    return badges[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getSeverityBadge = (severity: string | number) => {
    const badges: Record<string, string> = {
      'high': 'bg-rose-600 text-white',
      'medium': 'bg-amber-500 text-white',
      'low': 'bg-blue-500 text-white'
    };
    return badges[severity] || 'bg-gray-400 text-white';
  };

  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                    💰
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white tracking-tight">Payroll Management</h1>
                    <p className="text-emerald-100 text-lg mt-1 font-medium">Salary processing & financial compliance</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    💵 {formatCurrency(payrollSummary.thisMonthExpense)} This Month
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    ⏳ {payrollSummary.pendingPayroll} Pending
                  </div>
                  <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                    🚨 {payrollErrors.length} Errors
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowProcessModal(true)}
                  className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg"
                >
                  ▶️ Process Payroll
                </button>
                <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                  📥 Download Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Status Banner */}
        {processStatus.status === 'in_progress' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse">
                  <div className="text-3xl">⚙️</div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Payroll Processing In Progress</h2>
                  <p className="text-gray-600 font-semibold mt-1">Current Stage: {processStatus.stage.replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-black text-blue-600">{processStatus.progress}%</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">Complete</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm font-bold text-gray-600 mb-2">
                <span>Progress</span>
                <span>{processStatus.processedCount} / {processStatus.processedCount + processStatus.pendingCount} employees</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${processStatus.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-600 font-semibold mb-1">Started At</div>
                <div className="font-bold text-gray-900">{processStatus.startedAt}</div>
              </div>
              <div>
                <div className="text-gray-600 font-semibold mb-1">Estimated Completion</div>
                <div className="font-bold text-gray-900">{processStatus.estimatedCompletion}</div>
              </div>
              <div>
                <div className="text-gray-600 font-semibold mb-1">Pending</div>
                <div className="font-bold text-amber-600">{processStatus.pendingCount}</div>
              </div>
              <div>
                <div className="text-gray-600 font-semibold mb-1">Errors</div>
                <div className="font-bold text-rose-600">{processStatus.errorCount}</div>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { label: 'Total Employees', value: payrollSummary.totalEmployees, icon: '👥', color: 'from-blue-500 to-blue-600', subtext: 'Active workforce' },
            { label: 'Processed', value: payrollSummary.processedPayroll, icon: '✅', color: 'from-emerald-500 to-emerald-600', subtext: 'Completed' },
            { label: 'Pending', value: payrollSummary.pendingPayroll, icon: '⏳', color: 'from-amber-500 to-amber-600', subtext: 'In queue' },
            { label: 'Total Expense', value: formatCurrency(payrollSummary.totalExpense), icon: '💵', color: 'from-green-500 to-green-600', subtext: 'This month' },
            { label: 'Avg Salary', value: formatCurrency(payrollSummary.avgSalary), icon: '📊', color: 'from-purple-500 to-purple-600', subtext: 'Per employee' },
            { label: 'Reimbursements', value: formatCurrency(payrollSummary.pendingReimbursements), icon: '🧾', color: 'from-rose-500 to-rose-600', subtext: 'Pending' }
          ].map((metric, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="text-3xl font-black text-gray-900 mb-1">{metric.value}</div>
              <div className="text-xs text-gray-600 font-semibold">{metric.subtext}</div>
            </div>
          ))}
        </div>

        {/* Salary Breakdown & Deductions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Salary Breakdown */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Salary Breakdown</h2>
                <p className="text-gray-600 text-sm mt-0.5">Component-wise distribution</p>
              </div>
            </div>

            <div className="space-y-4">
              {salaryBreakdown.map((item, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-2xl p-5 border border-${item.color}-200`}>
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

            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-900">Total Gross Salary</span>
                <span className="text-3xl font-black text-blue-900">{formatCurrency(payrollSummary.thisMonthExpense)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                ➖
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Deductions</h2>
                <p className="text-gray-600 text-sm mt-0.5">Tax & statutory deductions</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {deductions.breakdown.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{item.type}</span>
                    <div className="text-right">
                      <div className="text-lg font-black text-rose-700">{formatCurrency(item.amount)}</div>
                      <div className="text-xs font-bold text-gray-600">{item.percentage}%</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-gradient-to-r from-rose-50 to-red-50 rounded-2xl border border-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-rose-900">Total Deductions</span>
                <span className="text-3xl font-black text-rose-900">{formatCurrency(deductions.totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'employees', label: 'Employee Payroll', icon: '👥' },
              { id: 'reimbursements', label: 'Reimbursements', icon: '🧾' },
              { id: 'compliance', label: 'Compliance', icon: '✅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
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
            className="px-6 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="product">Product</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Department-wise Expense */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                  🏢
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Department-wise Expense</h2>
                  <p className="text-gray-600 text-sm mt-0.5">Salary distribution by team</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentWiseExpense.map((dept, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black text-gray-900">{dept.department}</h3>
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        {dept.employees} emp
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-xs text-gray-600 font-semibold mb-1">Total Salary</div>
                        <div className="text-3xl font-black text-emerald-700">{formatCurrency(dept.totalSalary)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-600 font-semibold mb-1">Avg Salary</div>
                          <div className="text-lg font-black text-gray-900">{formatCurrency(dept.avgSalary)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold mb-1">vs Last Month</div>
                          <div className={`text-lg font-black ${dept.changePercent > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {dept.changePercent > 0 ? '+' : ''}{dept.changePercent}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 font-semibold">Budget Utilization</span>
                        <span className="font-bold text-gray-900">{dept.budgetUsed}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            dept.budgetUsed > 95 ? 'bg-gradient-to-r from-rose-400 to-rose-600' :
                            dept.budgetUsed > 90 ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                            'bg-gradient-to-r from-emerald-400 to-emerald-600'
                          }`}
                          style={{ width: `${dept.budgetUsed}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 font-semibold mt-1">
                        {formatCurrency(dept.totalSalary)} / {formatCurrency(dept.budgetAllocated)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Bands & Bonus Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Salary Bands */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
                    📈
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Salary Bands</h2>
                    <p className="text-gray-600 text-sm mt-0.5">Employee distribution</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {salaryBands.map((band, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-black text-gray-900 text-lg">{band.band}</div>
                          <div className="text-sm text-gray-600 font-semibold">{band.employees} employees ({band.percentage}%)</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-cyan-700">{formatCurrency(band.totalCost)}</div>
                          <div className="text-xs text-gray-600 font-semibold">Total cost</div>
                        </div>
                      </div>
                      <div className="h-2.5 bg-cyan-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                          style={{ width: `${band.percentage * 2}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonus Allocation */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl">
                    🎁
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Bonus Allocation</h2>
                    <p className="text-gray-600 text-sm mt-0.5">Performance incentives</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {bonusAllocation.map((dept, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900 text-lg">{dept.department}</span>
                        <div className="text-right">
                          <div className="text-xl font-black text-orange-700">{formatCurrency(dept.totalBonus)}</div>
                          <div className="text-xs text-gray-600 font-semibold">{dept.employees} recipients</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-semibold">Avg per employee</span>
                        <span className="font-black text-gray-900">{formatCurrency(dept.avgBonus)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-orange-900">Total Bonus Paid</span>
                    <span className="text-3xl font-black text-orange-900">{formatCurrency(payrollSummary.bonusPaid)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Employee Payroll Tab */}
        {activeTab === 'employees' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Employee Payroll</h2>
                  <p className="text-gray-600 text-sm mt-0.5">{employeePayroll.length} records</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Base</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Allowances</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Bonus</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Gross</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Deductions</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Net Salary</th>
                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeePayroll.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-bold text-gray-900">{emp.employeeName}</div>
                          <div className="text-xs text-gray-600 font-semibold">{emp.employeeId}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{emp.department}</div>
                        <div className="text-xs text-gray-600">{emp.designation}</div>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900">{formatCurrency(emp.baseSalary)}</td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900">{formatCurrency(emp.allowances)}</td>
                      <td className="px-4 py-4 text-right font-bold text-emerald-700">{formatCurrency(emp.bonus)}</td>
                      <td className="px-4 py-4 text-right font-black text-blue-700">{formatCurrency(emp.grossSalary)}</td>
                      <td className="px-4 py-4 text-right font-bold text-rose-700">{formatCurrency(emp.totalDeductions)}</td>
                      <td className="px-4 py-4 text-right font-black text-emerald-700 text-lg">{formatCurrency(emp.netSalary)}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(emp.status)}`}>
                          {emp.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reimbursements Tab */}
        {activeTab === 'reimbursements' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                  🧾
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Reimbursements</h2>
                  <p className="text-gray-600 text-sm mt-0.5">{formatCurrency(payrollSummary.pendingReimbursements)} pending approval</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reimbursements.map((reimb) => (
                <div key={reimb.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {reimb.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900">{reimb.employeeName}</h3>
                        <div className="text-sm text-gray-600 font-semibold">{reimb.employeeId} • {reimb.department}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-purple-700">{formatCurrency(reimb.amount)}</div>
                      <span className={`inline-block mt-2 px-4 py-2 rounded-xl font-bold text-sm border ${getStatusBadge(reimb.status)}`}>
                        {reimb.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <div className="text-gray-600 font-semibold mb-1">Type</div>
                      <div className="font-bold text-gray-900">{reimb.type}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 font-semibold mb-1">Submitted</div>
                      <div className="font-bold text-gray-900">{new Date(reimb.submittedDate).toLocaleDateString()}</div>
                    </div>
                    {reimb.approvedDate && (
                      <div>
                        <div className="text-gray-600 font-semibold mb-1">Approved</div>
                        <div className="font-bold text-emerald-700">{new Date(reimb.approvedDate).toLocaleDateString()}</div>
                      </div>
                    )}
                    {reimb.paidDate && (
                      <div>
                        <div className="text-gray-600 font-semibold mb-1">Paid</div>
                        <div className="font-bold text-emerald-700">{new Date(reimb.paidDate).toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">Description</div>
                    <div className="text-sm text-gray-800 font-medium">{reimb.description}</div>
                  </div>

                  {reimb.status === 'pending' && (
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors">
                        ✓ Approve
                      </button>
                      <button className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600 transition-colors">
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-8">
            
            {/* Compliance Tracking */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Compliance Tracking</h2>
                  <p className="text-gray-600 text-sm mt-0.5">Statutory compliance status</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(complianceTracking).map(([key, comp]) => (
                  <div key={key} className={`rounded-2xl p-6 border-2 ${
                    comp.status === 'compliant' ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300' :
                    'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(comp.status)}`}>
                        {comp.status.toUpperCase()}
                      </span>
                      <div className="text-3xl">{comp.status === 'compliant' ? '✅' : '⚠️'}</div>
                    </div>
                    
                    <h3 className="text-lg font-black text-gray-900 mb-4">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-semibold">Amount</span>
                        <span className="font-black text-gray-900">{formatCurrency(comp.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-semibold">Last Filed</span>
                        <span className="font-bold text-gray-900">{new Date(comp.lastFiled).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-semibold">Next Due</span>
                        <span className={`font-bold ${
                          comp.status === 'pending' ? 'text-rose-700' : 'text-emerald-700'
                        }`}>
                          {new Date(comp.nextDue).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* YTD Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl">
                  📅
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Year-to-Date Summary</h2>
                  <p className="text-gray-600 text-sm mt-0.5">Annual payroll overview</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { label: 'Total Paid', value: ytdSummary.totalPaid, color: 'blue' },
                  { label: 'Total Tax', value: ytdSummary.totalTax, color: 'rose' },
                  { label: 'Total PF', value: ytdSummary.totalPF, color: 'purple' },
                  { label: 'Total ESI', value: ytdSummary.totalESI, color: 'cyan' },
                  { label: 'Avg Monthly', value: ytdSummary.avgMonthlyExpense, color: 'emerald' },
                  { label: 'Projected Yearly', value: ytdSummary.projectedYearly, color: 'amber' }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 rounded-2xl p-6 border border-${item.color}-200`}>
                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">{item.label}</div>
                    <div className={`text-3xl font-black text-${item.color}-700`}>{formatCurrency(item.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payroll Errors */}
        {payrollErrors.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                🚨
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Payroll Errors</h2>
                <p className="text-gray-600 text-sm mt-0.5">{payrollErrors.length} issues requiring attention</p>
              </div>
            </div>

            <div className="space-y-4">
              {payrollErrors.map((error) => (
                <div key={error.id} className="bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityBadge(error.severity)}`}>
                        {error.severity.toUpperCase()}
                      </span>
                      <span className="font-bold text-gray-900 text-lg">{error.employeeName}</span>
                      <span className="text-sm text-gray-600 font-semibold">{error.employeeId} • {error.department}</span>
                    </div>
                    <button className="px-4 py-2 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600 transition-colors text-sm">
                      Resolve
                    </button>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-bold text-rose-900">{error.errorType}:</span>
                    <span className="text-rose-800 ml-2 font-semibold">{error.description}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold">
                    Detected: {new Date(error.detectedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Process Payroll Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-900">Process Payroll</h2>
              <button 
                onClick={() => setShowProcessModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="text-sm font-bold text-blue-900 mb-3">Processing Summary</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-black text-blue-900">{payrollSummary.totalEmployees}</div>
                    <div className="text-xs text-blue-700 font-semibold mt-1">Total Employees</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-emerald-700">{formatCurrency(payrollSummary.thisMonthExpense)}</div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">Total Amount</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-amber-700">{payrollSummary.pendingPayroll}</div>
                    <div className="text-xs text-amber-700 font-semibold mt-1">Pending</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Month</label>
                <input type="month" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Date</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={paymentSchedule.nextPayday} readOnly />
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-amber-800">
                  <span className="text-xl">⚠️</span>
                  <span className="text-sm font-bold">This action will process payroll for all employees and cannot be undone.</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowProcessModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  ▶️ Start Processing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}