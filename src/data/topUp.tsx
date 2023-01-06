export interface TopUpProps {
  totalCoin: string;
  price: string;
  initialCoin?: string;
  bonusCoin?: string;
}

const listPrice: TopUpProps[] = [
  {
    totalCoin: '1,000',
    price: '$7.99',
    initialCoin: '',
    bonusCoin: '',
  },
  {
    totalCoin: '2,150',
    price: '$15.99',
    initialCoin: '2,000',
    bonusCoin: '+ 150',
  },
  {
    totalCoin: '4,350',
    price: '$31.99',
    initialCoin: '4,000',
    bonusCoin: '+ 350',
  },
  {
    totalCoin: '6,750',
    price: '$47.99',
    initialCoin: '6,000',
    bonusCoin: '+ 750',
  },
  {
    totalCoin: '11,500',
    price: '$79.99',
    initialCoin: '10,000',
    bonusCoin: '+ 150',
  },
];

export default listPrice;
