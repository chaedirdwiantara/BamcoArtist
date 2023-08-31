const dateFormat = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
  return today;
};

const dateFormatBirth = (date: Date) => {
  const today = new Date(date);
  const day = today.toLocaleString('default', {day: 'numeric'});
  const month = today.toLocaleString('default', {month: '2-digit'});
  const year = today.getFullYear();

  return year + '-' + month + '-' + day;
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

const dateFormatSubscribe = (ISOStringDate: string | Date) => {
  const today = new Date(ISOStringDate);
  const day = today.toLocaleString('default', {day: 'numeric'});
  const month = today.toLocaleString('default', {month: 'short'});
  const year = today.getFullYear();

  return month + ' ' + day + ', ' + year;
};

const dateFormatHoursMinutes = (date: string) => {
  const today = new Date(date);
  const hours = today.getHours();
  const minutes = today.getMinutes();

  return hours + ':' + minutes;
};

export {
  dateFormat,
  dateFormatBirth,
  dateFormatFullYear,
  dateLongMonth,
  timeToString,
  dateFormatDayOnly,
  dateFormatMonthOnly,
  dateFormatSubscribe,
  dateFormatHoursMinutes,
};
