export interface DataRewardMenuType {
  value: string;
  label: string;
}
export const rewardMenu: DataRewardMenuType[] = [
  {
    value: '1',
    label: 'Available Voucher',
  },
  {
    value: '2',
    label: 'My Voucher',
  },
];

export const missionMenu: DataRewardMenuType[] = [
  {
    value: '1',
    label: 'Daily Mission',
  },
  {
    value: '2',
    label: 'One-time',
  },
  {
    value: '3',
    label: 'Repeatable',
  },
];
