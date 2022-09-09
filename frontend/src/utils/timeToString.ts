export const timeToString = (startTime: number, endTime: number): string => {
  if (!startTime) return 'Not started';

  const delta = endTime - startTime;
  const minutes = Math.floor(delta / 60_000);
  const seconds = Math.floor(delta / 1_000) % 60;
  const minString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minString}:${secString}`;
};
