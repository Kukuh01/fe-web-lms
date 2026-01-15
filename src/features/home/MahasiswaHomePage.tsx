import { Award, Bell, BookOpen, Calendar } from "lucide-react";
import PageLayout from "../../components/Layouts/PageLayout";
import { Card, CardContent } from "../../components/ui/card";
import { useAuth } from "../../context/AuthContext";

export default function MahasiswaHomePage() {
  const { user } = useAuth();
  const { stats: mahasiswaStats, isLoading: loadingMahasiswa } =
    useMahasiswaStats();

  return (
    <PageLayout>
      <div className="p-6 space-y-6 bg-slate-100 min-h-screen">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-600 text-white p-8">
          <p className="text-sm opacity-90">Selamat Siang</p>
          <h1 className="text-2xl font-bold mt-1">
            {user?.name || "Loading..."}
          </h1>
          <p className="text-sm mt-2 opacity-80">Dashboard Akademik</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pengumuman */}
          <Card className="lg:col-span-1 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Pengumuman Terkini</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 border rounded-xl">
                  <p className="font-medium">Pengumuman Kelas</p>
                  <p className="text-blue-600">Link WAG Kelas</p>
                  <a href="#" className="text-xs text-slate-500 break-all">
                    https://chat.whatsapp.com/xxxxx
                  </a>
                </div>
                <div className="p-3 border rounded-xl">
                  <p className="font-medium">Join Grup WA Kelas</p>
                  <p className="text-xs text-slate-500 break-all">
                    https://chat.whatsapp.com/yyyyy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistik */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Statistik Akademik</h2>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                    Semester Aktif
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl p-4 text-white bg-gradient-to-br from-sky-400 to-blue-600">
                    <BookOpen />
                    <h3 className="text-3xl font-bold mt-2">8</h3>
                    <p className="text-sm">Mata Kuliah</p>
                  </div>
                  <div className="rounded-xl p-4 text-white bg-gradient-to-br from-emerald-400 to-green-600">
                    <BookOpen />
                    <h3 className="text-3xl font-bold mt-2">24</h3>
                    <p className="text-sm">Total SKS</p>
                  </div>
                  <div className="rounded-xl p-4 text-white bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Award />
                    <h3 className="text-3xl font-bold mt-2">3.67</h3>
                    <p className="text-sm">IPK</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kalender */}
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="font-semibold">Kalender Akademik</h2>
                </div>
                <div className="h-48 flex items-center justify-center text-slate-400 text-sm border rounded-xl">
                  Kalender Akademik (integrasi FullCalendar / custom calendar)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
