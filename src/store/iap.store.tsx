import create from 'zustand';
import * as IAP from 'react-native-iap';

interface IapState {
  userCredit: number;
  productList: IAP.Product[];
  selectedProduct: IAP.Product | null;
  setUserCredit: (by: number) => void;
  setProductList: (by: IAP.Product[]) => void;
  setSelectedProduct: (by: IAP.Product) => void;
}

export const useIapStore = create<IapState>()(set => ({
  userCredit: 0,
  productList: [],
  selectedProduct: null,
  setUserCredit: by => set(state => ({userCredit: by})),
  setProductList: by => set(state => ({productList: by})),
  setSelectedProduct: by => set(state => ({selectedProduct: by})),
}));
