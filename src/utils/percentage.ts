export const getPercentage = (firstValue: number, secondValue: number) => {
  return `${Math.round(((firstValue - secondValue) / firstValue) * 100)} %`;
};
