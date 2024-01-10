import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

type Props = {
  id: number;
};

const BenefitCard: FC<Props> = ({id}) => {
  const {useGetBenefit} = useRewardHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    data: dataBenefit,
    refetch: refetchGetBenefit,
    isLoading: isLoadingGetBenefit,
    isRefetching: isRefetchingGetBenefit,
  } = useGetBenefit({id: id});

  // ! 1. FETCH DATA ON FOCUS
  useFocusEffect(
    useCallback(() => {
      refetchGetBenefit();
    }, []),
  );

  useEffect(() => {
    refetchGetBenefit();
  }, [id]);

  const handleOnPress = () => {
    navigation.navigate('DetailBenefit', {benefitId: id});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Benefit</Text>
      <Gap height={10} />
      <FlatList
        data={dataBenefit?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.compContainer}
            onPress={handleOnPress}>
            <Image
              source={{uri: item.imageUrl[0].image}}
              style={styles.iconStyle}
            />
            <Gap width={6} />
            <Text style={styles.textStyle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => {
          return <View></View>;
        }}
      />
    </View>
  );
};

export default BenefitCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.DarkBlue[300],
    padding: widthResponsive(12),
    borderRadius: 10,
  },
  textStyle: {
    color: color.Neutral[10],
    fontSize: mvs(8),
    fontWeight: '600',
    fontFamily: font.InterRegular,
  },
  compContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: mvs(24),
    height: mvs(24),
  },
});
