const settingsGroups = [
  {
    name: "General",
    description: "Company profile, timezone, and calendar settings",
    actions: ["Edit Profile", "Set Fiscal Year", "Configure Holidays"],
  },
  {
    name: "Access Control",
    description: "Role permissions and SSO management",
    actions: ["Manage Roles", "Update Permissions", "SAML / OAuth"],
  },
  {
    name: "Notifications",
    description: "Email templates and delivery channels",
    actions: ["Template Library", "Alert Rules", "Digest Schedule"],
  },
  {
    name: "Integrations",
    description: "Payroll, ATS, and accounting connectors",
    actions: ["Connect Apps", "Webhooks", "Sync Status"],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-cyan-50/40 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 p-10 shadow-2xl text-white">
          <h1 className="text-5xl font-black tracking-tight">Settings</h1>
          <p className="mt-2 text-sky-100 text-lg font-medium">System preferences, permissions, and integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsGroups.map((group) => (
            <div key={group.name} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900">{group.name}</h2>
              <p className="mt-1 text-gray-600 font-medium">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.actions.map((action) => (
                  <span key={action} className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {action}
                  </span>
                ))}
              </div>
              <button className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold">
                Open {group.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
