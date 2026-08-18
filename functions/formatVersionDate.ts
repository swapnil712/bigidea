// "May 16, 2027 5:40 pm" — only ever rendered inside an open dropdown, so it
// stays client-side and can't cause a hydration mismatch.
export const formatVersionDate = (date: Date) =>
  date
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(" at ", " ")
    .replace(/AM|PM/, (meridiem) => meridiem.toLowerCase());
