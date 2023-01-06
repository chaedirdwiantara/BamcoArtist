const dateFormat = (ISOStringDate: string) => {
  const today = new Date(ISOStringDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
  return today;
};

export {dateFormat};
