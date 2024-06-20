// Format the date string according to UI
// values for month is either short or long
export function formatDateString(isoString, month) {
  const date = new Date(isoString);

  const options = { year: "numeric", month: month, day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}


// this is for the one with dashes
export function formatDateDash(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
