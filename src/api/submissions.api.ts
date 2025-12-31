import http from "../services/http";

// Ambil data submission berdasarkan ID Assignment
export const getLatestSubmission = async (assignmentId: number) => {
  const response = await http.get(
    `/submissions/assignment/${assignmentId}/latest/`
  );
  return response.data;
};

// Upload submission baru
export const postSubmission = async (assignmentId: number, file: File) => {
  const formData = new FormData();
  formData.append("assignment_id", assignmentId.toString());
  formData.append("file", file);

  const response = await http.post("/submissions/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
