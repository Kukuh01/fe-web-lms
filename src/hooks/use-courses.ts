import { useEffect, useState } from "react";
import type { Course } from "../types/type";
import { getCourses } from "../api/course.api";

export default function useCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchDataCourses();
  }, []);

  return { courses, isLoading, error };
}
