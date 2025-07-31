export const formatDate = (inputDate?: string) => {
  if (!inputDate) return "";

  const d = new Date(inputDate);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Janvier = 0

  return `${day}/${month}`;
};
