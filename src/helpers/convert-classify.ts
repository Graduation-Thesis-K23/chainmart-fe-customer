const convertClassify = (obj: object): string => {
  let result = "";
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key as keyof typeof obj];
      result += key + ": " + element + ", ";
    }
  }

  return result.slice(0, -2);
};

export default convertClassify;
