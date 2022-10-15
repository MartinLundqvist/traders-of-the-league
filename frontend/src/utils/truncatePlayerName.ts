export const truncatePlayerName = (name: string, length: number): string => {
  if (name.length < length) return name;

  return name.slice(0, length).trim() + '...';
};
