import { useEffect, useState } from "react";
import type { Course } from "../types/type";
import { getCourseDetail } from "../api/course.api";

export default function useCourseDetails(courseId: string | undefined) {
  const [course, setCourse] = useState<Course>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    const fetchCourseDetails = async () => {
      try {
        const data = await getCourseDetail(Number(courseId));
        setCourse(data);
      } catch {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  return { course, isLoading, error };
}
