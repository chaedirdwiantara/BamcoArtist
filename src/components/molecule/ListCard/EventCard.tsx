import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightResponsive, widthResponsive} from '../../../utils';
import {Circle, Svg} from 'react-native-svg';
import {Gap} from '../../atom';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';
import {EventListData} from '../../../interface/event.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import dayjs from 'dayjs';

const EventCard = (props: EventListData) => {
  const {id, name, locationCountry, locationCity, startDate, isLive} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetail', {id: id})}
      style={[styles.root, {backgroundColor: isLive ? '#541947' : '#1A2333'}]}>
      <View
        style={[
          styles.boxLeft,
          {backgroundColor: isLive ? '#951979' : '#283245'},
        ]}>
        {isLive ? (
          <Text style={[Typography.Body1, styles.textWhite]}>Join</Text>
        ) : (
          <>
            <Text style={[Typography.Overline, styles.textWhite]}>
              {dayjs(startDate).format('MMM')}
            </Text>
            <Text style={[Typography.Heading5, styles.textWhite]}>
              {dayjs(startDate).format('D')}
            </Text>
          </>
        )}
      </View>
      <Gap width={widthResponsive(12)} />
      <View style={{flex: 1}}>
        <Text numberOfLines={1} style={[Typography.Heading6, styles.textWhite]}>
          {name}
        </Text>
        <Gap height={heightResponsive(2)} />
        <View style={styles.place}>
          <Text
            style={[
              Typography.Overline,
              styles.textGrey,
            ]}>{`${locationCity}, ${locationCountry}`}</Text>
          <View style={styles.dot}>
            <Svg width="3" height="4" viewBox="0 0 3 4" fill="none">
              <Circle cx="1.5" cy="2" r="1.5" fill="#ABBED6" />
            </Svg>
          </View>
          <Text style={[Typography.Overline, styles.textGrey]}>
            {dayjs(startDate).format('D MMMM YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  root: {
    padding: widthResponsive(12),
    borderRadius: widthResponsive(4),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  boxLeft: {
    width: widthResponsive(64),
    height: heightResponsive(64),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthResponsive(4),
  },
  textWhite: {
    color: Color.Neutral[10],
  },
  textGrey: {
    color: '#ABBED6',
  },
  place: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: widthResponsive(6),
  },
});
