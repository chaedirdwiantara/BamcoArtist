import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import CheckBox from '../CheckBox';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import {Avatar} from '../Avatar/Avatar';
import Gap from '../Gap/Gap';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {ArrowRightIcon, TruckIcon} from '../../../assets/icon';

interface CartBoxProps {
  children: ReactNode;
  editable?: boolean;
  onPressDelivery?: () => void;
  onPressAgent?: () => void;
  delivery?: boolean;
}

const CartBox: React.FC<CartBoxProps> = props => {
  const {
    children,
    editable = true,
    onPressDelivery,
    onPressAgent,
    delivery = false,
  } = props;
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.rowCenter,
          {
            marginBottom: 10,
          },
        ]}>
        {editable && (
          <>
            <CheckBox handleOnPress={() => null} active={false} />
            <Gap width={widthPercentage(10)} />
          </>
        )}

        <View style={[styles.rowCenter]}>
          <Avatar imgUri="https://picsum.photos/200" />
          <Gap width={widthPercentage(6)} />
          <Text
            style={[
              Typography.Subtitle3,
              {color: Color.Neutral[10], fontSize: normalize(12)},
            ]}
            numberOfLines={1}>
            Blackpink
          </Text>
        </View>
      </View>

      {children}

      {delivery && (
        <View style={[styles.box]}>
          <TouchableOpacity
            style={[styles.rowCenter, styles.between, {width: '100%'}]}
            onPress={onPressDelivery}>
            <View style={[styles.rowCenter]}>
              {true ? (
                <>
                  <Text
                    style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                    Reguler
                  </Text>
                </>
              ) : (
                <>
                  <TruckIcon />
                  <Gap width={widthPercentage(5)} />
                  <Text
                    style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                    Choose Delivery
                  </Text>
                </>
              )}
            </View>

            <ArrowRightIcon />
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity
            style={[
              styles.rowCenter,
              styles.between,
              {
                width: '100%',
              },
            ]}
            onPress={onPressAgent}>
            <View>
              <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                DHL Express (400)
              </Text>
              <Gap height={heightPercentage(4)} />
              <Text style={[Typography.Subtitle3, {color: Color.Dark[50]}]}>
                Estimated time 22-24 Feb
              </Text>
            </View>

            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartBox;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: widthPercentage(24),
    paddingTop: heightPercentage(16),
    borderBottomColor: Color.Dark[500],
    borderBottomWidth: 1,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  box: {
    justifyContent: 'space-between',
    marginBottom: heightPercentage(16),
    borderColor: Color.Dark[500],
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: Color.Dark[500],
    paddingTop: heightPercentage(6),
    marginTop: heightPercentage(6),
  },
});
