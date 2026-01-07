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
import { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import BASE_URL from "../../utils/baseUrl";
import { getFileName } from "../../utils/fileHelper";
import { useLessonAssignment } from "../../hooks/use-lesson";

export default function LessonSection({ lessons }: { lessons: Lesson[] }) {
  /**
   * Logic
   */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentProcess, setCurrentProcess] = useState<{
    lessonId: number;
    assignmentId: number;
  } | null>(null);

  // Mengambil segalanya dari hook
  const {
    assignments,
    submissions,
    loadingStates,
    uploadingStates,
    fetchAssignment,
    uploadSubmission,
  } = useLessonAssignment();

  const handleAccordionChange = (values: string[]) => {
    const lastOpened = values[values.length - 1];
    if (!lastOpened) return;
    const lessonId = Number(lastOpened.split("-")[1]);
    fetchAssignment(lessonId);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentProcess) return;

    const result = await uploadSubmission(
      currentProcess.lessonId,
      currentProcess.assignmentId,
      file
    );

    if (result.success) {
      alert("Berhasil!");
    } else {
      alert("Gagal upload");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    setCurrentProcess(null);
  };

  const handleFileUpload = (lessonId: number, assignmentId: number) => {
    setCurrentProcess({ lessonId, assignmentId });
    fileInputRef.current?.click();
  };

  /**
   * Component
   */
  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />

      <Accordion
        type="multiple"
        className="w-full"
        onValueChange={handleAccordionChange}
      >
        {lessons.map((lesson) => {
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
                  {/* Start Description Lesson */}
                  <div className="flex flex-col">
                    <div className="flex bg-gray-200">
                      <div className="mr-3 bg-blue-900 text-amber-50 text-2xl p-2">
                        <MdDescription />
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium">Deskripsi Pertemuan</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        {lesson.description}
                        <p className="font-medium">Pokok Bahasan: </p>
                        <ol className="list-decimal pl-6">
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                        </ol>
                      </div>
                      <div>
                        <p className="font-medium">Capaian Pembelajaran: </p>
                        <ol className="list-decimal pl-6">
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                          <li>
                            Penjelasan tentang dataset (koleksi data) beserta
                            atribut dan tipe datanya.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  {/* End Description Lesson */}
                  {/* Start Bahan Materi */}
                  <div className="flex flex-col">
                    <div className="flex bg-gray-200">
                      <div className="mr-3 bg-blue-900 text-amber-50 text-2xl p-2">
                        <Book />
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium">Bahan Ajar</p>
                      </div>
                    </div>
                    <div>{lesson.content}</div>
                  </div>
                  {/* End Bahan Materi */}

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
                                    {itemSubmission?.file_url ? (
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-purple-600" />
                                        <a
                                          href={`${BASE_URL()}/${
                                            itemSubmission.file_url
                                          }`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 underline truncate block max-w-xs"
                                        >
                                          {getFileName(itemSubmission.file_url)}
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
                                handleFileUpload(lesson.id, itemAssignment.id)
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
