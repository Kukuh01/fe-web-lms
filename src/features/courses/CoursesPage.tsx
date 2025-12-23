import CourseCard from "../../components/course-card";
import PageLayout from "../../components/Layouts/PageLayout";

const items = [
  {
    title: "Penambangan Data",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
  {
    title: "Kecerdasan Buatan",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
  {
    title: "Pemrograman Web Lanjut",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
  {
    title: "Basis Data",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
  {
    title: "Literasi Digital",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
  {
    title: "Sitem Terdistribusi",
    dosen: "Dr. Afandi",
    pitcure: "demo.jpeg",
  },
];

export default function CoursesPage() {
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
              {items.map((item, index) => (
                <CourseCard
                  key={index}
                  title={item.title}
                  dosen={item.dosen}
                  pitcure={item.pitcure}
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
