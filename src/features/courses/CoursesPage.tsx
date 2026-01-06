import CourseCard from "../../components/course-card";
import PageLayout from "../../components/Layouts/PageLayout";
import BASE_URL from "../../utils/baseUrl";
import { LoadingSpinner } from "../../components/loading-spinner";
import useCourse from "../../hooks/use-courses";

export default function CoursesPage() {
  /**
   * Logic
   */
  const { courses, isLoading, error } = useCourse();

  /**
   * Component
   */
  return (
    <PageLayout>
      {/* Main Container*/}
      <div className="p-1">
        <h1 className="text-2xl font-bold mb-6">Courses</h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Course Section */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {courses.map((course, index) => (
                  <CourseCard
                    id={course.id}
                    key={index}
                    title={course.title}
                    dosen={course.instructor.name}
                    pitcure={`${BASE_URL()}/${course.thumbnail}`}
                  />
                ))}
              </div>
            )}
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
