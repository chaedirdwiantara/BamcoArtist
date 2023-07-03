export interface MerchListType {
  id: number;
  title: string;
  image: string;
  owner: string;
  price: number;
  desc?: string;
  currency?: string;
  ownerImage?: string;
  type?: 'merch' | 'concert';
  charge?: '' | 'no_tickets' | 'free_event';
}

export const MerchListItem: MerchListType[] = [
  {
    id: 1,
    title: 'Blackpink In Your Area 2023 Anniversary',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/255px-Flag_of_Indonesia.svg.png',
    owner: 'Indonesia',
    price: 500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 2,
    title: 'Old Memories T-Shirt Yuhu Gas',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Malaya.svg/1280px-Flag_of_Malaya.svg.png',
    owner: 'Malaysia',
    price: 400,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 3,
    title: 'Casual as Usual Flannel',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png',
    owner: 'Singapore',
    price: 250,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 4,
    title: 'Gray Shirt - 88Rising Edition',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/255px-Flag_of_the_People%27s_Republic_of_China.svg.png',
    owner: 'China',
    price: 114,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 5,
    title: 'Gray Shirt - 88Rising Edition',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png',
    owner: 'Japan',
    price: 77,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 6,
    title: 'Gray Shirt - 88Rising Edition',
    image:
      'https://cdn.britannica.com/49/1949-004-8818300C/Flag-South-Korea.jpg',
    owner: 'Kores',
    price: 9,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
];
