import { useEffect, useState } from "react";
import CourseCard from "../../components/course-card";
import PageLayout from "../../components/Layouts/PageLayout";
import type { Course } from "../../types/type";
import { getCourses } from "../../api/course.api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingAllCourses, setLoadingAllCourses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_MEDIA = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    const fetchDataCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch {
        setError("Failed to load course");
      } finally {
        setLoadingAllCourses(false);
      }
    };

    fetchDataCourses();
  }, []);

  if (loadingAllCourses) {
    return <p>Loading courses...</p>;
  }
  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <PageLayout>
      {/* Main Container*/}
      <div className="p-1">
        <h1 className="text-2xl font-bold mb-6">Courses</h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Course Section */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((course, index) => (
                <CourseCard
                  id={course.id}
                  key={index}
                  title={course.title}
                  dosen={course.instructor.name}
                  pitcure={`${BASE_MEDIA}/${course.thumbnail}`}
                />
              ))}
            </div>
          </div>

          {/* Assignments Section*/}
          <div className="lg:col-span-4">
            <div className="sticky top-6 p-4 border-2 rounded-xl bg-card">
              <h2 className="text-xl font-semibold mb-4">Assignments</h2>
              <p className="text-muted-foreground text-sm">
                Belum ada tugas yang perlu dikumpulkan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
