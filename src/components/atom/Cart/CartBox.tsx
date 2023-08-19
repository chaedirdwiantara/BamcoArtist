import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import CheckBox from '../CheckBox';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import {Avatar} from '../Avatar/Avatar';
import Gap from '../Gap/Gap';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {ArrowRightIcon, CalendarIcon, TruckIcon} from '../../../assets/icon';
import {EventType} from '../../../interface/event.interface';
import Font from '../../../theme/Font';
import {mvs} from 'react-native-size-matters';

interface CartBoxProps {
  seller: string;
  sellerImage: string;
  type?: EventType;
  children: ReactNode;
  editable?: boolean;
  onPressDelivery?: () => void;
  onPressAgent?: () => void;
  delivery?: boolean;
  transaction?: string;
  arrival?: string;
  onPressDetail?: () => void;
  date?: string;
  category?: string;
  isChecked?: boolean;
  onChecked?: () => void;
  coDelivery?: any;
  coCourier?: any;
  isEmpty?: boolean;
  totalItem?: number;
  totalPrice?: number;
}

const CartBox: React.FC<CartBoxProps> = props => {
  const {
    seller,
    sellerImage,
    type = EventType.Merch,
    children,
    editable = true,
    onPressDelivery,
    onPressAgent,
    delivery = false,
    transaction,
    arrival,
    onPressDetail,
    isChecked = false,
    onChecked = () => null,
    coDelivery,
    coCourier,
    isEmpty = false,
    totalItem,
    totalPrice,
  } = props;

  return (
    <View style={[styles.root, {opacity: isEmpty ? 0.5 : 1}]}>
      <View
        style={[
          styles.rowCenter,
          {
            marginBottom: 10,
          },
        ]}>
        {editable && (
          <>
            <CheckBox handleOnPress={onChecked} active={isChecked} />
            <Gap width={widthPercentage(10)} />
          </>
        )}

        {transaction ? (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={onPressDetail}
              style={[styles.rowCenter, {justifyContent: 'space-between'}]}>
              <View style={[styles.rowCenter]}>
                <Avatar imgUri={sellerImage} />
                <Gap width={widthPercentage(6)} />
                <Text
                  style={[
                    Typography.Subtitle3,
                    {color: Color.Neutral[10], fontSize: normalize(12)},
                  ]}
                  numberOfLines={1}>
                  {seller}
                </Text>
                <Gap width={widthPercentage(16)} />
                <ArrowRightIcon stroke={Color.Success[400]} />
              </View>
              <Text
                style={[
                  Typography.Subtitle3,
                  {color: Color.Neutral[10], fontSize: normalize(12)},
                ]}>
                {transaction}
              </Text>
            </TouchableOpacity>
            <View style={[styles.rowCenter, styles.arrival]}>
              {type === EventType.Merch ? (
                <TruckIcon stroke={Color.Neutral[10]} />
              ) : (
                <CalendarIcon stroke={Color.Neutral[10]} />
              )}

              <Gap width={widthPercentage(8)} />
              <Text
                style={[
                  Typography.Caption,
                  {color: Color.Dark[50], fontSize: normalize(12), flex: 1},
                ]}>
                {arrival}
              </Text>
              <View style={styles.badgeWrapper}>
                <Text style={[Typography.Caption, styles.badgeText]}>
                  {type === EventType.Merch ? 'Merchandise' : 'Ticket'}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.rowCenter]}>
            <Avatar imgUri="https://picsum.photos/200" />
            <Gap width={widthPercentage(6)} />
            <Text
              style={[
                Typography.Subtitle3,
                {color: Color.Neutral[10], fontSize: normalize(12)},
              ]}
              numberOfLines={1}>
              {seller}
            </Text>
          </View>
        )}
      </View>

      {children}

      {transaction && (
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            flexDirection: 'row',
            marginBottom: heightResponsive(24),
            marginTop: heightResponsive(10),
          }}>
          <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
            {totalItem} Item :{' '}
          </Text>
          <Text style={[Typography.Subtitle3, {color: Color.Pink.linear}]}>
            {totalPrice} HKD
          </Text>
        </View>
      )}

      {delivery && (
        <View style={[styles.box]}>
          <TouchableOpacity
            style={[styles.rowCenter, styles.between, {width: '100%'}]}
            onPress={onPressDelivery}>
            <View style={[styles.rowCenter]}>
              {coDelivery ? (
                <>
                  <Text
                    style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                    {coDelivery.name}
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
          {coCourier && (
            <>
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
                  <Text
                    style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
                    {coCourier.name} ({coCourier.price})
                  </Text>
                  <Gap height={heightPercentage(4)} />
                  <Text style={[Typography.Subtitle3, {color: Color.Dark[50]}]}>
                    Estimated time {coCourier.estimated}
                  </Text>
                </View>

                <ArrowRightIcon />
              </TouchableOpacity>
            </>
          )}
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
  arrival: {
    paddingVertical: heightPercentage(8),
    marginTop: heightPercentage(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.Dark[500],
  },
  concertDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentage(4),
  },
  badgeWrapper: {
    backgroundColor: Color.Pink.linear,
    paddingHorizontal: widthResponsive(6),
    paddingVertical: heightResponsive(1),
    borderRadius: widthResponsive(4),
    marginRight: widthResponsive(6),
  },
  badgeText: {
    color: Color.Neutral[10],
    fontFamily: Font.InterMedium,
    fontSize: mvs(8),
  },
});
