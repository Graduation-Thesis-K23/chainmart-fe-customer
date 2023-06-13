// https://stackoverflow.com/a/59787784

export const isEmptyObject = (obj: object) => {
  for (const i in obj) return false;
  return true;
};
