const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-");

  return `${day}${months[Number(month) - 1]}${year}`;
}