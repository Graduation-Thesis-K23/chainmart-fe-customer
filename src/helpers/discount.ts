const discount = (price: number, ignorePrice: number): number => {
  const discount = Math.round((1 - price / ignorePrice) * 100);

  return discount;
};

export default discount;
