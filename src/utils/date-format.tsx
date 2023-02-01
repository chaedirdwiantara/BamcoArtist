const dateFormat = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
  return today;
};

const dateFormatFullYear = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return today;
};

const dateLongMonth = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // February 14, 2020
  return today;
};

export {dateFormat, dateFormatFullYear, dateLongMonth};
