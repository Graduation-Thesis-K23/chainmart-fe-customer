const convertNumberToK = (num: number): string => {
  if (num >= 1000) {
    const newNum = (num / 1000).toFixed(1) + "k";
    // 1.0k -> 1k
    return newNum.replace(".0", "");
  }
  return num.toString();
};

export default convertNumberToK;
