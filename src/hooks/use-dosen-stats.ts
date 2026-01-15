import { useEffect, useState } from "react";
import { getDosenStats } from "../api/dosen.api";
import type { DosenStats } from "../types/type";

export default function useDosenStats() {
  const [stats, setStats] = useState<DosenStats>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDosenStats();
        setStats(data);
      } catch {
        setError("Failed to load dosen statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
