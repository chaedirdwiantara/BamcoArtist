export interface ListDonateType {
  text: string;
  selected: boolean;
}

export const listDonate: ListDonateType[] = [
  {
    text: 'Setting.Tips.Filter.OneTime',
    selected: false,
  },
  {
    text: 'Setting.Tips.Filter.Weekly',
    selected: false,
  },
  {
    text: 'Setting.Tips.Filter.Monthly',
    selected: false,
  },
  {
    text: 'Setting.Tips.Filter.Yearly',
    selected: false,
  },
];
