import { useMemo, useState } from "react";
import complianceData from "./complianceData.json";

const statusClasses: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  "At Risk": "bg-rose-100 text-rose-800 border-rose-300",
  "On Track": "bg-emerald-100 text-emerald-800 border-emerald-300"
};

const riskClasses: Record<string, string> = {
  High: "bg-rose-100 text-rose-800",
  Medium: "bg-amber-100 text-amber-800",
  Low: "bg-emerald-100 text-emerald-800"
};

const priorityClasses: Record<string, string> = {
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700"
};

const severityClasses: Record<string, string> = {
  Critical: "bg-rose-100 text-rose-800",
  Warning: "bg-amber-100 text-amber-800",
  Info: "bg-blue-100 text-blue-800"
};

export default function CompliancePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const {
    complianceSummary,
    complianceCategories,
    complianceItems,
    riskDistribution,
    upcomingAudits,
    recentActivities,
    alerts
  } = complianceData;

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return complianceItems;
    }
    return complianceItems.filter((item) => item.category === selectedCategory);
  }, [complianceItems, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-25"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                  🔐
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white tracking-tight">Compliance</h1>
                  <p className="text-orange-100 text-lg mt-1 font-medium">Policy, audit and risk governance cockpit</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  🧾 {complianceSummary.totalControls} Controls
                </div>
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  ✅ {complianceSummary.compliantControls} Compliant
                </div>
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  🚨 {complianceSummary.criticalRisks} Critical Risks
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg">
                ➕ Raise Finding
              </button>
              <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                📄 Export Evidence
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {[
            { label: "Total Controls", value: complianceSummary.totalControls, icon: "📘", color: "from-indigo-500 to-indigo-600" },
            { label: "Compliant", value: complianceSummary.compliantControls, icon: "✅", color: "from-emerald-500 to-emerald-600" },
            { label: "Open Findings", value: complianceSummary.openFindings, icon: "🔎", color: "from-blue-500 to-blue-600" },
            { label: "Critical Risks", value: complianceSummary.criticalRisks, icon: "🚨", color: "from-rose-500 to-rose-600" },
            { label: "Due This Week", value: complianceSummary.dueThisWeek, icon: "📅", color: "from-amber-500 to-amber-600" },
            { label: "Overdue", value: complianceSummary.overdueItems, icon: "⛔", color: "from-red-500 to-red-600" },
            { label: "Audit Readiness", value: `${complianceSummary.auditReadiness}%`, icon: "🛡️", color: "from-cyan-500 to-cyan-600" },
            { label: "Policy Coverage", value: `${complianceSummary.policyCoverage}%`, icon: "📊", color: "from-purple-500 to-purple-600" }
          ].map((metric, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="text-2xl font-black text-gray-900">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {complianceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  selectedCategory === category.id
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🧩 Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === "table"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📋 Table
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-rose-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-gray-500 uppercase">{item.id}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusClasses[item.status] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-semibold mb-4">{item.owner} • {item.framework}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Due Date</span>
                    <span className="font-bold text-gray-900">{item.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Risk</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${riskClasses[item.risk] || "bg-gray-100 text-gray-700"}`}>
                      {item.risk}
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
                    <span>Completion</span>
                    <span>{item.completion}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-400 to-orange-600 rounded-full" style={{ width: `${item.completion}%` }}></div>
                  </div>
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
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Control</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Owner</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Framework</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Due Date</th>
                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase">Risk</th>
                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.id}</div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{item.owner}</td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{item.framework}</td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{item.dueDate}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${riskClasses[item.risk] || "bg-gray-100 text-gray-700"}`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusClasses[item.status] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-2xl">
                🔥
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Risk Distribution</h2>
                <p className="text-gray-600 text-sm mt-0.5">Current findings by severity</p>
              </div>
            </div>
            <div className="space-y-4">
              {riskDistribution.map((risk) => (
                <div key={risk.level} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">{risk.level} Risk</span>
                    <span className="text-xl font-black text-gray-900">{risk.count}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${risk.color}-400 to-${risk.color}-600 rounded-full`}
                      style={{ width: `${(risk.count / complianceSummary.openFindings) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Upcoming Audits</h2>
                <p className="text-gray-600 text-sm mt-0.5">Scheduled reviews and control checks</p>
              </div>
            </div>
            <div className="space-y-4">
              {upcomingAudits.map((audit, idx) => (
                <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{audit.name}</div>
                      <div className="text-sm text-gray-600">{audit.owner}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-indigo-700">{audit.date}</div>
                      <span className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-bold ${priorityClasses[audit.priority] || "bg-gray-100 text-gray-700"}`}>
                        {audit.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
              🕵️
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Recent Activity</h2>
              <p className="text-gray-600 text-sm mt-0.5">Latest compliance updates and signals</p>
            </div>
          </div>
          <div className="space-y-4">
            {recentActivities.map((entry, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-gray-900">{entry.actor}</div>
                  <div className="text-sm text-gray-700">{entry.action}</div>
                  <div className="text-xs text-gray-600 mt-1">{entry.time}</div>
                </div>
                <span className={`self-start md:self-auto rounded-full px-3 py-1 text-xs font-bold ${severityClasses[entry.severity] || "bg-gray-100 text-gray-700"}`}>
                  {entry.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border-l-4 border-rose-500 rounded-2xl p-6">
          <div className="font-black text-rose-900 mb-4 text-lg flex items-center gap-2">
            <span>🚨</span> Compliance Alerts
          </div>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className="bg-white/60 rounded-xl border border-rose-200 p-4 text-sm font-medium text-rose-800">
                {alert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
