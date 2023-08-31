import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {Avatar, Button, Gap} from '../../atom';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  toCurrency,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font, typography} from '../../../theme';
import {DefaultAvatar, LiveIcon} from '../../../assets/icon';
import {useTranslation} from 'react-i18next';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';
import {useDebounce} from '../../../utils/debounce';
import Color from '../../../theme/Color';

export interface ListProps {
  musicianNum?: number | string;
  onPressMore: (data: any) => void;
  onPressImage: () => void;
  musicianName: string;
  imgUri: string;
  point?: string;
  containerStyles?: ViewStyle;
  dataFilter?: {label: string; value: string}[];
  followerMode?: boolean;
  followersCount?: number;
  activeMore?: boolean;
  self?: boolean;
  imageSize?: number;
  isLive?: boolean;
  onClickTip?: () => void;
  showCredit?: boolean;
  creditCount?: number;
}

const MusiciansListCard: React.FC<ListProps> = (props: ListProps) => {
  const {t} = useTranslation();
  const {
    musicianNum,
    onPressMore,
    onPressImage,
    musicianName,
    imgUri,
    point,
    containerStyles,
    dataFilter,
    followersCount,
    followerMode,
    activeMore = true,
    self,
    imageSize,
    isLive = false,
    onClickTip,
    showCredit = false,
    creditCount,
  } = props;

  // ? Dropdown Menu Example
  const dataMore = [
    {label: t('Home.Tab.TopMusician.Follow'), value: '1'},
    {label: t('Home.Tab.TopMusician.Tip'), value: '2'},
    {label: t('Home.Tab.TopMusician.Profile'), value: '3'},
  ];

  const pointV = point ? point : 0;

  const moreMenu = () => {
    return (
      <DropdownMore
        dataFilter={dataFilter ? dataFilter : dataMore}
        selectedMenu={onPressMore}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {isLive && (
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../../assets/image/live.jpg')}
          blurRadius={10}
        />
      )}

      {isLive ? (
        <LiveIcon
          style={{
            width: widthResponsive(30),
            paddingRight: widthPercentage(15),
          }}
        />
      ) : (
        <Text
          style={[
            styles.rankStyle,
            {
              color: self ? color.Pink[2] : color.Dark[100],
              marginRight: musicianNum ? widthResponsive(15) : 0,
            },
          ]}>
          {musicianNum?.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      )}

      <TouchableOpacity onPress={useDebounce(onPressImage)}>
        {imgUri ? (
          <Avatar
            imgUri={imgUri}
            size={imageSize ? widthResponsive(imageSize) : widthPercentage(44)}
          />
        ) : (
          <DefaultAvatar.MusicianIcon />
        )}
      </TouchableOpacity>
      <Gap width={8} />
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={useDebounce(onPressImage)}>
          <Text style={styles.musicianName} numberOfLines={1}>
            {musicianName}
          </Text>

          {followerMode && (
            <>
              <Gap height={heightResponsive(2)} />
              <View>
                {followersCount !== 0 ? (
                  <Text style={styles.followersCount} numberOfLines={1}>
                    {`${toCurrency(followersCount, {
                      withFraction: false,
                    })} ${t('General.Followers')}`}
                  </Text>
                ) : (
                  <Text style={styles.followersCount} numberOfLines={1}>
                    0 {t('General.Followers')}
                  </Text>
                )}
              </View>
            </>
          )}

          {showCredit && (
            <>
              <Gap height={heightResponsive(2)} />
              <View>
                <Text style={styles.creditCount} numberOfLines={1}>
                  {`${toCurrency(creditCount, {
                    withFraction: false,
                  })} Credits`}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        {point ? (
          <Text style={styles.pointStyle}>{`${pointV} pts`}</Text>
        ) : null}
        {activeMore && moreMenu()}
        {self && !isLive && (
          <Text
            style={[
              typography.Subtitle1,
              {
                color: color.Pink[2],
                marginRight: widthPercentage(5),
                fontSize: mvs(13),
              },
            ]}>
            You
          </Text>
        )}
      </View>

      {isLive && (
        <>
          <Gap width={8} />
          <Button
            onPress={onClickTip}
            label={self ? t('Btn.MyProfile') : t('Home.Tab.TopMusician.Tip')}
            containerStyles={styles.button}
            textStyles={styles.buttonText}
          />
        </>
      )}
    </View>
  );
};

export default MusiciansListCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontSize: normalize(10),
    fontWeight: '600',

    marginTop: ms(2),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  musicianName: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointStyle: {
    fontFamily: font.InterSemiBold,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: '#FF87DB',
    paddingRight: widthPercentage(7),
  },
  followersCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  imageBackground: {
    position: 'absolute',
    width: '105%',
    height: '117%',
    left: 0,
    top: 0,
    borderRadius: widthResponsive(4),
  },
  button: {
    width: width * 0.2,
    aspectRatio: heightPercentage(120 / 40),
    backgroundColor: Color.Pink.linear,
  },
  buttonText: {
    fontSize: mvs(10),
  },
  creditCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: Color.Pink.linear,
  },
});
