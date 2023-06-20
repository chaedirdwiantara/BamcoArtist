export const dataCart = [
  {
    id: '1',
    seller: 'Blackpink',
    sellerImage: 'https://picsum.photos/id/1/200',
    isSelected: false,
    coDelivery: null,
    coCourier: null,
    items: [
      {
        id: 'item-1',
        name: 'Blackpink In Your Area 2023 Anniversary World Tour Jacket',
        image: 'https://picsum.photos/id/2/200',
        qty: 1,
        totalPrice: 1000,
        isSelected: false,
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
    isSelected: false,
    coDelivery: null,
    coCourier: null,
    items: [
      {
        id: 'item-2',
        name: 'Green Day Jacket Tour 2023',
        image: 'https://picsum.photos/id/4/200',
        qty: 2,
        totalPrice: 2000,
        isSelected: false,
      },
      {
        id: 'item-3',
        name: 'Green Day Pants Tour 2023',
        image: 'https://picsum.photos/id/5/200',
        qty: 1,
        totalPrice: 2000,
        isSelected: false,
      },
    ],
  },
];
