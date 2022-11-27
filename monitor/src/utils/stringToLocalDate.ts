export const stringToLocalDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toDateString();
};
