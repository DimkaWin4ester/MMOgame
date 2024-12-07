// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsonParseOrNull = (val: string | null | undefined): any => {
  try {
    return JSON.parse(val || '');
  } catch {
    return null;
  }
};
