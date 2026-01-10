import React, { useState } from "react";
import {
  BookOpen,
  Edit2,
  FileText,
  Plus,
  Trash2,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import PageLayout from "../../components/Layouts/PageLayout";

export default function ManageCourse() {
  const [courses, setCourses] = useState([]);
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [expandedLessons, setExpandedLessons] = useState({});

  // Course Form State
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    linkMeet: "",
    linkWa: "",
    instructor: "",
    thumbnail: null,
  });

  // Lesson Form State
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    content: "",
  });

  // Assignment Form State
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  // Submission State
  const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false);
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeForm, setGradeForm] = useState({
    grade: "",
    feedback: "",
  });

  // Toggle Lesson Accordion
  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // Course Functions
  const handleSaveCourse = () => {
    if (!courseForm.title || !courseForm.instructor) {
      alert("Judul Course dan Instructor harus diisi!");
      return;
    }

    if (editingCourse !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editingCourse] = {
        ...courses[editingCourse],
        ...courseForm,
      };
      setCourses(updatedCourses);
      setEditingCourse(null);
    } else {
      setCourses([
        ...courses,
        {
          ...courseForm,
          id: Date.now(),
          lessons: [],
        },
      ]);
    }

    resetCourseForm();
    setOpenCourseDialog(false);
  };

  const handleEditCourse = (index) => {
    setEditingCourse(index);
    setCourseForm({
      title: courses[index].title,
      description: courses[index].description,
      linkMeet: courses[index].linkMeet,
      linkWa: courses[index].linkWa,
      instructor: courses[index].instructor,
      thumbnail: courses[index].thumbnail,
    });
    setOpenCourseDialog(true);
  };

  const handleDeleteCourse = (index) => {
    if (
      window.confirm(
        "Yakin ingin menghapus course ini beserta semua lesson dan assignment?"
      )
    ) {
      setCourses(courses.filter((_, idx) => idx !== index));
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: "",
      description: "",
      linkMeet: "",
      linkWa: "",
      instructor: "",
      thumbnail: null,
    });
    setEditingCourse(null);
  };

  // Lesson Functions
  const handleOpenAddLesson = (courseIndex) => {
    setSelectedCourseIndex(courseIndex);
    setEditingLesson(null);
    resetLessonForm();
    setOpenLessonDialog(true);
  };

  const handleSaveLesson = () => {
    if (!lessonForm.title) {
      alert("Judul Lesson harus diisi!");
      return;
    }

    const updatedCourses = [...courses];

    if (editingLesson !== null) {
      updatedCourses[selectedCourseIndex].lessons[editingLesson] = {
        ...updatedCourses[selectedCourseIndex].lessons[editingLesson],
        ...lessonForm,
      };
    } else {
      updatedCourses[selectedCourseIndex].lessons.push({
        ...lessonForm,
        id: Date.now(),
        assignment: null,
      });
    }

    setCourses(updatedCourses);
    resetLessonForm();
    setOpenLessonDialog(false);
  };

  const handleEditLesson = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setEditingLesson(lessonIndex);
    const lesson = courses[courseIndex].lessons[lessonIndex];
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
    });
    setOpenLessonDialog(true);
  };

  const handleDeleteLesson = (courseIndex, lessonIndex) => {
    if (
      window.confirm("Yakin ingin menghapus lesson ini beserta assignmentnya?")
    ) {
      const updatedCourses = [...courses];
      updatedCourses[courseIndex].lessons = updatedCourses[
        courseIndex
      ].lessons.filter((_, idx) => idx !== lessonIndex);
      setCourses(updatedCourses);
    }
  };

  const resetLessonForm = () => {
    setLessonForm({
      title: "",
      description: "",
      content: "",
    });
    setEditingLesson(null);
  };

  // Assignment Functions
  const handleOpenAddAssignment = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setSelectedLessonIndex(lessonIndex);
    const lesson = courses[courseIndex].lessons[lessonIndex];
    if (lesson.assignment) {
      setAssignmentForm({
        title: lesson.assignment.title,
        description: lesson.assignment.description,
        deadline: lesson.assignment.deadline,
      });
    } else {
      resetAssignmentForm();
    }
    setOpenAssignmentDialog(true);
  };

  const handleSaveAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.deadline) {
      alert("Judul dan Deadline Assignment harus diisi!");
      return;
    }

    const updatedCourses = [...courses];
    updatedCourses[selectedCourseIndex].lessons[
      selectedLessonIndex
    ].assignment = {
      ...assignmentForm,
      id: Date.now(),
      submissions: [],
    };

    setCourses(updatedCourses);
    resetAssignmentForm();
    setOpenAssignmentDialog(false);
  };

  const handleDeleteAssignment = (courseIndex, lessonIndex) => {
    if (window.confirm("Yakin ingin menghapus assignment ini?")) {
      const updatedCourses = [...courses];
      updatedCourses[courseIndex].lessons[lessonIndex].assignment = null;
      setCourses(updatedCourses);
    }
  };

  const resetAssignmentForm = () => {
    setAssignmentForm({
      title: "",
      description: "",
      deadline: "",
    });
  };

  const formatDeadline = (datetime) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Submission Functions
  const handleOpenSubmissions = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setSelectedLessonIndex(lessonIndex);
    setOpenSubmissionDialog(true);
  };

  const handleOpenGradeDialog = (submission, submissionIndex) => {
    setSelectedSubmission(submissionIndex);
    setGradeForm({
      grade: submission.grade || "",
      feedback: submission.feedback || "",
    });
    setOpenGradeDialog(true);
  };

  const handleSaveGrade = () => {
    if (!gradeForm.grade) {
      alert("Nilai harus diisi!");
      return;
    }

    const updatedCourses = [...courses];
    const submissions =
      updatedCourses[selectedCourseIndex].lessons[selectedLessonIndex]
        .assignment.submissions;

    submissions[selectedSubmission] = {
      ...submissions[selectedSubmission],
      grade: gradeForm.grade,
      feedback: gradeForm.feedback,
      gradedAt: new Date().toISOString(),
    };

    setCourses(updatedCourses);
    setOpenGradeDialog(false);
    setGradeForm({ grade: "", feedback: "" });
  };

  // Mock function to add sample submissions (untuk demo)
  const addSampleSubmission = (courseIndex, lessonIndex) => {
    const updatedCourses = [...courses];
    const assignment =
      updatedCourses[courseIndex].lessons[lessonIndex].assignment;

    if (!assignment.submissions) {
      assignment.submissions = [];
    }

    const sampleNames = [
      "Ivan Christianto",
      "Siti Nurhaliza",
      "Ahmad Dhani",
      "Raisa Andriana",
      "Afgan Syahreza",
    ];
    const randomName =
      sampleNames[Math.floor(Math.random() * sampleNames.length)];

    assignment.submissions.push({
      id: Date.now(),
      studentName: randomName,
      studentId: "2024" + Math.floor(Math.random() * 10000),
      submittedAt: new Date().toISOString(),
      fileUrl: "#",
      fileName: "tugas_" + randomName.split(" ")[0].toLowerCase() + ".pdf",
      grade: null,
      feedback: null,
      gradedAt: null,
    });

    setCourses(updatedCourses);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Kurikulum & Materi
              </h1>
              <p className="text-slate-500">
                Kelola Course, Lesson, dan Assignment.
              </p>
            </div>
            <Dialog open={openCourseDialog} onOpenChange={setOpenCourseDialog}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600"
                  onClick={() => resetCourseForm()}
                >
                  <Plus className="mr-2 h-4 w-4" /> Buat Course Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingCourse !== null ? "Edit Course" : "Tambah Course"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Judul Course *</Label>
                    <Input
                      placeholder="Contoh: Web Development Dasar"
                      value={courseForm.title}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea
                      placeholder="Deskripsi course..."
                      value={courseForm.description}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Instructor *</Label>
                    <Input
                      placeholder="Nama Dosen/Instructor"
                      value={courseForm.instructor}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          instructor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Thumbnail URL</Label>
                    <Input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={courseForm.thumbnail || ""}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          thumbnail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Link Meet</Label>
                      <Input
                        placeholder="https://..."
                        value={courseForm.linkMeet}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            linkMeet: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Link WA Group</Label>
                      <Input
                        placeholder="https://..."
                        value={courseForm.linkWa}
                        onChange={(e) =>
                          setCourseForm({
                            ...courseForm,
                            linkWa: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setOpenCourseDialog(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleSaveCourse}>Simpan Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>

          {/* List Course */}
          <div className="grid gap-6">
            {courses.length === 0 ? (
              <Card className="border-2 border-dashed border-slate-300">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-500 text-center">
                    Belum ada course. Klik "Buat Course Baru" untuk memulai.
                  </p>
                </CardContent>
              </Card>
            ) : (
              courses.map((course, courseIndex) => (
                <Card key={course.id} className="border-2 border-slate-200">
                  <CardHeader className="bg-slate-50/50">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-24 h-16 bg-slate-200 rounded object-cover overflow-hidden flex items-center justify-center">
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <BookOpen className="h-8 w-8 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>
                            Instructor: {course.instructor}
                          </CardDescription>
                          {course.description && (
                            <p className="text-sm text-slate-600 mt-2">
                              {course.description}
                            </p>
                          )}
                          <div className="flex gap-3 mt-2">
                            {course.linkMeet && (
                              <a
                                href={course.linkMeet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Link Meet
                              </a>
                            )}
                            {course.linkWa && (
                              <a
                                href={course.linkWa}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 hover:underline"
                              >
                                Link WA Group
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCourse(courseIndex)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCourse(courseIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" /> Daftar
                      Lesson ({course.lessons.length})
                    </h3>

                    <div className="w-full space-y-3">
                      {course.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="border rounded-lg bg-white"
                        >
                          <button
                            onClick={() => toggleLesson(lesson.id)}
                            className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-4 w-full">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">
                                {lessonIndex + 1}
                              </span>
                              <span className="flex-1 text-left font-medium">
                                {lesson.title}
                              </span>
                              <div className="flex items-center gap-2">
                                {expandedLessons[lesson.id] ? (
                                  <ChevronDown className="h-5 w-5 text-slate-500" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-slate-500" />
                                )}
                              </div>
                            </div>
                          </button>

                          {expandedLessons[lesson.id] && (
                            <div className="px-4 pb-4 space-y-4">
                              <div className="flex gap-2 pt-2 border-t">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleEditLesson(courseIndex, lessonIndex)
                                  }
                                >
                                  <Edit2 className="h-3 w-3 mr-2" />
                                  Edit Lesson
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteLesson(courseIndex, lessonIndex)
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3 mr-2" />
                                  Hapus
                                </Button>
                              </div>

                              {lesson.description && (
                                <div className="bg-slate-50 p-4 rounded-md">
                                  <Label className="text-xs uppercase text-slate-500 font-bold">
                                    Deskripsi
                                  </Label>
                                  <p className="text-sm mt-1">
                                    {lesson.description}
                                  </p>
                                </div>
                              )}

                              {lesson.content && (
                                <div className="bg-slate-50 p-4 rounded-md">
                                  <Label className="text-xs uppercase text-slate-500 font-bold">
                                    Konten Materi
                                  </Label>
                                  <p className="text-sm mt-1">
                                    {lesson.content}
                                  </p>
                                </div>
                              )}

                              {/* Assignment Section */}
                              <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-sm font-bold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-orange-500" />{" "}
                                    Assignment
                                  </h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 h-7"
                                    onClick={() =>
                                      handleOpenAddAssignment(
                                        courseIndex,
                                        lessonIndex
                                      )
                                    }
                                  >
                                    {lesson.assignment
                                      ? "Edit Assignment"
                                      : "Tambah Assignment"}
                                  </Button>
                                </div>

                                {lesson.assignment ? (
                                  <div className="bg-orange-50/50 border border-orange-100 p-3 rounded-md">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">
                                          {lesson.assignment.title}
                                        </p>
                                        {lesson.assignment.description && (
                                          <p className="text-xs text-slate-600 mt-1">
                                            {lesson.assignment.description}
                                          </p>
                                        )}
                                        <p className="text-xs text-slate-500 mt-2">
                                          Deadline:{" "}
                                          {formatDeadline(
                                            lesson.assignment.deadline
                                          )}
                                        </p>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteAssignment(
                                            courseIndex,
                                            lessonIndex
                                          )
                                        }
                                      >
                                        <Trash2 className="h-3 w-3 text-red-500" />
                                      </Button>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="bg-white mt-2"
                                          onClick={() =>
                                            handleOpenSubmissions(
                                              courseIndex,
                                              lessonIndex
                                            )
                                          }
                                        >
                                          <Users className="mr-2 h-4 w-4" />
                                          Lihat Submissions (
                                          {lesson.assignment.submissions
                                            ?.length || 0}
                                          )
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Submissions:{" "}
                                            {lesson.assignment.title}
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div className="flex justify-between items-center">
                                            <p className="text-sm text-slate-600">
                                              Total Submissions:{" "}
                                              {lesson.assignment.submissions
                                                ?.length || 0}
                                            </p>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() =>
                                                addSampleSubmission(
                                                  courseIndex,
                                                  lessonIndex
                                                )
                                              }
                                            >
                                              <Plus className="h-4 w-4 mr-2" />
                                              Tambah Sample Data
                                            </Button>
                                          </div>
                                          <div className="border rounded-lg overflow-hidden">
                                            <table className="w-full text-sm">
                                              <thead className="bg-slate-50">
                                                <tr>
                                                  <th className="p-3 text-left">
                                                    Mahasiswa
                                                  </th>
                                                  <th className="p-3 text-left">
                                                    NIM
                                                  </th>
                                                  <th className="p-3 text-left">
                                                    Waktu Submit
                                                  </th>
                                                  <th className="p-3 text-left">
                                                    File
                                                  </th>
                                                  <th className="p-3 text-center">
                                                    Nilai
                                                  </th>
                                                  <th className="p-3 text-center">
                                                    Aksi
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {!lesson.assignment
                                                  .submissions ||
                                                lesson.assignment.submissions
                                                  .length === 0 ? (
                                                  <tr>
                                                    <td
                                                      colSpan="6"
                                                      className="p-8 text-center text-slate-500"
                                                    >
                                                      Belum ada submission
                                                    </td>
                                                  </tr>
                                                ) : (
                                                  lesson.assignment.submissions.map(
                                                    (submission, subIndex) => (
                                                      <tr
                                                        key={submission.id}
                                                        className="border-t hover:bg-slate-50"
                                                      >
                                                        <td className="p-3">
                                                          {
                                                            submission.studentName
                                                          }
                                                        </td>
                                                        <td className="p-3 text-slate-600">
                                                          {submission.studentId}
                                                        </td>
                                                        <td className="p-3 text-xs text-slate-500">
                                                          {new Date(
                                                            submission.submittedAt
                                                          ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                              day: "numeric",
                                                              month: "short",
                                                              year: "numeric",
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                            }
                                                          )}
                                                        </td>
                                                        <td className="p-3">
                                                          <a
                                                            href={
                                                              submission.fileUrl
                                                            }
                                                            className="text-blue-600 hover:underline text-xs"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                          >
                                                            {
                                                              submission.fileName
                                                            }
                                                          </a>
                                                        </td>
                                                        <td className="p-3 text-center">
                                                          {submission.grade ? (
                                                            <div>
                                                              <span
                                                                className={`font-bold ${
                                                                  submission.grade >=
                                                                  80
                                                                    ? "text-green-600"
                                                                    : submission.grade >=
                                                                      60
                                                                    ? "text-blue-600"
                                                                    : "text-red-600"
                                                                }`}
                                                              >
                                                                {
                                                                  submission.grade
                                                                }
                                                              </span>
                                                              {submission.feedback && (
                                                                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                                                                  {
                                                                    submission.feedback
                                                                  }
                                                                </p>
                                                              )}
                                                            </div>
                                                          ) : (
                                                            <span className="text-slate-400 text-xs">
                                                              Belum dinilai
                                                            </span>
                                                          )}
                                                        </td>
                                                        <td className="p-3 text-center">
                                                          <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                              handleOpenGradeDialog(
                                                                submission,
                                                                subIndex
                                                              )
                                                            }
                                                          >
                                                            {submission.grade
                                                              ? "Edit Nilai"
                                                              : "Beri Nilai"}
                                                          </Button>
                                                        </td>
                                                      </tr>
                                                    )
                                                  )
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                ) : (
                                  <p className="text-sm text-slate-500 italic">
                                    Belum ada assignment untuk lesson ini
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Tombol Tambah Lesson */}
                      <Button
                        variant="outline"
                        className="w-full border-2 border-dashed border-slate-300 text-slate-500 py-6 hover:border-blue-400 hover:text-blue-600"
                        onClick={() => handleOpenAddLesson(courseIndex)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Tambah Lesson Baru
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Dialog Tambah/Edit Lesson */}
          <Dialog open={openLessonDialog} onOpenChange={setOpenLessonDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingLesson !== null
                    ? "Edit Lesson"
                    : "Tambah Lesson Baru"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Judul Lesson *</Label>
                  <Input
                    placeholder="Contoh: Pengenalan DOM dan Event Listener"
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    placeholder="Deskripsi singkat lesson..."
                    value={lessonForm.description}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        description: e.target.value,
                      })
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Konten Materi</Label>
                  <Textarea
                    placeholder="Konten lengkap materi pembelajaran..."
                    value={lessonForm.content}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, content: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenLessonDialog(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveLesson}>Simpan Lesson</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog Tambah/Edit Assignment */}
          <Dialog
            open={openAssignmentDialog}
            onOpenChange={setOpenAssignmentDialog}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedLessonIndex !== null &&
                  courses[selectedCourseIndex]?.lessons[selectedLessonIndex]
                    ?.assignment
                    ? "Edit Assignment"
                    : "Tambah Assignment"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Judul Assignment *</Label>
                  <Input
                    placeholder="Contoh: Membuat Kalkulator Sederhana"
                    value={assignmentForm.title}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    placeholder="Deskripsi tugas..."
                    value={assignmentForm.description}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deadline *</Label>
                  <Input
                    type="datetime-local"
                    value={assignmentForm.deadline}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenAssignmentDialog(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveAssignment}>
                  Simpan Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog Penilaian Submission */}
          <Dialog open={openGradeDialog} onOpenChange={setOpenGradeDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Beri Nilai Submission</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nilai (0-100) *</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Masukkan nilai"
                    value={gradeForm.grade}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, grade: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feedback/Catatan</Label>
                  <Textarea
                    placeholder="Berikan feedback untuk mahasiswa..."
                    value={gradeForm.feedback}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, feedback: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenGradeDialog(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveGrade}>Simpan Nilai</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PageLayout>
  );
}
