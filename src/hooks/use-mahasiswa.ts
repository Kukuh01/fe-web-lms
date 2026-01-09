import { useEffect, useState } from "react";
import type { Mahasiswa } from "../types/type";
import {
  createMahasiswa,
  deleteMahasiswa,
  getMahasiswa,
  updateMahasiswa,
} from "../api/mahasiswa.api";

export default function useMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataMahasiswa = async () => {
    try {
      const data = await getMahasiswa();
      setMahasiswa(data);
    } catch {
      setError("Failed to load mahasiswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMahasiswa();
  }, []);

  // Action: Create
  const addMahasiswa = async (data: Omit<Mahasiswa, "id">) => {
    await createMahasiswa(data);
    await fetchDataMahasiswa();
  };

  // Action: Edit
  const editMahasiswa = async (id: number, data: Partial<Mahasiswa>) => {
    await updateMahasiswa(id, data);
    await fetchDataMahasiswa();
  };

  // Action: Delete
  const removeMahasiswa = async (id: number) => {
    await deleteMahasiswa(id);
    await fetchDataMahasiswa();
  };

  return {
    mahasiswa,
    isLoading,
    error,
    addMahasiswa,
    editMahasiswa,
    removeMahasiswa,
  };
}
