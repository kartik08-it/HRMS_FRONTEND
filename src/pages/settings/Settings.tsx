import { useMemo, useState } from "react";
import settingsData from "./settingsData.json";

const moduleStatusClasses: Record<string, string> = {
  Updated: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Review: "bg-amber-100 text-amber-800 border-amber-300",
  Draft: "bg-blue-100 text-blue-800 border-blue-300"
};

const integrationStatusClasses: Record<string, string> = {
  Connected: "bg-emerald-100 text-emerald-800",
  Warning: "bg-amber-100 text-amber-800",
  Disconnected: "bg-rose-100 text-rose-800"
};

const severityClasses: Record<string, string> = {
  Info: "bg-blue-100 text-blue-800",
  Warning: "bg-amber-100 text-amber-800",
  Critical: "bg-rose-100 text-rose-800"
};

export default function SettingsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const {
    settingsSummary,
    settingCategories,
    settingModules,
    featureToggles,
    integrations,
    auditTrail,
    alerts
  } = settingsData;

  const filteredModules = useMemo(() => {
    if (selectedCategory === "all") {
      return settingModules;
    }
    return settingModules.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, settingModules]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-10 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                  ⚙️
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white tracking-tight">Settings</h1>
                  <p className="text-slate-200 text-lg mt-1 font-medium">System configuration and policy controls</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  🛡️ Security Score: {settingsSummary.securityScore}
                </div>
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  🔗 {settingsSummary.activeIntegrations} Integrations
                </div>
                <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                  🧾 {settingsSummary.totalPolicies} Policies
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-4 bg-white text-slate-800 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 text-lg">
                ➕ New Configuration
              </button>
              <button className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                📋 Audit Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {[
            { label: "Total Policies", value: settingsSummary.totalPolicies, icon: "📘", color: "from-blue-500 to-blue-600" },
            { label: "Integrations", value: settingsSummary.activeIntegrations, icon: "🔗", color: "from-indigo-500 to-indigo-600" },
            { label: "Pending Approvals", value: settingsSummary.pendingApprovals, icon: "⏳", color: "from-amber-500 to-amber-600" },
            { label: "Security Score", value: `${settingsSummary.securityScore}%`, icon: "🛡️", color: "from-emerald-500 to-emerald-600" },
            { label: "Roles Configured", value: settingsSummary.rolesConfigured, icon: "👥", color: "from-cyan-500 to-cyan-600" },
            { label: "SSO Enabled", value: settingsSummary.ssoEnabled ? "Yes" : "No", icon: "🔐", color: "from-teal-500 to-teal-600" },
            { label: "Last Audit", value: settingsSummary.lastAuditDate, icon: "📅", color: "from-purple-500 to-purple-600" },
            { label: "Critical Alerts", value: settingsSummary.criticalAlerts, icon: "🚨", color: "from-rose-500 to-rose-600" }
          ].map((metric, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${metric.color} rounded-t-2xl`}></div>
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{metric.label}</div>
              <div className="text-2xl font-black text-gray-900 break-words">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {settingCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  selectedCategory === category.id
                    ? "bg-slate-800 text-white"
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
                  ? "bg-slate-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🧩 Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === "table"
                  ? "bg-slate-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📋 Table
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-slate-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-gray-500 uppercase">{module.id}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${moduleStatusClasses[module.status] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
                    {module.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 font-semibold mb-4">{module.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Owner</span>
                    <span className="font-bold text-gray-900">{module.owner}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Controls</span>
                    <span className="font-bold text-gray-900">{module.controls}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-semibold">Updated</span>
                    <span className="font-bold text-slate-700">{module.lastUpdated}</span>
                  </div>
                </div>
                <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:shadow-lg transition-all">
                  Manage Settings
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Module</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Owner</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase">Controls</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase">Last Updated</th>
                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModules.map((module) => (
                    <tr key={module.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-900">{module.title}</div>
                        <div className="text-xs text-gray-600">{module.id}</div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{module.owner}</td>
                      <td className="px-4 py-4 text-right font-bold text-gray-900">{module.controls}</td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{module.lastUpdated}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${moduleStatusClasses[module.status] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
                          {module.status}
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl">
                🎛️
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Feature Toggles</h2>
                <p className="text-gray-600 text-sm mt-0.5">Critical runtime configuration switches</p>
              </div>
            </div>
            <div className="space-y-4">
              {featureToggles.map((toggle) => (
                <div key={toggle.name} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{toggle.name}</div>
                      <div className="text-sm text-gray-600">
                        Scope: {toggle.scope} • Impact: {toggle.impact}
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${toggle.enabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"}`}>
                      {toggle.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                🔌
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Integrations</h2>
                <p className="text-gray-600 text-sm mt-0.5">Connected platform services and sync health</p>
              </div>
            </div>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.name} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{integration.name}</div>
                      <div className="text-sm text-gray-600">{integration.type} • {integration.sync}</div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${integrationStatusClasses[integration.status] || "bg-gray-100 text-gray-800"}`}>
                      {integration.status}
                    </span>
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
              <h2 className="text-3xl font-black text-gray-900">Audit Trail</h2>
              <p className="text-gray-600 text-sm mt-0.5">Recent configuration and policy events</p>
            </div>
          </div>

          <div className="space-y-4">
            {auditTrail.map((entry, idx) => (
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
            <span>🚨</span> Settings Alerts
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
