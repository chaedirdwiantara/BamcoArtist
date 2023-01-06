const initialname = (fullname: string) => {
  const matches = fullname.match(/\b(\w)/g) || [];
  const acronym = matches.join('').slice(0, 2);

  return acronym;
};

export default initialname;
