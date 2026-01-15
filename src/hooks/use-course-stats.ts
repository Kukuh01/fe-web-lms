import { useEffect, useState } from "react";
import { getCourseStats } from "../api/course.api";
import type { CourseStats } from "../types/type";

export default function useCourseStats() {
  const [stats, setStats] = useState<CourseStats>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getCourseStats();
        setStats(data);
      } catch {
        setError("Failed to load course statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
