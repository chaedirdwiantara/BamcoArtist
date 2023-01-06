export interface ListPlanType {
  title: string;
  subtitle: string;
  coin: string;
  selected: boolean;
}

export const listPlan: ListPlanType[] = [
  {
    title: 'Weekly',
    subtitle:
      'You will get 1 Week exlcusive content with 3 days grace period, you can cancel it anytime.',
    coin: '100 Coin / Week',
    selected: false,
  },
  {
    title: 'Monthly',
    subtitle:
      'You will get 1 Week exlcusive content with 3 days grace period, you can cancel it anytime.',
    coin: '400 Coin / Month',
    selected: false,
  },
  {
    title: 'Yearly',
    subtitle:
      'You will get 1 Week exlcusive content with 3 days grace period, you can cancel it anytime.',
    coin: '4,800 Coin / Year',
    selected: false,
  },
];
