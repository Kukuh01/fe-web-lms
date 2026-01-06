import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
      {/* Icon berputar */}
      <Loader2 className="h-10 w-10 animate-spin text-blue-900" />

      {/* Teks loading yang manis */}
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Memuat data kursus...
      </p>
    </div>
  );
}
