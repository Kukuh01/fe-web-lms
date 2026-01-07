import { BookOpen, FileText, GraduationCap, Search, Users } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard Admin
            </h1>
            <p className="text-slate-600 mt-1">Sistem Manajemen Akademik</p>
          </div>
          {/* <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari data..."
                className="pl-10 w-64"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div> */}
        </div>

        {/* {notification.show && (
          <Alert
            className={
              notification.type === "success"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }
          >
            <AlertDescription
              className={
                notification.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {notification.message}
            </AlertDescription>
          </Alert>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Mahasiswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold">{mahasiswa.length}</div> */}
              <div className="text-3xl font-bold">30</div>
              <p className="text-xs text-blue-100 mt-1">
                Total mahasiswa terdaftar
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Dosen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold">{dosen.length}</div> */}
              <div className="text-3xl font-bold">30</div>
              <p className="text-xs text-purple-100 mt-1">Total dosen aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Mata Kuliah
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold">{courses.length}</div> */}
              <div className="text-3xl font-bold">40</div>
              <p className="text-xs text-green-100 mt-1">Total mata kuliah</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Tugas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="text-3xl font-bold">{assignments.length}</div> */}
              <div className="text-3xl font-bold">10</div>
              <p className="text-xs text-orange-100 mt-1">Total tugas aktif</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
