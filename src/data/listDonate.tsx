export interface ListDonateType {
  text: string;
  selected: boolean;
}

export const listDonate: ListDonateType[] = [
  {
    text: 'One Time',
    selected: false,
  },
  {
    text: 'Weekly',
    selected: false,
  },
  {
    text: 'Monthly',
    selected: false,
  },
  {
    text: 'Yearly',
    selected: false,
  },
];
