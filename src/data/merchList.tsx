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
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'Blackpink',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 2,
    title: 'Old Memories T-Shirt Yuhu Gas',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'DJ Snake',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 3,
    title: 'Casual as Usual Flannel',
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'Jackson Wang',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 4,
    title: 'Gray Shirt - 88Rising Edition',
    image:
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'Rich Brian',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 5,
    title: 'Flannel Office Edition',
    image:
      'https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'Martin Garix',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
  {
    id: 6,
    title: 'Flannel Work From Home Edition',
    image:
      'https://images.unsplash.com/photo-1581235707960-23b7e8612c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    owner: 'Blackpink',
    price: 4500,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus',
  },
];
