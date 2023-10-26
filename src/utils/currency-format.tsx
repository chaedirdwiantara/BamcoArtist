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

const kFormatter3 = (num: number = 0) => {
  const numberString = ((Math.sign(num) * Math.abs(num)) / 1000).toString();
  const value = numberString.substring(0);
  return Math.abs(num) > 999 ? value + 'K' : Math.sign(num) * Math.abs(num);
};

const convertToHKD = (num: number = 0, withdraw?: boolean) => {
  const currency = num * 0.0739;
  const afterNum = withdraw ? -4 : -5;
  return Number(currency.toFixed(6).slice(0, afterNum));
};

export {toCurrency, kFormatter, kFormatter2, kFormatter3, convertToHKD};
