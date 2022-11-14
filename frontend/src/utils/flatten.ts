export const flatten = (mapped: any) => {
  const result: string[] = [];

  for (const [key, value] of Object.entries(mapped)) {
    if (typeof value === 'string') {
      result.push(value);
    } else if (typeof value === 'object') {
      result.push(...flatten(value));
    }
  }

  return result;
};
