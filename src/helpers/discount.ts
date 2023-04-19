const discount = (price: number, sale: number): number => {
  return price + Math.round((sale / 100) * price);
};

export default discount;
