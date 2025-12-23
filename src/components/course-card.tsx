import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function CourseCard({
  title,
  dosen,
  pitcure,
}: {
  title: string;
  dosen: string;
  pitcure: string;
}) {
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
        <button className="bg-black text-white p-2 rounded">Masuk</button>
      </CardFooter>
    </Card>
  );
}
