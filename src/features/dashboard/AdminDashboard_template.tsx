import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Search,
} from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("mahasiswa");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [mahasiswa, setMahasiswa] = useState([
    {
      id: 1,
      nim: "2021001",
      nama: "Budi Santoso",
      jurusan: "Teknik Informatika",
      angkatan: "2021",
    },
    {
      id: 2,
      nim: "2021002",
      nama: "Siti Aminah",
      jurusan: "Sistem Informasi",
      angkatan: "2021",
    },
    {
      id: 3,
      nim: "2020015",
      nama: "Ahmad Rizki",
      jurusan: "Teknik Informatika",
      angkatan: "2020",
    },
  ]);

  const [dosen, setDosen] = useState([
    {
      id: 1,
      nidn: "0123456789",
      nama: "Dr. Andi Wijaya",
      bidang: "Artificial Intelligence",
      email: "andi.wijaya@univ.ac.id",
    },
    {
      id: 2,
      nidn: "0987654321",
      nama: "Prof. Sri Mulyani",
      bidang: "Database Systems",
      email: "sri.mulyani@univ.ac.id",
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      kode: "TI101",
      nama: "Pemrograman Dasar",
      sks: 3,
      dosen: "Dr. Andi Wijaya",
    },
    {
      id: 2,
      kode: "TI201",
      nama: "Struktur Data",
      sks: 4,
      dosen: "Prof. Sri Mulyani",
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      judul: "Tugas 1 - Algoritma Sorting",
      course: "Pemrograman Dasar",
      deadline: "2026-01-15",
      status: "Aktif",
    },
    {
      id: 2,
      judul: "Project Akhir - Aplikasi CRUD",
      course: "Struktur Data",
      deadline: "2026-02-20",
      status: "Aktif",
    },
  ]);

  const [editData, setEditData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleAdd = () => {
    setEditData(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      switch (type) {
        case "mahasiswa":
          setMahasiswa(mahasiswa.filter((m) => m.id !== id));
          break;
        case "dosen":
          setDosen(dosen.filter((d) => d.id !== id));
          break;
        case "course":
          setCourses(courses.filter((c) => c.id !== id));
          break;
        case "assignment":
          setAssignments(assignments.filter((a) => a.id !== id));
          break;
      }
      showNotification("Data berhasil dihapus", "success");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData };

    if (editData) {
      switch (activeTab) {
        case "mahasiswa":
          setMahasiswa(
            mahasiswa.map((m) => (m.id === editData.id ? newData : m))
          );
          break;
        case "dosen":
          setDosen(dosen.map((d) => (d.id === editData.id ? newData : d)));
          break;
        case "course":
          setCourses(courses.map((c) => (c.id === editData.id ? newData : c)));
          break;
        case "assignment":
          setAssignments(
            assignments.map((a) => (a.id === editData.id ? newData : a))
          );
          break;
      }
      showNotification("Data berhasil diperbarui", "success");
    } else {
      newData.id = Date.now();
      switch (activeTab) {
        case "mahasiswa":
          setMahasiswa([...mahasiswa, newData]);
          break;
        case "dosen":
          setDosen([...dosen, newData]);
          break;
        case "course":
          setCourses([...courses, newData]);
          break;
        case "assignment":
          setAssignments([...assignments, newData]);
          break;
      }
      showNotification("Data berhasil ditambahkan", "success");
    }

    setIsDialogOpen(false);
    setFormData({});
  };

  const filterData = (data, fields) => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      fields.some((field) =>
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case "mahasiswa":
        return (
          <>
            <div className="space-y-2">
              <Label>NIM</Label>
              <Input
                value={formData.nim || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nim: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input
                value={formData.nama || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Jurusan</Label>
              <Input
                value={formData.jurusan || ""}
                onChange={(e) =>
                  setFormData({ ...formData, jurusan: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Angkatan</Label>
              <Input
                value={formData.angkatan || ""}
                onChange={(e) =>
                  setFormData({ ...formData, angkatan: e.target.value })
                }
                required
              />
            </div>
          </>
        );
      case "dosen":
        return (
          <>
            <div className="space-y-2">
              <Label>NIDN</Label>
              <Input
                value={formData.nidn || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nidn: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input
                value={formData.nama || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Bidang</Label>
              <Input
                value={formData.bidang || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bidang: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </>
        );
      case "course":
        return (
          <>
            <div className="space-y-2">
              <Label>Kode Mata Kuliah</Label>
              <Input
                value={formData.kode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, kode: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nama Mata Kuliah</Label>
              <Input
                value={formData.nama || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>SKS</Label>
              <Input
                type="number"
                value={formData.sks || ""}
                onChange={(e) =>
                  setFormData({ ...formData, sks: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Dosen Pengampu</Label>
              <Input
                value={formData.dosen || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dosen: e.target.value })
                }
                required
              />
            </div>
          </>
        );
      case "assignment":
        return (
          <>
            <div className="space-y-2">
              <Label>Judul Tugas</Label>
              <Input
                value={formData.judul || ""}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Mata Kuliah</Label>
              <Input
                value={formData.course || ""}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input
                type="date"
                value={formData.deadline || ""}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input
                value={formData.status || ""}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                required
              />
            </div>
          </>
        );
    }
  };

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
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cari data..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {notification.show && (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Mahasiswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mahasiswa.length}</div>
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
              <div className="text-3xl font-bold">{dosen.length}</div>
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
              <div className="text-3xl font-bold">{courses.length}</div>
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
              <div className="text-3xl font-bold">{assignments.length}</div>
              <p className="text-xs text-orange-100 mt-1">Total tugas aktif</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manajemen Data</CardTitle>
            <CardDescription>
              Kelola data mahasiswa, dosen, mata kuliah, dan tugas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="mahasiswa">Mahasiswa</TabsTrigger>
                <TabsTrigger value="dosen">Dosen</TabsTrigger>
                <TabsTrigger value="course">Mata Kuliah</TabsTrigger>
                <TabsTrigger value="assignment">Tugas</TabsTrigger>
              </TabsList>

              <TabsContent value="mahasiswa" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Data Mahasiswa</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Mahasiswa
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
                        </DialogTitle>
                        <DialogDescription>
                          {editData
                            ? "Perbarui informasi mahasiswa"
                            : "Tambahkan mahasiswa baru ke sistem"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {renderFormFields()}
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {editData ? "Update" : "Simpan"}
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-900">
                          NIM
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Nama
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Jurusan
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Angkatan
                        </th>
                        <th className="text-right p-4 font-semibold text-slate-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(mahasiswa, ["nim", "nama", "jurusan"]).map(
                        (mhs) => (
                          <tr
                            key={mhs.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="p-4 font-medium">{mhs.nim}</td>
                            <td className="p-4">{mhs.nama}</td>
                            <td className="p-4">{mhs.jurusan}</td>
                            <td className="p-4">{mhs.angkatan}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(mhs)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDelete(mhs.id, "mahasiswa")
                                }
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="dosen" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Data Dosen</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleAdd}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Dosen
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editData ? "Edit Dosen" : "Tambah Dosen"}
                        </DialogTitle>
                        <DialogDescription>
                          {editData
                            ? "Perbarui informasi dosen"
                            : "Tambahkan dosen baru ke sistem"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {renderFormFields()}
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            {editData ? "Update" : "Simpan"}
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-900">
                          NIDN
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Nama
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Bidang
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Email
                        </th>
                        <th className="text-right p-4 font-semibold text-slate-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(dosen, ["nidn", "nama", "bidang"]).map(
                        (dsn) => (
                          <tr
                            key={dsn.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="p-4 font-medium">{dsn.nidn}</td>
                            <td className="p-4">{dsn.nama}</td>
                            <td className="p-4">{dsn.bidang}</td>
                            <td className="p-4">{dsn.email}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(dsn)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(dsn.id, "dosen")}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="course" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Data Mata Kuliah</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Mata Kuliah
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
                        </DialogTitle>
                        <DialogDescription>
                          {editData
                            ? "Perbarui informasi mata kuliah"
                            : "Tambahkan mata kuliah baru ke sistem"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {renderFormFields()}
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {editData ? "Update" : "Simpan"}
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Kode
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Nama Mata Kuliah
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          SKS
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Dosen Pengampu
                        </th>
                        <th className="text-right p-4 font-semibold text-slate-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(courses, ["kode", "nama", "dosen"]).map(
                        (course) => (
                          <tr
                            key={course.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="p-4 font-medium">{course.kode}</td>
                            <td className="p-4">{course.nama}</td>
                            <td className="p-4">{course.sks}</td>
                            <td className="p-4">{course.dosen}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(course)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDelete(course.id, "course")
                                }
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Data Tugas</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleAdd}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Tugas
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editData ? "Edit Tugas" : "Tambah Tugas"}
                        </DialogTitle>
                        <DialogDescription>
                          {editData
                            ? "Perbarui informasi tugas"
                            : "Tambahkan tugas baru ke sistem"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {renderFormFields()}
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Batal
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            {editData ? "Update" : "Simpan"}
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Judul Tugas
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Mata Kuliah
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Deadline
                        </th>
                        <th className="text-left p-4 font-semibold text-slate-900">
                          Status
                        </th>
                        <th className="text-right p-4 font-semibold text-slate-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData(assignments, ["judul", "course"]).map(
                        (assignment) => (
                          <tr
                            key={assignment.id}
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="p-4 font-medium">
                              {assignment.judul}
                            </td>
                            <td className="p-4">{assignment.course}</td>
                            <td className="p-4">{assignment.deadline}</td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                {assignment.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(assignment)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDelete(assignment.id, "assignment")
                                }
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
