const settingGroups = [
  { title: "Organization Profile", description: "Manage company info, timezone and branding.", action: "Edit Profile" },
  { title: "Approval Workflows", description: "Configure leave, expense and policy approvals.", action: "Configure" },
  { title: "Notifications", description: "Control alerts for attendance, payroll and hiring.", action: "Update Rules" },
  { title: "Access Control", description: "Set roles and permission boundaries for teams.", action: "Manage Access" }
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 p-10 shadow-2xl">
          <h1 className="text-5xl font-black text-white tracking-tight">Settings</h1>
          <p className="text-slate-200 text-lg mt-2 font-medium">System-wide preferences and configurations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {settingGroups.map((setting) => (
            <div key={setting.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-black text-gray-900">{setting.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{setting.description}</p>
              <button className="mt-5 rounded-xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                {setting.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
