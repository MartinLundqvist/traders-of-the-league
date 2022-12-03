export const stringToLocalDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toDateString();
};

export const epochToLocalDate = (datems: number): string => {
  if (!datems) {
    return '_(No date provided)_';
  }

  const date = new Date(datems);
  return date.toDateString();
};

export const UTCStringToLocalDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
