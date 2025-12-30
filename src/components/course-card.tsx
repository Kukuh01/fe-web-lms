import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function CourseCard({
  id,
  title,
  dosen,
  pitcure,
}: {
  id: number;
  title: string;
  dosen: string;
  pitcure: string;
}) {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Dosen: {dosen}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={pitcure} alt="" />
      </CardContent>
      <CardFooter className="flex-row-reverse">
        <button
          onClick={() => navigate(`/course/${id}`)}
          className="bg-black text-white p-2 rounded"
        >
          Masuk
        </button>
      </CardFooter>
    </Card>
  );
}
