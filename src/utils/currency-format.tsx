/** === TYPE === */
interface ToCurrencyOptions {
  withFraction?: boolean;
}
/** === FUNCTION === */
const toCurrency = (nominal: number = 0, options: ToCurrencyOptions = {}) => {
  const {withFraction = true} = options;
  let transformed: string;

  if (withFraction) {
    transformed = nominal.toFixed(2);
  } else {
    transformed = nominal.toString();
  }

  const [currency, decimal] = transformed.split('.');
  const converted = `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${
    withFraction ? ',' + decimal : ''
  }`;

  return converted;
};

const kFormatter = (num: number = 0, fixed: number = 0) => {
  let toK =
    Math.abs(num) > 999
      ? ((Math.sign(num) * Math.abs(num)) / 1000).toFixed(fixed) + 'K'
      : Math.sign(num) * Math.abs(num);
  const converted = `${toK.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  return converted;
};

const kFormatter2 = (num: number = 0, fixed: number = 0) => {
  return Math.abs(num) > 999
    ? ((Math.sign(num) * Math.abs(num)) / 1000).toFixed(fixed) + 'K'
    : Math.sign(num) * Math.abs(num);
};

export {toCurrency, kFormatter, kFormatter2};
