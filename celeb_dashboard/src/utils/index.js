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

export const convertToISOWithGivenTime = (dateString, timeString) => {
  const date = new Date(dateString);

  const [hours, minutes] = timeString.split(":").map(Number);

  date.setUTCHours(hours, minutes, 0, 0);

  const isoString = date.toISOString();

  return isoString;
};

export const addOneWeekToISO = (isoString) => {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Add one week (7 days) to the date
  date.setUTCDate(date.getUTCDate() + 7);

  // Get the new ISO string
  const newISOString = date.toISOString();

  return newISOString;
};
