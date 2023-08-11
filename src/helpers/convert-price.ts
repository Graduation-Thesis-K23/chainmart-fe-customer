const convertPrice = (price: number | undefined): string => {
  if (!price) {
    return `0 VND`;
  }
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
};

export default convertPrice;
