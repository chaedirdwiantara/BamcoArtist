export interface ListPriceProps {
  totalCoin: string;
  price: string;
  initialCoin: string;
  bonusCoin: string;
}

export interface ListTransactionProps {
  text: string;
  date: string;
  from: string;
}

export interface ListWithdrawalProps {
  transactionAmount: number;
  conversionAmount: number;
  idMusician: string;
  date: string;
  status: string;
  notes: string;
  isOpen?: boolean;
}

const listPrice: ListPriceProps[] = [
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

const listTransaction: ListTransactionProps[] = [
  {
    text: '2.500 credits received from',
    date: 'Dec 19, 2022',
    from: '@fanbase',
  },
  {
    text: '500 credits received from',
    date: 'Dec 18, 2022',
    from: '@hakunamatata',
  },
  {
    text: '500 credits received from',
    date: 'Dec 17, 2022',
    from: '@hakunamatata',
  },
  {
    text: '2,150 Credit have been purchased!',
    date: 'Dec 16, 2022',
    from: '',
  },
];

const listWithdrawal: ListWithdrawalProps[] = [
  {
    transactionAmount: 10000,
    conversionAmount: 10000,
    idMusician: '50352657444',
    date: 'Des 10, 2022',
    status: 'Pending',
    notes: '',
  },
  {
    transactionAmount: 40000,
    conversionAmount: 50000,
    idMusician: '50352657231',
    date: 'Des 05, 2022',
    status: 'Success',
    notes: '',
  },
  {
    transactionAmount: 100000,
    conversionAmount: 125000,
    idMusician: '50352657897',
    date: 'Des 01, 2022',
    status: 'Rejected',
    notes: 'Your withdrawal have been rejected due bank iBeamcoes',
  },
];

export {listPrice, listTransaction, listWithdrawal};
