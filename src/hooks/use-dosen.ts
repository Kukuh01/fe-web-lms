import { useEffect, useState } from "react";
import type { Dosen } from "../types/type";
import {
  createDosen,
  deleteDosen,
  getDosen,
  updateDosen,
} from "../api/dosen.api";

export default function useDosen() {
  const [dosen, setDosen] = useState<Dosen[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataDosen = async () => {
    try {
      const data = await getDosen();
      setDosen(data);
    } catch {
      setError("Failed to load dosen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDosen();
  }, []);

  // Action: Create
  const addDosen = async (data: Omit<Dosen, "id">) => {
    await createDosen(data);
    await fetchDataDosen();
  };

  // Action: Edit
  const editDosen = async (id: number, data: Partial<Dosen>) => {
    await updateDosen(id, data);
    await fetchDataDosen();
  };

  // Action: Delete
  const removeDosen = async (id: number) => {
    await deleteDosen(id);
    await fetchDataDosen();
  };

  return {
    dosen,
    isLoading,
    error,
    addDosen,
    editDosen,
    removeDosen,
  };
}
