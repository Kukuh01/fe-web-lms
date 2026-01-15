import React, { useEffect, useState } from "react";
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
import { gradeSubmission } from "../../api/submissions.api";
import { deleteAssignment, saveAssignment } from "../../api/assignment.api";
import { createLesson, deleteLesson, updateLesson } from "../../api/lesson.api";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../api/course.api";
import BASE_URL from "../../utils/baseUrl";

export default function ManageCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [openSubmissionDialog, setOpenSubmissionDialog] = useState(false); // Tambahan state dialog submission
  const [openGradeDialog, setOpenGradeDialog] = useState(false);

  // Selection States
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [expandedLessons, setExpandedLessons] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Forms
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    linkMeet: "",
    linkWa: "",
    instructor_id: "",
    thumbnail: null,
  });

  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [gradeForm, setGradeForm] = useState({
    grade: "",
    feedback: "",
  });

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses();
      // Pastikan data adalah array
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat data courses. " + (err.message || ""));
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Lesson Accordion
  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // --- COURSE HANDLERS ---
  const handleSaveCourse = async () => {
    if (!courseForm.title || !courseForm.instructor_id) {
      alert("Judul Course dan Instructor harus diisi!");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", courseForm.title);
      formData.append("description", courseForm.description || "");
      formData.append("linkMeet", courseForm.linkMeet || "");
      formData.append("linkWa", courseForm.linkWa || "");
      formData.append("instructor_id", courseForm.instructor_id);

      if (courseForm.thumbnail instanceof File) {
        formData.append("thumbnail", courseForm.thumbnail);
      }

      if (editingCourse !== null) {
        const courseId = courses[editingCourse].id;
        await updateCourse(courseId, formData);
      } else {
        await createCourse(formData);
      }

      await fetchCourses();
      resetCourseForm();
      setOpenCourseDialog(false);
    } catch (err) {
      alert(
        "Gagal menyimpan course: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditCourse = (index) => {
    setEditingCourse(index);
    const course = courses[index];
    setCourseForm({
      title: course.title || "",
      description: course.description || "",
      linkMeet: course.linkMeet || "",
      linkWa: course.linkWa || "",
      instructor_id: course.instructor?.id || course.instructor_id || "",
      thumbnail: null,
    });
    setOpenCourseDialog(true);
  };

  const handleDeleteCourse = async (index) => {
    if (!window.confirm("Yakin ingin menghapus course ini?")) return;
    try {
      await deleteCourse(courses[index].id);
      await fetchCourses();
    } catch (err) {
      alert("Gagal menghapus course.");
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: "",
      description: "",
      linkMeet: "",
      linkWa: "",
      instructor_id: "",
      thumbnail: null,
    });
    setEditingCourse(null);
  };

  // --- LESSON HANDLERS ---
  const handleOpenAddLesson = (courseIndex) => {
    setSelectedCourseIndex(courseIndex);
    setEditingLesson(null);
    resetLessonForm();
    setOpenLessonDialog(true);
  };

  const handleSaveLesson = async () => {
    if (!lessonForm.title) return alert("Judul Lesson harus diisi!");
    try {
      setSubmitting(true);
      const courseId = courses[selectedCourseIndex].id;
      if (editingLesson !== null) {
        const lessonId = courses[selectedCourseIndex].lessons[editingLesson].id;
        await updateLesson(lessonId, lessonForm);
      } else {
        await createLesson(courseId, lessonForm);
      }
      await fetchCourses();
      setOpenLessonDialog(false);
      resetLessonForm();
    } catch (err) {
      alert("Gagal menyimpan lesson.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditLesson = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setEditingLesson(lessonIndex);
    const lesson = courses[courseIndex].lessons[lessonIndex];
    setLessonForm({
      title: lesson.title || "",
      description: lesson.description || "",
      content: lesson.content || "",
    });
    setOpenLessonDialog(true);
  };

  const handleDeleteLesson = async (courseIndex, lessonIndex) => {
    if (!window.confirm("Hapus lesson ini?")) return;
    try {
      const lessonId = courses[courseIndex].lessons[lessonIndex].id;
      await deleteLesson(lessonId);
      await fetchCourses();
    } catch (err) {
      alert("Gagal menghapus lesson.");
    }
  };

  const resetLessonForm = () => {
    setLessonForm({ title: "", description: "", content: "" });
    setEditingLesson(null);
  };

  // --- ASSIGNMENT HANDLERS ---
  const handleOpenAddAssignment = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setSelectedLessonIndex(lessonIndex);
    const lesson = courses[courseIndex].lessons[lessonIndex];
    if (lesson.assignment) {
      setAssignmentForm({
        title: lesson.assignment.title || "",
        description: lesson.assignment.description || "",
        deadline: lesson.assignment.deadline
          ? lesson.assignment.deadline.slice(0, 16)
          : "",
      });
    } else {
      resetAssignmentForm();
    }
    setOpenAssignmentDialog(true);
  };

  const handleSaveAssignment = async () => {
    if (!assignmentForm.title || !assignmentForm.deadline)
      return alert("Isi data lengkap!");
    try {
      setSubmitting(true);
      const lessonId =
        courses[selectedCourseIndex].lessons[selectedLessonIndex].id;
      const formattedData = {
        ...assignmentForm,
        deadline: new Date(assignmentForm.deadline).toISOString(),
      };
      await saveAssignment(lessonId, formattedData);
      await fetchCourses();
      setOpenAssignmentDialog(false);
      resetAssignmentForm();
    } catch (err) {
      alert("Gagal menyimpan assignment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (courseIndex, lessonIndex) => {
    if (!window.confirm("Hapus assignment?")) return;
    try {
      const lessonId = courses[courseIndex].lessons[lessonIndex].id;
      await deleteAssignment(lessonId);
      await fetchCourses();
    } catch (err) {
      alert("Gagal menghapus assignment.");
    }
  };

  const resetAssignmentForm = () => {
    setAssignmentForm({ title: "", description: "", deadline: "" });
  };

  // --- SUBMISSION HANDLERS ---
  const handleOpenSubmissions = (courseIndex, lessonIndex) => {
    setSelectedCourseIndex(courseIndex);
    setSelectedLessonIndex(lessonIndex);
    setOpenSubmissionDialog(true);
  };

  const handleOpenGradeDialog = (submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      grade: submission.grade || "",
      feedback: submission.feedback || "",
    });
    setOpenGradeDialog(true);
  };

  const handleSaveGrade = async () => {
    if (!gradeForm.grade) return alert("Nilai harus diisi!");
    try {
      setSubmitting(true);
      await gradeSubmission(selectedSubmission.id, {
        grade: parseFloat(gradeForm.grade),
        feedback: gradeForm.feedback || "",
      });
      await fetchCourses();
      setOpenGradeDialog(false);
      setGradeForm({ grade: "", feedback: "" });
      setSelectedSubmission(null);
    } catch (err) {
      alert("Gagal menyimpan nilai.");
    } finally {
      setSubmitting(false);
    }
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

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
          {/* HEADER */}
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
                    <Label>Instructor ID *</Label>
                    <Input
                      placeholder="ID Dosen"
                      value={courseForm.instructor_id}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          instructor_id: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          thumbnail: e.target.files[0],
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
                  <Button onClick={handleSaveCourse} disabled={submitting}>
                    {submitting ? "Menyimpan..." : "Simpan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>

          {/* LIST COURSES */}
          {loading ? (
            <div className="text-center py-10">Memuat data...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="grid gap-6">
              {courses.length === 0 ? (
                <Card className="border-2 border-dashed border-slate-300">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-slate-500 text-center">
                      Belum ada course.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                courses.map((course, courseIndex) => (
                  <Card key={course.id} className="border-2 border-slate-200">
                    <CardHeader className="bg-slate-50/50">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className="w-xl h-16 bg-slate-200 rounded object-cover overflow-hidden flex items-center justify-center">
                            {course.thumbnail ? (
                              <img
                                src={`${BASE_URL()}/${course.thumbnail}`}
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
                              Instructor: {course.instructor?.name || "Unknown"}
                            </CardDescription>
                            {course.description && (
                              <p className="text-sm text-slate-600 mt-2">
                                {course.description}
                              </p>
                            )}
                            <div className="flex gap-3 mt-2">
                              {/* Safe check for links */}
                              {course.linkMeet && (
                                <a
                                  href={course.linkMeet}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  Link Meet
                                </a>
                              )}
                              {course.linkWa && (
                                <a
                                  href={course.linkWa}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-green-600 hover:underline"
                                >
                                  Link WA
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
                      {/* PERBAIKAN 1: Gunakan Optional Chaining (?.) untuk lessons */}
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" /> Daftar
                        Lesson ({course.lessons?.length || 0})
                      </h3>

                      <div className="w-full space-y-3">
                        {/* PERBAIKAN 2: Safe Map */}
                        {course.lessons?.map((lesson, lessonIndex) => (
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
                                    <Edit2 className="h-3 w-3 mr-2" /> Edit
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteLesson(
                                        courseIndex,
                                        lessonIndex
                                      )
                                    }
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-3 w-3 mr-2" /> Hapus
                                  </Button>
                                </div>

                                {lesson.description && (
                                  <div className="bg-slate-50 p-4 rounded-md">
                                    <Label className="text-xs font-bold text-slate-500">
                                      Deskripsi
                                    </Label>
                                    <p className="text-sm mt-1 break-words whitespace-pre-wrap">
                                      {lesson.description}
                                    </p>
                                  </div>
                                )}
                                {lesson.content && (
                                  <div className="bg-slate-50 p-4 rounded-md">
                                    <Label className="text-xs font-bold text-slate-500">
                                      Materi
                                    </Label>
                                    <p className="text-sm mt-1">
                                      {lesson.content}
                                    </p>
                                  </div>
                                )}

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
                                        <Users className="mr-2 h-4 w-4" /> Lihat
                                        Submissions (
                                        {lesson.assignment.submissions
                                          ?.length || 0}
                                        )
                                      </Button>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-slate-500 italic">
                                      Belum ada assignment.
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          className="w-full border-2 border-dashed border-slate-300 text-slate-500 py-6"
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
          )}

          {/* --- DIALOGS --- */}

          {/* Lesson Dialog */}
          <Dialog open={openLessonDialog} onOpenChange={setOpenLessonDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLesson !== null ? "Edit Lesson" : "Tambah Lesson"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Judul *</Label>
                  <Input
                    value={lessonForm.title}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={lessonForm.description}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Konten</Label>
                  <Textarea
                    value={lessonForm.content}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, content: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveLesson} disabled={submitting}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Assignment Dialog */}
          <Dialog
            open={openAssignmentDialog}
            onOpenChange={setOpenAssignmentDialog}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kelola Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Judul *</Label>
                  <Input
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
                    value={assignmentForm.description}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        description: e.target.value,
                      })
                    }
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
                <Button onClick={handleSaveAssignment} disabled={submitting}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Submission Dialog - Saya uncomment dan perbaiki */}
          <Dialog
            open={openSubmissionDialog}
            onOpenChange={setOpenSubmissionDialog}
          >
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Daftar Submissions</DialogTitle>
              </DialogHeader>

              {selectedCourseIndex !== null && selectedLessonIndex !== null && (
                <div className="mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="p-3">Mahasiswa</th>
                        <th className="p-3">NIM</th>
                        <th className="p-3">Waktu</th>
                        <th className="p-3">File</th>
                        <th className="p-3">Nilai</th>
                        <th className="p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* PERBAIKAN 3: Safe access submissions */}
                      {courses[selectedCourseIndex]?.lessons[
                        selectedLessonIndex
                      ]?.assignment?.submissions?.length > 0 ? (
                        courses[selectedCourseIndex].lessons[
                          selectedLessonIndex
                        ].assignment.submissions.map((sub) => (
                          <tr
                            key={sub.id}
                            className="border-b hover:bg-slate-50"
                          >
                            <td className="p-3">{sub.student_name}</td>
                            <td className="p-3 text-slate-500">
                              {sub.student_nim}
                            </td>
                            <td className="p-3 text-xs">
                              {new Date(sub.lastModified).toLocaleDateString()}
                            </td>
                            <td className="p-3">
                              <a
                                href={sub.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                File
                              </a>
                            </td>
                            <td className="p-3 font-bold">
                              {sub.grade ?? "-"}
                            </td>
                            <td className="p-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleOpenGradeDialog(sub)}
                              >
                                Nilai
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-4 text-center text-slate-500"
                          >
                            Belum ada submission.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Grade Dialog */}
          <Dialog open={openGradeDialog} onOpenChange={setOpenGradeDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Beri Nilai</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nilai (0-100)</Label>
                  <Input
                    type="number"
                    value={gradeForm.grade}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, grade: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feedback</Label>
                  <Textarea
                    value={gradeForm.feedback}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, feedback: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveGrade} disabled={submitting}>
                  Simpan Nilai
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PageLayout>
  );
}
