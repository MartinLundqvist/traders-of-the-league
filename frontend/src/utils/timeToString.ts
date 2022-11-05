export const timeDifferenceToString = (
  startTime: number,
  endTime: number
): string => {
  if (!startTime) return '-';

  const delta = endTime - startTime;
  const minutes = Math.floor(delta / 60_000);
  const seconds = Math.floor(delta / 1_000) % 60;
  const minString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minString}:${secString}`;
};

export const timeToString = (time: number): string => {
  const minutes = Math.floor(time / 60_000);
  const seconds = Math.floor(time / 1_000) % 60;
  const minString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minString}:${secString}`;
};
