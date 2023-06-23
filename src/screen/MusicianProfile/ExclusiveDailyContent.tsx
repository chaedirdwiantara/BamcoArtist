import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {heightResponsive, widthResponsive} from '../../utils';
import {Gap, Title} from '../../components';
import {color, font} from '../../theme';
import {ms, mvs} from 'react-native-size-matters';
import {ChevronDown2, ChevronUp} from '../../assets/icon';
import {BeamcoLogo} from '../../assets/logo';
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
  const {coverImage, title, description, edit = false, subs, musician} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [isShowComponent, setIsShowComponent] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <Title
          text={'Exclusive Daily Content'}
          textStyle={{color: color.Pink[200]}}
        />
        <TouchableOpacity onPress={() => setIsShowComponent(!isShowComponent)}>
          {isShowComponent ? (
            <ChevronUp fill={color.Pink[200]} />
          ) : (
            <ChevronDown2 fill={color.Pink[200]} />
          )}
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
                <BeamcoLogo width={82} height={82} />
              </View>
            )}

            <Gap width={12} />
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
                : subs
                ? null
                : navigation.navigate('ExclusiveContent', {data: props})
            }>
            <Text style={styles.bottomBodyText}>
              {edit
                ? t('ExclusiveContent.Edit')
                : subs
                ? t('ExclusiveContent.Active')
                : t('ExclusiveContent.Subscribe')}
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
    borderRadius: 4,
    backgroundColor: color.RedVelvet[100],
  },
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBody: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: ms(12),
  },
  titleTopBody: {
    maxWidth: widthResponsive(200),
    fontFamily: font.InterRegular,
    fontWeight: 'bold',
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
    backgroundColor: color.Pink[300],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  bottomBodyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: 'bold',
    color: color.Neutral[10],
  },
  logoContainer: {
    paddingHorizontal: widthResponsive(8),
    backgroundColor: color.Dark[600],
    borderRadius: 4,
  },
});
