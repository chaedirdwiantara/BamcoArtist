export interface ListDonateType {
  text: string;
  selected: boolean;
}

export const listDonate: ListDonateType[] = [
  {
    text: 'One Time Donation',
    selected: false,
  },
  {
    text: 'Recurring Donation Weekly',
    selected: false,
  },
  {
    text: 'Recurring Donation Monthly',
    selected: false,
  },
  {
    text: 'Recurling Donation Yearly',
    selected: false,
  },
];
