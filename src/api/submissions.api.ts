import api from "../services/axios";

// Ambil data submission berdasarkan ID Assignment
export const getLatestSubmission = async (assignmentId: number) => {
  const response = await api.get(`/submissions/assignment/${assignmentId}`);
  return response.data;
};

// Upload submission baru
export const postSubmission = async (assignmentId: number, file: File) => {
  const formData = new FormData();
  formData.append("assignment_id", assignmentId.toString());
  formData.append("file", file);

  const response = await api.post("/submissions/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const gradeSubmission = async (submissionId: number, data: any) => {
  // Data: { grade: 90, feedback: "Good" }
  await api.post(`/submissions/${submissionId}/grade`, data);
};
