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

export default function AssignmentsPage() {
  return (
    <PageLayout>
      <div>
        <h1>Assignments</h1>
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <CourseCard
              title={item.title}
              dosen={item.dosen}
              pitcure={item.pitcure}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
