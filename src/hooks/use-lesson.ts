import { useState, useCallback } from "react";
import { getAssignmentByLesson } from "../api/assignment.api";
import { getLatestSubmission, postSubmission } from "../api/submissions.api";

export function useLessonAssignment() {
  const [assignments, setAssignments] = useState<Record<number, any>>({});
  const [submissions, setSubmissions] = useState<Record<number, any>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    {}
  );
  const [uploadingStates, setUploadingStates] = useState<
    Record<number, boolean>
  >({});

  const fetchSubmission = useCallback(
    async (lessonId: number, assignmentId: number) => {
      try {
        const data = await getLatestSubmission(assignmentId);
        setSubmissions((prev) => ({ ...prev, [lessonId]: data }));
      } catch (err) {
        console.error("Gagal mengambil submission:", err);
      }
    },
    []
  );

  const fetchAssignment = useCallback(
    async (lessonId: number) => {
      if (assignments[lessonId]) return;

      setLoadingStates((prev) => ({ ...prev, [lessonId]: true }));
      try {
        const res = await getAssignmentByLesson(lessonId);
        if (res.length > 0) {
          const currentAssignment = res[0];
          setAssignments((prev) => ({
            ...prev,
            [lessonId]: currentAssignment,
          }));
          await fetchSubmission(lessonId, currentAssignment.id);
        }
      } catch (error) {
        console.error("Error fetch assignment:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [lessonId]: false }));
      }
    },
    [assignments, fetchSubmission]
  );

  const uploadSubmission = useCallback(
    async (lessonId: number, assignmentId: number, file: File) => {
      setUploadingStates((prev) => ({ ...prev, [lessonId]: true }));
      try {
        await postSubmission(assignmentId, file);
        await fetchSubmission(lessonId, assignmentId);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setUploadingStates((prev) => ({ ...prev, [lessonId]: false }));
      }
    },
    [fetchSubmission]
  );

  return {
    assignments,
    submissions,
    loadingStates,
    uploadingStates,
    fetchAssignment,
    uploadSubmission,
  };
}
