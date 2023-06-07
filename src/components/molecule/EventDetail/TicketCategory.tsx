import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import {heightPercentage, widthPercentage} from '../../../utils';
import Color from '../../../theme/Color';
import {Gap} from '../../atom';
import Typography from '../../../theme/Typography';

export interface TicketCategoryType {
  id: number;
  title: string;
  desc: string;
  price: string;
  qty: number;
}

const Ticket = ({
  title,
  desc,
  price,
  qty,
  onPressSize,
  onPressDetail,
  customStyle,
}: {
  title: string;
  desc: string;
  price: string;
  qty: number;
  onPressSize: () => void;
  onPressDetail: () => void;
  customStyle: any;
}) => {
  return (
    <View style={[styles.root, customStyle, {opacity: qty > 0 ? 1 : 0.5}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {qty > 0 && (
          <TouchableOpacity onPress={onPressDetail}>
            <Text style={styles.price}>Detail</Text>
          </TouchableOpacity>
        )}
      </View>
      <Gap height={heightPercentage(8)} />
      <Text style={styles.desc}>{desc}</Text>
      <Gap height={heightPercentage(12)} />
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price} Credits</Text>
        <TouchableOpacity
          style={[
            styles.button,
            qty > 0 ? styles.buttonActive : styles.buttonSold,
          ]}
          onPress={onPressSize}
          disabled={qty === 0}>
          <Text style={styles.title}>{qty > 0 ? 'Choose' : 'Sold Out'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TicketCategory = ({
  selected,
  data,
  onPressSize,
  onPressDetail,
}: {
  selected: TicketCategoryType | undefined;
  data: TicketCategoryType[];
  onPressSize: (ticket: TicketCategoryType) => void;
  onPressDetail: (ticket: TicketCategoryType) => void;
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data?.length > 0 &&
        data?.map((ticket, index) => {
          return (
            <Ticket
              key={index}
              title={ticket.title}
              desc={ticket.desc}
              price={ticket.price}
              qty={ticket.qty}
              onPressSize={() => onPressSize(ticket)}
              onPressDetail={() => onPressDetail(ticket)}
              customStyle={{
                borderColor:
                  selected?.id === ticket.id
                    ? Color.Success[400]
                    : Color.Dark[300],
              }}
            />
          );
        })}
    </ScrollView>
  );
};

export default TicketCategory;

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    borderColor: Color.Dark[300],
    borderWidth: 1,
    alignSelf: 'flex-start',
    padding: widthPercentage(12),
    flex: 1,
    width: '100%',
    marginBottom: heightPercentage(12),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...Typography.Subtitle2,
    color: Color.Neutral[10],
  },
  desc: {
    ...Typography.Subtitle2,
    color: Color.Dark[50],
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...Typography.Subtitle2,
    color: Color.Success[400],
  },
  button: {
    paddingVertical: heightPercentage(6),
    paddingHorizontal: widthPercentage(12),
  },
  buttonActive: {
    backgroundColor: Color.Success[400],
  },
  buttonSold: {
    backgroundColor: Color.Dark[600],
  },
});
