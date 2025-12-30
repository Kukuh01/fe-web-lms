import { Book, FileText } from "lucide-react";
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

export default function LessonSection({ lessons }: { lessons: Lesson[] }) {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {lessons.map((lesson) => (
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
                {/* Start Assignment */}
                <div className="flex flex-col">
                  <div className="flex bg-gray-200">
                    <div className="mr-3 bg-blue-900 text-amber-50 text-2xl p-2">
                      <MdAssignment />
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium">Penugasan</p>
                    </div>
                  </div>
                  {/* Start Form Assignment */}
                  <div>
                    <div className="text-2xl font-medium">Judul Tugas</div>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Obcaecati veritatis vero, laudantium possimus voluptatum
                        vitae perspiciatis! Eum, ratione incidunt? Ipsa nam sed
                        obcaecati in itaque velit optio laborum voluptate,
                        incidunt quibusdam esse repudiandae voluptatum iusto
                        aspernatur quis magni repellat cupiditate?
                      </p>
                    </div>
                    <div className="rounded-md border overflow-hidden w-full">
                      {/* overflow-hidden agar border tidak bocor */}
                      <Table className="w-full table-fixed md:table-auto">
                        {/* Fixed pada mobile, Auto pada desktop */}
                        <TableBody>
                          <TableRow>
                            <TableCell className="w-[120px] md:w-1/3 font-medium bg-muted whitespace-nowrap">
                              Status
                            </TableCell>
                            <TableCell className="break-words">
                              {/* Memaksa teks panjang turun ke bawah */}
                              Submitted for grading
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium bg-muted whitespace-nowrap">
                              Time remaining
                            </TableCell>
                            <TableCell className="text-green-600 break-words text-sm md:text-base">
                              Assignment was submitted 3 hours 55 mins early
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium bg-muted">
                              File
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-purple-600 shrink-0" />
                                  <span className="text-primary hover:underline cursor-pointer truncate max-w-[150px] md:max-w-full">
                                    Tugas 1 - Silvanus...
                                  </span>
                                </div>
                                <span className="text-[10px] md:text-sm text-muted-foreground">
                                  (13 Oct 2025)
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  {/* End Form Assignment */}
                </div>
                {/* End Assigment */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
