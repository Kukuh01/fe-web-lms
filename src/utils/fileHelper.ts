export const getFileName = (url: string | null | undefined): string => {
  if (!url) return "-";
  return url.split("/").pop() || "File";
};
