import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/auth.service";
import { LockKeyhole, User, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getMe } from "../../api/auth.api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await login(username, password);
      const profile = await getMe();
      if (!user) throw new Error("No user");

      setUser(profile);

      // Redirect berdasarkan role
      const routes = {
        admin: "/dashboard-admin",
        dosen: "/dashboard-dosen",
        mahasiswa: "/home",
      };
      navigate(routes[user.role] || "/login");
    } catch (err: any) {
      // Jika interceptor bekerja dengan benar, error akan sampai ke sini
      if (err.response?.status === 401) {
        alert("Username atau Password Salah!"); // Pesan yang benar untuk login
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <LockKeyhole size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Selamat Datang</h2>
          <p className="text-slate-500 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User size={18} />
              </span>
              <input
                required
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <LockKeyhole size={18} />
              </span>
              <input
                required
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Masuk Sekarang"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Masalah saat login?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Hubungi Admin IT
          </a>
        </p>
      </div>
    </div>
  );
}
