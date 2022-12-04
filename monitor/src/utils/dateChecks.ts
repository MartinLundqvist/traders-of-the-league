export const lessThanTwoDaysOld = (date: unknown): boolean => {
  const now = new Date();
  let dateParam: Date;

  if (typeof date === 'string') {
    dateParam = new Date(date);
  } else {
    dateParam = date as Date;
  }

  const diff = now.getTime() - dateParam.getTime();
  return diff < 1000 * 60 * 60 * 24 * 2;
};
