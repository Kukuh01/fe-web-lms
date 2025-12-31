import { Book, FileText, Upload, RefreshCw } from "lucide-react";
import { MdAssignment, MdDescription } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import type { Lesson } from "../../types/type";
import { getAssignmentByLesson } from "../../api/assignment.api";
import { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { getLatestSubmission, postSubmission } from "../../api/submissions.api";

export default function LessonSection({ lessons }: { lessons: Lesson[] }) {
  // --- PERBAIKAN: Gunakan Mapping State ---
  const [assignments, setAssignments] = useState<Record<number, any>>({});
  const [submissions, setSubmissions] = useState<Record<number, any>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );
  const [uploadingStates, setUploadingStates] = useState<
    Record<number, boolean>
  >({});

  // State bantuan untuk tahu assignment mana yang sedang diproses saat upload
  const [currentProcessingAssignment, setCurrentProcessingAssignment] =
    useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSubmissionData = async (
    lessonId: number,
    assignmentId: number
  ) => {
    try {
      const data = await getLatestSubmission(assignmentId);
      setSubmissions((prev) => ({ ...prev, [lessonId]: data }));
    } catch (err) {
      console.error("Gagal mengambil data submission", err);
    }
  };

  const handleAccordionChange = async (values: string[]) => {
    const lastOpened = values[values.length - 1];
    if (!lastOpened) return;

    const lessonId = Number(lastOpened.split("-")[1]);

    // Jika data sudah ada di state, tidak perlu fetch ulang (optimasi)
    if (assignments[lessonId]) return;

    try {
      setLoadingStates((prev) => ({ ...prev, [lessonId]: true }));
      const res = await getAssignmentByLesson(lessonId);

      if (res.length > 0) {
        const currentAssignment = res[0];
        setAssignments((prev) => ({ ...prev, [lessonId]: currentAssignment }));
        await fetchSubmissionData(lessonId, currentAssignment.id);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [lessonId]: false }));
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Gunakan currentProcessingAssignment agar tahu ini untuk lesson yang mana
    if (!file || !currentProcessingAssignment) return;

    const { lessonId, assignmentId } = currentProcessingAssignment;

    try {
      setUploadingStates((prev) => ({ ...prev, [lessonId]: true }));
      await postSubmission(assignmentId, file);
      await fetchSubmissionData(lessonId, assignmentId);
      alert("Tugas berhasil diunggah!");
    } catch (error) {
      alert("Upload gagal");
    } finally {
      setUploadingStates((prev) => ({ ...prev, [lessonId]: false }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCurrentProcessingAssignment(null);
    }
  };

  const triggerFileInput = (lessonId: number, assignmentId: number) => {
    setCurrentProcessingAssignment({ lessonId, assignmentId });
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
      />

      <Accordion
        type="multiple"
        className="w-full"
        onValueChange={handleAccordionChange}
      >
        {lessons.map((lesson) => {
          // Ambil data spesifik lesson ini dari mapping state
          const itemAssignment = assignments[lesson.id];
          const itemSubmission = submissions[lesson.id];
          const isItemLoading = loadingStates[lesson.id];
          const isItemUploading = uploadingStates[lesson.id];

          return (
            <AccordionItem value={`item-${lesson.id}`} key={lesson.id}>
              <AccordionTrigger className="bg-gray-200 p-2 font-medium border-l-4 border-l-blue-900 lg:text-xl mb-5">
                {lesson.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <div className="pl-6 space-y-2">
                  {/* ... Deskripsi & Bahan Ajar ... */}

                  <div className="flex flex-col">
                    <div className="flex bg-gray-200">
                      <div className="mr-3 bg-blue-900 text-amber-50 text-2xl p-2">
                        <MdAssignment />
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium">Penugasan</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      {isItemLoading ? (
                        <p className="p-4 italic text-blue-600">
                          Memeriksa tugas...
                        </p>
                      ) : itemAssignment ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-2xl font-medium">
                              {itemAssignment.title}
                            </h3>
                            <p className="text-gray-600">
                              {itemAssignment.description}
                            </p>
                          </div>

                          <div className="rounded-md border overflow-hidden w-full">
                            <Table className="w-full table-fixed md:table-auto">
                              <TableBody>
                                <TableRow>
                                  <TableCell className="w-[120px] md:w-1/3 font-medium bg-muted">
                                    Status
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {itemSubmission ? (
                                      <span className="text-green-600">
                                        Sudah Mengirim
                                      </span>
                                    ) : (
                                      <span className="text-red-500">
                                        Belum Mengirim
                                      </span>
                                    )}
                                  </TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell className="font-medium bg-muted">
                                    Terakhir Diubah
                                  </TableCell>
                                  <TableCell>
                                    {itemSubmission?.lastModified
                                      ? new Date(
                                          itemSubmission.lastModified
                                        ).toLocaleString("id-ID")
                                      : "-"}
                                  </TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell className="font-medium bg-muted">
                                    File
                                  </TableCell>
                                  <TableCell>
                                    {itemSubmission?.file ? (
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-purple-600" />
                                        <a
                                          href={itemSubmission.file}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 underline truncate block max-w-xs"
                                        >
                                          Lihat Submission
                                        </a>
                                      </div>
                                    ) : (
                                      "-"
                                    )}
                                  </TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell className="font-medium bg-muted">
                                    Nilai
                                  </TableCell>
                                  <TableCell>
                                    {itemSubmission?.grade !== null &&
                                    itemSubmission?.grade !== undefined ? (
                                      <span className="font-bold text-green-700">
                                        {itemSubmission.grade} / 100
                                      </span>
                                    ) : itemSubmission ? (
                                      <span className="text-amber-600 italic">
                                        Menunggu Penilaian
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              onClick={() =>
                                triggerFileInput(lesson.id, itemAssignment.id)
                              }
                              disabled={isItemUploading}
                              variant={itemSubmission ? "outline" : "default"}
                              className={
                                !itemSubmission
                                  ? "bg-blue-900 hover:bg-blue-800"
                                  : ""
                              }
                            >
                              {isItemUploading ? (
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              ) : itemSubmission ? (
                                <RefreshCw className="mr-2 h-4 w-4" />
                              ) : (
                                <Upload className="mr-2 h-4 w-4" />
                              )}
                              {isItemUploading
                                ? "Mengunggah..."
                                : itemSubmission
                                ? "Ganti File"
                                : "Upload Tugas"}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="p-4 text-gray-500 italic">
                          Tidak ada penugasan untuk pertemuan ini.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
