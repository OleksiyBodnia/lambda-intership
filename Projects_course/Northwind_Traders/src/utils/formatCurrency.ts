export const formatCurrency = (price: string | number) => {
  const cleanPrice =
    typeof price === 'string' ? price.replace(/[^\d.-]/g, '') : price;
  const convertedToNumber = Number(cleanPrice);
  const result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2,
  }).format(convertedToNumber);

  return result;
};
