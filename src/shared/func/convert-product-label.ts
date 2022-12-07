const convertProductLabel = (label: number): string => {
  switch (label) {
    case 1:
      return "product.label.1";
    case 2:
      return "product.label.2";
    case 3:
      return "product.label.3";
    default:
      return "";
  }
};

export default convertProductLabel;
