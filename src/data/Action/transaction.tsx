import {EventType} from '../../interface/event.interface';
import {TransactionMerch} from '../../interface/transaction.interface';

export const dataTransaction: TransactionMerch[] = [
  {
    id: '1',
    seller: 'Blackpink',
    sellerImage: 'https://picsum.photos/id/1/200',
    status: 1,
    estArrival: '22 Feb - 24 Feb',
    type: EventType.Merch,
    items: [
      {
        name: 'Blackpink In Your Area 2023 Anniversary World Tour Jacket',
        image: 'https://picsum.photos/id/2/200',
        qty: 1,
        totalPrice: 1000,
        addons: [
          {
            id: 'addon-1',
            name: 'Blackpink Limited World Tour 2023 BornPink Cap',
            image: 'https://picsum.photos/id/2/200',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    seller: 'Green Day',
    sellerImage: 'https://picsum.photos/id/3/200',
    status: 1,
    estArrival: '01 Mar - 05 Mar',
    type: EventType.Merch,
    items: [
      {
        name: 'Green Day Jacket Tour 2023',
        image: 'https://picsum.photos/id/4/200',
        qty: 2,
        totalPrice: 2000,
      },
      {
        name: 'Green Day Pants Tour 2023',
        image: 'https://picsum.photos/id/5/200',
        qty: 1,
        totalPrice: 2000,
      },
    ],
  },
  {
    id: '3',
    seller: 'Blink182',
    sellerImage: 'https://picsum.photos/id/6/200',
    status: 2,
    estArrival: '05 Apr - 10 Apr',
    type: EventType.Merch,
    items: [
      {
        name: 'Blink182 live at Jakarta Special T-Shirt',
        image: 'https://picsum.photos/id/7/200',
        qty: 1,
        totalPrice: 1000,
      },
    ],
  },
  {
    id: '4',
    seller: 'MCR',
    sellerImage: 'https://picsum.photos/id/8/200',
    status: 3,
    estArrival: '29 Feb - 01 Apr',
    type: EventType.Merch,
    items: [
      {
        name: 'MCR Comeback Jacket',
        image: 'https://picsum.photos/id/9/200',
        qty: 1,
        totalPrice: 1000,
      },
    ],
  },
  {
    id: '5',
    seller: 'Blackpink',
    sellerImage: 'https://picsum.photos/id/1/200',
    status: 2,
    estArrival: '22 Feb - 24 Feb',
    type: EventType.Concert,
    items: [
      {
        name: 'Blackpink In Your Area 2023 Anniversary World Tour',
        image: 'https://picsum.photos/id/2/200',
        qty: 1,
        totalPrice: 1000,
      },
    ],
  },
];
