import {EmitterSubscription, Platform} from 'react-native';
import * as IAP from 'react-native-iap';
import {createIapApple, generateSessionPurchase} from '../api/credit.api';
import {getCoinFromProductId} from '../utils';
import {useIapStore} from '../store/iap.store';
import {profileStorage, storage} from './use-storage.hook';
import {AuthType} from '../interface/auth.interface';
import {useCreditHook} from './use-credit.hook';

export const useIapHook = () => {
  const {getCreditCount} = useCreditHook();
  const productId = Platform.select({
    ios: [
      'Credit_beamco_artist_100',
      'Credit_beamco_artist_540',
      'Credit_beamco_artist_1200',
      'Credit_beamco_artist_6500',
    ],
    android: [],
  });
  const iapStore = useIapStore();

  let purchaseUpdateListener: EmitterSubscription | undefined;
  let purchaseErrorListener: EmitterSubscription | undefined;

  const initIAP = async () => {
    try {
      await IAP.initConnection();
    } catch (err) {
      console.log(err);
    }
  };

  const getProductIap = async () => {
    try {
      const response = await IAP.getProducts({skus: productId ?? []});
      iapStore.setProductList(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const endIap = () => {
    IAP.endConnection();
  };

  const purchaseProduct = async (sku: string) => {
    try {
      await IAP.requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loadIapListener = () => {
    initIAP();
    purchaseUpdateListener = IAP.purchaseUpdatedListener(
      async (purchase: IAP.SubscriptionPurchase | IAP.ProductPurchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          // TODO: wiring to backend to add the credit into profile
          const deviceId = storage.getString('uniqueId');
          const JSONProfile = storage.getString('profile') as string;
          const profileObject = JSON.parse(JSONProfile) as AuthType;
          const ownerId = profileObject.uuid;
          let selectedProduct: IAP.Product[] = [];
          const listProduct = (await getProductIap()) as IAP.Product[];
          selectedProduct = listProduct.filter(
            ar => ar.productId === purchase.productId,
          );
          if (deviceId) {
            const generateSession = await generateSessionPurchase({
              deviceId: deviceId,
            });
            if (selectedProduct.length > 0) {
              await createIapApple({
                owner: ownerId,
                ownerType: 1, //1 fans, 2 musician
                trxReferenceId: purchase.transactionId ?? '',
                credit: parseInt(
                  getCoinFromProductId({
                    productId: purchase.productId,
                    type: 'number',
                  }),
                ),
                packageId: purchase.productId,
                currency: selectedProduct[0].currency,
                packagePrice: Number(selectedProduct[0].price),
                trxStatus: 1,
                deviceId: deviceId,
                trxSession: generateSession.data.Session,
              });
              await getCreditCount();
            }
          }
          await IAP.finishTransaction({purchase, isConsumable: true});
        }
      },
    );
    purchaseErrorListener = IAP.purchaseErrorListener(
      (error: IAP.PurchaseError) => {
        console.log('purchaseErrorListener', error);
      },
    );
  };

  return {
    iapProduct: iapStore.productList,
    initIAP,
    endIap,
    getProductIap,
    purchaseProduct,
    loadIapListener,
    purchaseUpdateListener,
    purchaseErrorListener,
  };
};
