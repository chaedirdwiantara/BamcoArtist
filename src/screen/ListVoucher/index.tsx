import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {color, font} from '../../theme';
import {TopNavigation} from '../../components';
import {ArrowLeftIcon} from '../../assets/icon';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {widthResponsive} from '../../utils';
import ListDescHorizontal from '../../components/molecule/ListCard/ListDescHorizontal';
import {useEventHook} from '../../hooks/use-event.hook';
import {useFocusEffect} from '@react-navigation/native';

type ListVoucherProps = NativeStackScreenProps<RootStackParams, 'ListVoucher'>;

const ListVoucher: FC<ListVoucherProps> = ({
  route,
  navigation,
}: ListVoucherProps) => {
  const id = route.params.id;
  const {t} = useTranslation();
  const {useEventVoucherList} = useEventHook();

  const handleBackAction = () => {
    navigation.goBack();
  };

  const {
    data: dataList,
    refetch: refetchList,
    isLoading: isLoadingList,
    isRefetching: isRefetchingList,
  } = useEventVoucherList(id);

  useFocusEffect(
    useCallback(() => {
      refetchList();
    }, []),
  );

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Event.ListVoucher.Title')}
        maxLengthTitle={20}
        itemStrokeColor={'white'}
        leftIcon={<ArrowLeftIcon />}
        leftIconAction={handleBackAction}
        containerStyles={styles.topNavStyle}
      />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList?.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <ListDescHorizontal
                title={item.voucher.title}
                description={item.voucher.description}
                image={item.voucher.imageUrl[1]?.image}
                imageStyle={styles.imageStyle}
                onPress={() =>
                  navigation.navigate('DetailVoucher', {id: item.id})
                }
              />
            </View>
          )}
          ListEmptyComponent={
            !isLoadingList && !isRefetchingList ? (
              <View style={styles.containerEmpty}>
                <Text style={styles.textEmptyState}>
                  {t('Event.ListVoucher.EmptyState')}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default ListVoucher;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    position: 'relative',
  },
  listContainer: {
    paddingHorizontal: widthResponsive(24),
    paddingVertical: widthResponsive(16),
    borderBottomWidth: 1,
    borderBottomColor: color.Dark[500],
  },
  topNavStyle: {
    paddingHorizontal: widthResponsive(20),
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthResponsive(300),
  },
  imageStyle: {
    width: widthResponsive(50),
    height: widthResponsive(50),
  },
  textEmptyState: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: widthResponsive(12),
    fontWeight: '400',
  },
});
