export interface ListPlanType {
  title: string;
  subtitle: string;
  coin: string;
  time: string;
  selected: boolean;
}

export const listPlan: ListPlanType[] = [
  {
    title: 'ExclusiveContent.Weekly',
    subtitle:
      'You will get 1 Week exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `100 Coin / `,
    time: 'ExclusiveContent.Week',
    selected: false,
  },
  {
    title: 'ExclusiveContent.Monthly',
    subtitle:
      'You will get 1 Month exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `400 Coin / `,
    time: 'ExclusiveContent.Month',
    selected: false,
  },
  {
    title: 'ExclusiveContent.Yearly',
    subtitle:
      'You will get 1 Year exclusive content with 3 days grace period, you can cancel it anytime.',
    coin: `4,800 Coin / `,
    time: 'ExclusiveContent.Year',
    selected: false,
  },
];
