import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import CheckBox from '../CheckBox';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import {Avatar} from '../Avatar/Avatar';
import Gap from '../Gap/Gap';
import {heightPercentage, normalize, widthPercentage} from '../../../utils';
import {ArrowRightIcon, TruckIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';
import {EventType} from '../../../interface/event.interface';

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
    date,
    category,
    isChecked = false,
    onChecked = () => null,
  } = props;

  const {t} = useTranslation();

  if (type === EventType.Merch) {
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
                <TruckIcon stroke={Color.Neutral[10]} />
                <Gap width={widthPercentage(8)} />
                <Text
                  style={[
                    Typography.Caption,
                    {color: Color.Dark[50], fontSize: normalize(12)},
                  ]}>
                  {t('Transaction.Merch.Estimated')} : {arrival}
                </Text>
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

        {delivery && (
          <View style={[styles.box]}>
            <TouchableOpacity
              style={[styles.rowCenter, styles.between, {width: '100%'}]}
              onPress={onPressDelivery}>
              <View style={[styles.rowCenter]}>
                {true ? (
                  <>
                    <Text
                      style={[
                        Typography.Subtitle3,
                        {color: Color.Neutral[10]},
                      ]}>
                      Reguler
                    </Text>
                  </>
                ) : (
                  <>
                    <TruckIcon />
                    <Gap width={widthPercentage(5)} />
                    <Text
                      style={[
                        Typography.Subtitle3,
                        {color: Color.Neutral[10]},
                      ]}>
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
                <Text
                  style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
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
  }

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
          </TouchableOpacity>
        </View>
      </View>

      {children}

      <View style={styles.concertDetail}>
        <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
          Date
        </Text>
        <Text style={[Typography.Subtitle3, {color: Color.Dark[50]}]}>
          {date}
        </Text>
      </View>
      <View style={styles.concertDetail}>
        <Text style={[Typography.Subtitle3, {color: Color.Neutral[10]}]}>
          Ticket Category
        </Text>
        <Text style={[Typography.Subtitle3, {color: Color.Dark[50]}]}>
          {category}
        </Text>
      </View>
      <Gap height={heightPercentage(12)} />
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
});
