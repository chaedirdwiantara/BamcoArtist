import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {heightResponsive, widthResponsive} from '../../utils';
import {Gap, SquareImage, Title} from '../../components';
import {color, font} from '../../theme';
import {ms, mvs} from 'react-native-size-matters';
import {ChevronDown2, ChevronUp} from '../../assets/icon';
import {SSULogo} from '../../assets/logo';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {DataExclusiveResponse} from '../../interface/setting.interface';
import SquareComp from './SquareComp';
import {useTranslation} from 'react-i18next';

const dummy = {
  imgUri:
    'https://cdn.istyle.im/images/product/web/24/43/88/00/0/000000884324_01_800.jpg',
  textBody: `Get exclusive content from a musician, stay up to date on their daily life with their band, meet them at events.
    `,
};

interface ECProps extends DataExclusiveResponse {
  edit?: boolean;
}

const ExclusiveDailyContent = (props: ECProps) => {
  const {t} = useTranslation();
  const {coverImage, title, description, edit = false} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
            {coverImage ? (
              <SquareComp imgUri={coverImage} size={mvs(82)} radius={4} />
            ) : (
              <View style={styles.logoContainer}>
                <SSULogo />
              </View>
            )}

            <Gap width={8} />
            <View style={{justifyContent: 'space-evenly'}}>
              <Text numberOfLines={2} style={styles.titleTopBody}>
                {title ?? 'Subscribe Exclusive Content'}
              </Text>
              <Text numberOfLines={6} style={styles.textTopBody}>
                {description ?? dummy.textBody}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bottomBody}
            onPress={() =>
              edit
                ? navigation.navigate('ExclusiveContentSetting')
                : navigation.navigate('ExclusiveContent', {data: props})
            }>
            <Text style={styles.bottomBodyText}>
              {edit ? t('ExclusiveContent.Edit') : t('Guest.GetExclusive')}
            </Text>
          </TouchableOpacity>
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
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: ms(8),
    borderBottomWidth: 1,
    borderColor: color.Dark[300],
  },
  titleTopBody: {
    maxWidth: widthResponsive(200),
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(12),
    color: color.Neutral[10],
  },
  textTopBody: {
    maxWidth: widthResponsive(200),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
    color: color.Neutral[10],
    paddingTop: heightResponsive(8),
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
  logoContainer: {
    paddingHorizontal: widthResponsive(8),
    backgroundColor: color.Dark[600],
    borderRadius: 4,
  },
});
