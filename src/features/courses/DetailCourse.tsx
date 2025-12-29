import PageLayout from "../../components/Layouts/PageLayout";
import LessonSection from "../lessons/LessonSection";

export default function DetailCourse() {
  return (
    <PageLayout>
      {/* Start Header */}
      <div className="w-full mb-4">
        {/* Start Judul */}
        <div className="mb-3">
          <p className="font-bold text-2xl lg:text-4xl">Penambangan Data</p>
          <hr className="my-3" />
          <img
            className="rounded-2xl w-full lg:w-2xl mx-auto"
            src="/demo.jpeg"
            alt=""
          />
        </div>
        {/* End Judul */}
        {/* Start Information Box */}
        <div className="flex flex-col space-y-3">
          {/* Start Description */}
          <div className="w-full flex flex-col space-y-3">
            <div className="w-full font-bold text-2xl lg:text-2xl bg-blue-400">
              <p>Deskripsi Kelas</p>
            </div>
            <div>
              <p>PENDAHULUAN</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, repellat possimus exercitationem dolores facere magni
                nihil aliquam, voluptas, enim beatae animi! Similique
                perferendis molestias temporibus qui? Accusantium tempore ea
                quae obcaecati repellendus, fugit sed laudantium labore
                voluptatibus officiis esse iusto.
              </p>
            </div>

            <div>
              <p>PENGAJAR</p>
              <div className="text-base flex flex-col lg:flex-row lg:space-x-1 text-gray-500">
                <p>| Dosen: Dr, Affandi</p>
                <p>| NIDN: A11.2023.14963</p>
                <p>| Contact: 08968798798</p>
              </div>
            </div>

            <div>
              <p>KOMTING</p>
              <div className="text-base flex flex-col lg:flex-row lg:space-x-1 text-gray-500">
                <p>| Komting: Silvanus Kukuh Prasetyo</p>
                <p>| NIM: A11.2023.14963</p>
                <p>| Contact: 08968798798</p>
              </div>
            </div>

            <div>
              <p>KONTRAK KULIAH</p>
              <div className="text-base text-gray-500">
                <p>TUGAS : 40%</p>
                <p>UTS : 25%</p>
                <p>UAS : 25%</p>
              </div>
            </div>

            <div>
              <p>PERATURAN</p>
              <ul className="list-disc pl-6">
                <li>
                  Mahasiswa wajib hadir 75% dari total pertemuan yang dicapai
                  (minimal 14x pertemuan)
                </li>
                <li>
                  Izin ketidakhadiran disampaikan melalui WA Group dan disertai
                  bukti pendukung reasoningnya.
                </li>
                <li>
                  Komunikasi dalam rangka diskusi, pengajuan pertanyaan,
                  distribusi informasi dll disampaikan via group (mohon tidak
                  japri)
                </li>
                <li>
                  Mahasiswa berhak mendapat layanan pembelajaran yang relevan
                  dengan matkul.
                </li>
                <li>
                  Dosen wajib memberikan pelayanan pembelajaran yang
                  sebaik-baiknya.
                </li>
                <li>
                  Mahasiswa dan dosen wajib saling menghormati selama interaksi
                  dan perkuliahan berlangsung
                </li>
              </ul>
            </div>
          </div>
          {/* End Description */}
          {/* Start Media Communication */}
          <div className="space-y-3">
            <div className="w-full font-bold text-2xl lg:text-2xl bg-blue-400">
              <p>Media Komunikasi Pembelajaran</p>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto_2fr] gap-2 w-ful">
              <div>
                <img className="w-10" src="/logoGoogleMeet.png" alt="" />
              </div>
              <div>
                <p>Link Google Meet / Zoom</p>
              </div>
              <div className="text-center">:</div>
              <div className="break-all">
                <a
                  href=""
                  className="underline text-yellow-500 hover:text-blue-600 transition"
                >
                  https://meet.google.com/bgx-xewj-jvc
                </a>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto_2fr] gap-2 w-ful">
              <div>
                <img className="w-10" src="/logoWhatsapp.png" alt="" />
              </div>
              <div>
                <p>Link Group Whatsapp</p>
              </div>
              <div className="text-center">:</div>
              <div className="break-all">
                <a
                  href=""
                  className="underline text-yellow-500 hover:text-blue-600 transition"
                >
                  https://meet.google.com/bgx-xewj-jvc
                </a>
              </div>
            </div>
          </div>
          {/* End Media Communication */}
        </div>
      </div>
      <LessonSection />
      {/* End Header */}
    </PageLayout>
  );
}
