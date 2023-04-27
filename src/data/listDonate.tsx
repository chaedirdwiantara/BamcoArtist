export interface ListDonateType {
  text: string;
  value: string;
}

export const listCredit: ListDonateType[] = [
  {
    text: '5 Credit',
    value: '5',
  },
  {
    text: '100 Credit',
    value: '100',
  },
  {
    text: '10 Credit',
    value: '10',
  },
  {
    text: '200 Credit',
    value: '200',
  },
  {
    text: '50 Credit',
    value: '50',
  },
  {
    text: '500 Credit',
    value: '500',
  },
];

export const creditType: ListDonateType[] = [
  {
    text: 'Only one time',
    value: 'only_one_time',
  },
  {
    text: 'Daily',
    value: 'daily',
  },
  {
    text: 'Weekly',
    value: 'weekly',
  },
  {
    text: 'Monthly',
    value: 'monthly',
  },
  {
    text: 'Yearly',
    value: 'yearly',
  },
];
