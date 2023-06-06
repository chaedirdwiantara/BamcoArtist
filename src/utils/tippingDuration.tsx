const tippingDuration = (duration: number) => {
  switch (duration) {
    case 1:
      return 'Daily';

    case 7:
      return 'Weekly';

    case 30:
      return 'Monthly';

    case 365:
      return 'Yearly';

    default:
      return 'One Time';
  }
};

export {tippingDuration};
