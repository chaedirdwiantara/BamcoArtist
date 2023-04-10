export interface ListDonateType {
  text: string;
  value: string;
}

export const listCredit: ListDonateType[] = [
  {
    text: '5 credit',
    value: '5',
  },
  {
    text: '50 credit',
    value: '50',
  },
  {
    text: '100 credit',
    value: '100',
  },
  {
    text: '1000 credit',
    value: '1000',
  },
  {
    text: 'Custom',
    value: 'custom',
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
