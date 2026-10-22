// Utility to convert timestamp/date → formatted date
export function formatDate(dateInput: string | number): string {
  const date =
    typeof dateInput === "number"
      ? new Date(dateInput * 1000) // SQL timestamp (seconds)
      : new Date(dateInput);

  // Example output: 17 Jan 2026
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
