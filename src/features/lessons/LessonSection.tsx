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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export default function LessonSection() {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-gray-200 p-2 font-medium border-l-4 border-l-blue-900 lg:text-xl mb-5">
            Pertemuan Minggu ke-1 - Pengantar Data Mining
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
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
                <div></div>
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
                  <div className="rounded-md border">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium bg-muted">
                            Submission status
                          </TableCell>
                          <TableCell>Submitted for grading</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium bg-muted">
                            Grading status
                          </TableCell>
                          <TableCell>Not graded</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium bg-muted">
                            Time remaining
                          </TableCell>
                          <TableCell className="text-green-600">
                            Assignment was submitted 3 hours 55 mins early
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium bg-muted">
                            Last modified
                          </TableCell>
                          <TableCell>
                            Monday, 13 October 2025, 8:04 PM
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium bg-muted">
                            File submissions
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-purple-600" />
                            <span className="text-primary hover:underline cursor-pointer">
                              Tugas 1 - Silvanus Kukuh Prasetyo
                            </span>
                            <span className="text-sm text-muted-foreground">
                              (13 October 2025, 8:04 PM)
                            </span>
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
      </Accordion>
    </div>
  );
}
