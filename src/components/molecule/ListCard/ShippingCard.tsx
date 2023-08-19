import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';

import {width} from '../../../utils';
import {Button, Gap} from '../../atom';
import {color, font} from '../../../theme';
import {TrashIcon} from '../../../assets/icon';
import {DataShippingProps} from '../../../interface/setting.interface';

export interface ShippingCardProps {
  id?: string;
  value?: DataShippingProps;
  name: string;
  phoneNumber: string;
  address: string;
  isMainAddress?: boolean;
  onPressCard: () => void;
  onPressEdit: () => void;
  onPressRemove: () => void;
  newAddress?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const ShippingCard: React.FC<ShippingCardProps> = (
  props: ShippingCardProps,
) => {
  const {t} = useTranslation();
  const {
    id,
    value,
    name,
    phoneNumber,
    address,
    isMainAddress,
    onPressCard,
    onPressEdit,
    onPressRemove,
    newAddress,
    disabled,
    containerStyle,
  } = props;
  const isNewAddress = newAddress === id;
  const showFlag = isNewAddress || isMainAddress;
  const widthButton = isNewAddress ? width * 0.1 : width * 0.2;
  const flagColor = isNewAddress ? color.Success[400] : color.Pink.linear;
  const activeColor =
    id === value?.bookyayShipmentID ? color.Pink.linear : color.Dark[300];
  const widthBtnEdit = isMainAddress ? width * 0.8 : width * 0.68;
  const heightBtnEdit = isMainAddress ? mvs(295 / 40) : mvs(251 / 38);

  return (
    <TouchableOpacity
      style={[
        styles.containerContent,
        {borderColor: activeColor},
        containerStyle,
      ]}
      disabled={disabled}
      onPress={onPressCard}>
      <View style={{width: width * 0.8}}>
        {/* Flag Section: Main / New */}
        {showFlag && (
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: flagColor, width: widthButton},
            ]}
            disabled={true}>
            <Text style={styles.buttonText}>
              {isNewAddress
                ? t('Setting.Shipping.New')
                : t('Setting.Shipping.MainAddress')}
            </Text>
          </TouchableOpacity>
        )}

        {/* Info User Section */}
        <Text style={styles.name}>{name}</Text>
        <View style={{marginVertical: mvs(7)}}>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
        <Text style={styles.phoneNumber}>{address}</Text>

        {/* Button Section */}
        <View style={styles.containerBtn}>
          <Button
            type="border"
            label={t('Setting.Shipping.EditAddress')}
            containerStyles={{
              ...styles.btnEdit,
              width: widthBtnEdit,
              aspectRatio: heightBtnEdit,
            }}
            textStyles={{color: color.Pink.linear, fontSize: mvs(12)}}
            borderColor={color.Pink.linear}
            onPress={onPressEdit}
          />
          {!isMainAddress && (
            <>
              <Gap width={width * 0.02} />
              <TouchableOpacity
                style={styles.trashIcon}
                onPress={onPressRemove}>
                <TrashIcon
                  style={{width: ms(18), height: ms(18)}}
                  stroke={color.Pink.linear}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    width: width * 0.89,
    paddingVertical: mvs(17),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: mvs(4),
    borderWidth: mvs(1),
    borderColor: color.Dark[300],
  },
  name: {
    fontSize: mvs(15),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(18),
    color: color.Neutral[10],
  },
  phoneNumber: {
    fontSize: mvs(12.5),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    lineHeight: mvs(14.5),
    color: color.Neutral[10],
  },
  button: {
    paddingHorizontal: ms(5),
    paddingVertical: mvs(3),
    borderRadius: mvs(2),
    marginBottom: mvs(7),
  },
  buttonText: {
    fontSize: mvs(9),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
    textAlign: 'center',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEdit: {
    width: width * 0.68,
    marginTop: mvs(20),
  },
  trashIcon: {
    width: width * 0.09,
    aspectRatio: 1 / 1,
    borderWidth: mvs(1),
    borderColor: color.Pink.linear,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(20),
  },
});
