import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PageLayout from "../../components/Layouts/PageLayout";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import useMahasiswa from "../../hooks/use-mahasiswa";
import type { Mahasiswa } from "../../types/type";
import { LoadingSpinner } from "../../components/loading-spinner";

export default function ManageMahasiswa() {
  const {
    mahasiswa,
    isLoading,
    error,
    addMahasiswa,
    editMahasiswa,
    removeMahasiswa,
  } = useMahasiswa();

  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<Mahasiswa | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

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

  const handleEdit = (item: any) => {
    setEditData(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const filterData = (data: any, fields: any) => {
    if (!searchTerm) return data;
    return data.filter((item: any) =>
      fields.some((field: any) =>
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSubmit = async () => {
    if (editData) {
      await editMahasiswa(editData.id, formData);
      showNotification("Data berhasil diperbarui");
    } else {
      // Logika Tambah (Simulasi ID baru)
      await addMahasiswa(formData);
      showNotification("Data berhasil ditambahkan");
    }

    setIsDialogOpen(false); // Menutup modal
    setFormData({}); // Reset form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await removeMahasiswa(id);
        showNotification("Data berhasil dihapus");
      } catch (error) {
        showNotification("Gagal menghapus data", "error");
      }
    }
  };

  const renderFormFields = () => {
    return (
      <>
        <div className="space-y-2">
          <Label>NIM</Label>
          <Input
            value={formData.nim || ""}
            onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Nama</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Program Studi</Label>
          <Input
            value={formData.program_studi || ""}
            onChange={(e) =>
              setFormData({ ...formData, program_studi: e.target.value })
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
  };

  return (
    <PageLayout>
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
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Manajemen Data</CardTitle>
            <CardDescription>Kelola data mahasiswa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
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
                      Program Studi
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
                  {filterData(mahasiswa, ["nim", "nama", "program_studi"]).map(
                    (mhs) => (
                      <tr
                        key={mhs.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="p-4 font-medium">{mhs.nim}</td>
                        <td className="p-4">{mhs.name}</td>
                        <td className="p-4">{mhs.program_studi}</td>
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
                            onClick={() => handleDelete(mhs.id, "mahasiswa")}
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
          </CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
