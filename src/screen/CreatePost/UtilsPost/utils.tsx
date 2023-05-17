export const convertCategoryValue = (input: string): string => {
  switch (input) {
    case 'coming_up':
      return 'Home.Tab.TopPost.Category.ComingUp';
    case 'otr':
      return 'Home.Tab.TopPost.Category.Tour';
    case 'day_in_life':
      return 'Home.Tab.TopPost.Category.DailyLife';
    case 'behind_the_scene':
      return 'Home.Tab.TopPost.Category.BTS';
    case 'highlight':
      return 'Home.Tab.TopPost.Category.Highlight';
    case 'backstage':
      return 'Home.Tab.TopPost.Category.Backstage';
    default:
      return input;
  }
};
