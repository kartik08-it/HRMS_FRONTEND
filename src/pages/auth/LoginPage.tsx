import { MailIcon, LockIcon, FileTextIcon, EyeIcon, EyeOffIcon } from "../../components/icons/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: any) => {
    e.preventDefault();
    console.log("Sign in clicked", { email, password });
    localStorage.setItem("auth", "true");

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef6e4] px-4">
      <div className="w-full max-w-md">
        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
            <FileTextIcon size={28} strokeWidth={2} />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your notes</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <MailIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                    bg-gray-50 text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-orange-400
                    focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                {/* Left Lock Icon */}
                <LockIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                {/* Password Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg
                    bg-gray-50 text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-orange-400
                    focus:border-transparent transition-shadow"
                />

                {/* Right Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md"
            >
              Sign In
            </button>

            <p className="text-sm text-center text-gray-500 mt-4">
              Don&apos;t have an account? &nbsp;
              <span className="text-orange-500 font-medium cursor-pointer hover:underline transition-colors">
                Sign up
              </span>
            </p>
          </form>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Tip: Use any email/password to login (demo mode)
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
