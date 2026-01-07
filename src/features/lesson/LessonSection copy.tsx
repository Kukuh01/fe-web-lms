import { Book, FileText, Upload, RefreshCw } from "lucide-react"; // Tambahkan icon
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
import { useState, useRef } from "react"; // Tambahkan useRef
import { Button } from "../../components/ui/button";
import { getLatestSubmission, postSubmission } from "../../api/submissions.api";

export default function LessonSection({ lessons }: { lessons: Lesson[] }) {
  const [activeData, setActiveData] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Ref untuk mengakses input file secara programatik
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSubmissionData = async (assignmentId: number) => {
    try {
      const data = await getLatestSubmission(assignmentId);
      setSubmission(data);
    } catch (err) {
      console.error("Gagal mengambil data submission", err);
      setSubmission(null);
    }
  };

  const handleAccordionChange = async (values: string[]) => {
    // Ambil item terakhir yang baru saja diklik/dibuka
    const lastOpened = values[values.length - 1];

    if (!lastOpened) return;

    const lessonId = lastOpened.split("-")[1];

    try {
      setLoading(true);
      const assignments = await getAssignmentByLesson(Number(lessonId));
      if (assignments.length > 0) {
        const currentAssignment = assignments[0];
        setActiveData(currentAssignment);
        await fetchSubmissionData(currentAssignment.id);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeData) return;

    try {
      setUploading(true);
      await postSubmission(activeData.id, file);
      await fetchSubmissionData(activeData.id);
      alert("Tugas berhasil diunggah!");
    } catch (error) {
      alert("Upload gagal");
    } finally {
      setUploading(false);
      // Reset input file agar bisa memilih file yang sama lagi jika perlu
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Fungsi untuk memicu klik pada input file tersembunyi
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* Input File Tersembunyi */}
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
        {lessons.map((lesson) => (
          <AccordionItem value={`item-${lesson.id}`} key={lesson.id}>
            <AccordionTrigger className="bg-gray-200 p-2 font-medium border-l-4 border-l-blue-900 lg:text-xl mb-5">
              {lesson.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="pl-6 space-y-2">
                {/* ... (Deskripsi & Bahan Ajar tetap sama) ... */}

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
                    {loading ? (
                      <p className="p-4 italic">Memeriksa tugas...</p>
                    ) : activeData ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl font-medium">
                            {activeData.title}
                          </h3>
                          <p className="text-gray-600">
                            {activeData.description}
                          </p>
                        </div>

                        <div className="rounded-md border overflow-hidden w-full">
                          <Table className="w-full table-fixed md:table-auto">
                            <TableBody>
                              {/* Row Status */}
                              <TableRow>
                                <TableCell className="w-[120px] md:w-1/3 font-medium bg-muted">
                                  Status
                                </TableCell>
                                <TableCell className="break-words font-medium">
                                  {submission
                                    ? "Sudah Mengirim"
                                    : "Belum Mengirim"}
                                </TableCell>
                              </TableRow>

                              {/* Row Last Modified */}
                              <TableRow>
                                <TableCell className="font-medium bg-muted">
                                  Terakhir Diubah
                                </TableCell>
                                <TableCell>
                                  {submission?.lastModified
                                    ? new Date(
                                        submission.lastModified
                                      ).toLocaleString("id-ID")
                                    : "-"}
                                </TableCell>
                              </TableRow>

                              {/* Row File */}
                              <TableRow>
                                <TableCell className="font-medium bg-muted">
                                  File
                                </TableCell>
                                <TableCell>
                                  {submission?.file ? (
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-purple-600" />
                                      <a
                                        href={submission.file}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline truncate block max-w-xs"
                                      >
                                        Lihat File yang Diupload
                                      </a>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">
                                      Belum ada file
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>

                              {/* Row Grade */}
                              <TableRow>
                                <TableCell className="font-medium bg-muted">
                                  Nilai
                                </TableCell>
                                <TableCell>
                                  {!submission ? (
                                    <span className="text-gray-400">
                                      Kosong
                                    </span>
                                  ) : submission.grade !== null &&
                                    submission.grade !== undefined ? (
                                    <span className="text-green-600 font-bold">
                                      {submission.grade} / 100
                                    </span>
                                  ) : (
                                    <span className="text-amber-600">
                                      Menunggu Penilaian
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        {/* Button Action Group */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={triggerFileInput}
                            disabled={uploading}
                            variant={submission ? "outline" : "default"}
                            className={
                              !submission ? "bg-blue-900 hover:bg-blue-800" : ""
                            }
                          >
                            {uploading ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : submission ? (
                              <RefreshCw className="mr-2 h-4 w-4" />
                            ) : (
                              <Upload className="mr-2 h-4 w-4" />
                            )}
                            {uploading
                              ? "Mengunggah..."
                              : submission
                              ? "Ganti File"
                              : "Upload Tugas"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="p-4 text-gray-500 italic">
                        Tidak ada penugasan.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
