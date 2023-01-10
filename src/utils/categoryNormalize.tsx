const categoryNormalize = (text: string) => {
  let textResult = '';
  switch (text) {
    case 'backstage':
      textResult = 'Backstage';
      break;
    case 'behind_the_scene':
      textResult = 'Behind The Scene';
      break;
    case 'otr':
      textResult = 'Tour';
      break;
    case 'day_in_life':
      textResult = 'Daily Life';
      break;
    case 'coming_up':
      textResult = 'Coming Up';
      break;
    case 'highlight':
      textResult = 'Highlight';
      break;
    default:
      textResult = 'Highlight';
  }
  return textResult;
};

export default categoryNormalize;
