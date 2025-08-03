export function formatCurrency(number: number, currency: string = 'DKK') {
  return new Intl.NumberFormat('da-DK', { style: 'currency', currency }).format(number);
}

export function formatNumber(number: string | number) {
  // Format with thousands separator, no decimals if integer, else up to 2 decimals
  const num = typeof number === 'string' ? Number(number) : number;
  if (isNaN(num)) return '';
  const hasDecimals = num % 1 !== 0;
  return num.toLocaleString('da-DK', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  });
}
