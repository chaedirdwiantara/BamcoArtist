const dateFormat = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
  return today;
};

const dateFormatDayOnly = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
  });
  return today;
};

const dateFormatMonthOnly = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    month: 'short',
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

const timeToString = (totalSeconds: number) => {
  const totalMs = totalSeconds * 1000;
  const result = new Date(totalMs).toISOString().slice(14, 19);

  return result;
};

export {
  dateFormat,
  dateFormatFullYear,
  dateLongMonth,
  timeToString,
  dateFormatDayOnly,
  dateFormatMonthOnly,
};
