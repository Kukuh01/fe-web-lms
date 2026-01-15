import { useEffect, useState } from "react";
import { getMahasiswaStats } from "../api/mahasiswa.api";
import type { MahasiswaStats } from "../types/type";

export default function useMahasiswaStats() {
  const [stats, setStats] = useState<MahasiswaStats>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMahasiswaStats();
        setStats(data);
      } catch {
        setError("Failed to load mahasiswa statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
