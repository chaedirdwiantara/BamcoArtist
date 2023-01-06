import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {heightResponsive, widthResponsive} from '../../utils';
import {Gap, SquareImage, Title} from '../../components';
import {color, font} from '../../theme';
import {ms, mvs} from 'react-native-size-matters';
import {ChevronDown2, ChevronUp} from '../../assets/icon';

const dummy = {
  imgUri:
    'https://cdn.istyle.im/images/product/web/24/43/88/00/0/000000884324_01_800.jpg',
  textBody: `In this article, we’ll look at how to format a number with K at the end if it’s 1000 or more and return the whole number otherwise.
    `,
};

const ExclusiveDailyContent = () => {
  const [isShowComponent, setIsShowComponent] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <Title text={'Exclusive Daily Content'} />
        <TouchableOpacity onPress={() => setIsShowComponent(!isShowComponent)}>
          {isShowComponent ? <ChevronUp /> : <ChevronDown2 />}
        </TouchableOpacity>
      </View>
      <Gap height={4} />
      {isShowComponent ? (
        <View style={styles.mainStyle}>
          <View style={styles.topBody}>
            <SquareImage imgUri={dummy.imgUri} size={widthResponsive(80)} />
            <Gap width={8} />
            <View>
              <Text numberOfLines={2} style={styles.titleTopBody}>
                Exclusive Daily Content (my uncut video)
              </Text>
              <Text numberOfLines={6} style={styles.textTopBody}>
                {dummy.textBody}
              </Text>
            </View>
          </View>
          <View style={styles.bottomBody}>
            <Text style={styles.bottomBodyText}>Get Exclusive Content</Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default ExclusiveDailyContent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: widthResponsive(20),
    paddingTop: heightResponsive(12),
  },
  mainStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: color.Dark[300],
  },
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBody: {
    flexDirection: 'row',
    padding: ms(8),
    borderBottomWidth: 1,
    borderColor: color.Dark[300],
  },
  titleTopBody: {
    maxWidth: widthResponsive(223),
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(12),
    color: color.Neutral[10],
  },
  textTopBody: {
    maxWidth: widthResponsive(223),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
  bottomBody: {
    paddingVertical: heightResponsive(12),
    alignItems: 'center',
  },
  bottomBodyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '600',
    color: color.Pink[2],
  },
});
