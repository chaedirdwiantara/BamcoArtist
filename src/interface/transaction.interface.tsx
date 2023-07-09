export interface TransactionMerch {
  id: string;
  seller: string;
  sellerImage: string;
  status: number;
  estArrival: string;
  items: {
    name: string;
    image: string;
    qty: number;
    totalPrice: number;
    addons?: {
      id: string;
      name: string;
      image: string;
    }[];
  }[];
}

export interface Delivery {
  id: string;
  name: string;
  price: number;
  estimated: string;
}

export interface TransactionCart {
  id: string;
  seller: string;
  sellerImage: string;
  isSelected: boolean;
  coDelivery: Delivery | null;
  coCourier: Delivery | null;
  items: {
    id: string;
    name: string;
    image: string;
    qty: number;
    totalPrice: number;
    isSelected: boolean;
    addons?: {
      id: string;
      name: string;
      image: string;
    }[];
  }[];
}
