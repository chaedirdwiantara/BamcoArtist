import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {storage} from '../../hooks/use-storage.hook';
import {Avatar, GuestContent, TopNavigation} from '../../components';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {color} from '../../theme';
import MerchList from '../ListCard/MerchList';
import {ArrowLeftIcon, CartIcon} from '../../assets/icon';
import ConcertList from '../ListCard/ConcertList';
import {useIsFocused} from '@react-navigation/native';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import Typography from '../../theme/Typography';
import Color from '../../theme/Color';
import Font from '../../theme/Font';

type ShopProps = NativeStackScreenProps<RootStackParams, 'Shop'>;

const Shop: React.FC<ShopProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [tabActive, setTabActive] = useState<number>(1);
  const [filter] = useState([
    {id: 1, title: 'Event.Concert.Title'},
    {id: 2, title: 'Event.Merch.Title'},
  ]);
  const isLogin = storage.getString('profile');
  const isFocused = useIsFocused();
  const {isPlaying, showPlayer, hidePlayer} = usePlayerHook();

  useEffect(() => {
    if (isFocused && isPlaying) {
      showPlayer();
    } else if (!isFocused) {
      hidePlayer();
    }
  }, [isFocused]);

  const handleChangeTab = (tabId: number) => {
    setTabActive(tabId);
  };

  return (
    <View style={styles.root}>
      {isLogin ? (
        <View>
          <TopNavigation.Type4
            title={t('Shop.Title')}
            maxLengthTitle={20}
            itemStrokeColor={'white'}
            rightIcon={<CartIcon />}
            rightIconAction={() => navigation.navigate('Cart')}
            leftIcon={<ArrowLeftIcon />}
            leftIconAction={() => navigation.goBack()}
            containerStyles={{paddingHorizontal: widthPercentage(20)}}
          />
          <View style={[styles.topContainer]}>
            <View style={styles.owner}>
              <View style={{marginRight: widthPercentage(10)}}>
                <Avatar imgUri={''} size={widthResponsive(48)} />
              </View>

              <View>
                <Text style={styles.ownerLabel}>SSU Ticket Official</Text>
                <Text style={styles.ownerFrom}>China</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxPink}>
            <Text style={styles.offTitle}>
              Closed until Sunday 12 April 2023
            </Text>
            <Text style={[Typography.Caption, {color: Color.Dark[300]}]}>
              Your order will be processed upon the store open
            </Text>
          </View>
          <View style={[styles.topContainer]}>
            {filter.map((tab, index) => {
              return (
                <>
                  <TouchableOpacity onPress={() => handleChangeTab(tab.id)}>
                    <Text
                      style={[
                        Typography.Subtitle2,
                        {
                          color:
                            tabActive === tab.id
                              ? Color.Pink.linear
                              : Color.Neutral[10],
                        },
                      ]}>
                      {t(tab.title)}
                    </Text>
                  </TouchableOpacity>
                  {index + 1 < filter.length && (
                    <View style={styles.tabSpacer} />
                  )}
                </>
              );
            })}
          </View>
          <View style={styles.listContainer}>
            {tabActive === 1 ? (
              <ConcertList type={'shop'} />
            ) : (
              <MerchList type={'shop'} />
            )}
          </View>
        </View>
      ) : (
        <GuestContent />
      )}
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  listContainer: {
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: heightPercentage(16),
    paddingHorizontal: widthPercentage(24),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Dark[300],
    marginHorizontal: widthPercentage(10),
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerLabel: {
    color: 'white',
    fontFamily: Font.InterBold,
    fontSize: normalize(13),
  },
  ownerFrom: {
    color: '#8794AD',
    fontFamily: Font.InterRegular,
    fontSize: normalize(11.5),
    marginTop: heightPercentage(4),
  },
  boxPink: {
    backgroundColor: '#FFD1F5',
    width: '100%',
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(16),
  },
  offTitle: {
    fontFamily: Font.InterBold,
    marginBottom: heightPercentage(2),
    fontSize: normalize(14),
    color: Color.Dark[800],
  },
});
