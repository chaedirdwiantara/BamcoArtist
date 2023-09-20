import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {color, font} from '../../../theme';
import {normalize, widthResponsive} from '../../../utils';
import {Avatar, Gap} from '../../atom';
import {WordReplacerType} from '../../../interface/notification.interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

const {width} = Dimensions.get('screen');

interface AvatarItem {
  uri?: string;
  name?: string;
}

interface ListAvatarProps {
  data?: AvatarItem[];
  size?: number;
  desc?: string;
  wordReplacer?: WordReplacerType[];
}

export const ListAvatar: React.FC<ListAvatarProps> = (
  props: ListAvatarProps,
) => {
  const {data = [], size = width * 0.08, desc, wordReplacer} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const moreThanThree = `+${data.length - 3}`;

  //? #0 AREA
  const userNameFontWeight: any =
    wordReplacer && wordReplacer?.length > 0
      ? wordReplacer[0].fontWeight
      : '400';
  const userNameFontColor =
    wordReplacer &&
    wordReplacer?.length > 0 &&
    wordReplacer[0].color &&
    wordReplacer[0].color !== ''
      ? wordReplacer[0].color
      : color.Neutral[10];

  // ? #1 AREA
  const linkTNC =
    wordReplacer && wordReplacer?.length > 0
      ? wordReplacer[1].link
      : 'https://www.thebeam.co/termsandcondition';

  const colorLinkTNC =
    wordReplacer && wordReplacer?.length > 0
      ? wordReplacer[1].color
      : color.Neutral[10];

  const onPressFirstSpecialText = () => {
    navigation.navigate('Webview', {
      title: 'Terms and Conditions',
      url: linkTNC,
    });
  };

  // ? #2 AREA
  const linkSettings =
    wordReplacer && wordReplacer?.length > 0
      ? wordReplacer[2].link
      : 'SendAppeal';

  const colorLinkSettings =
    wordReplacer && wordReplacer?.length > 0
      ? wordReplacer[1].color
      : color.Pink[200];

  const onPressSecondSpecialText = () => {
    //@ts-ignore this should be fine since the screen page comes from api response
    navigation.navigate(linkSettings);
  };

  const renderDesc = (text: string | undefined) => {
    return text?.split(' ').map((word, index) => {
      if (word.includes('#0')) {
        return (
          <Text
            style={[
              styles.fullname,
              {color: userNameFontColor, fontWeight: userNameFontWeight},
            ]}>
            {wordReplacer && wordReplacer?.length > 0
              ? wordReplacer[0].text
              : word}{' '}
          </Text>
        );
      } else if (word.includes('#1')) {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onPressFirstSpecialText()}>
            <Text style={[styles.fullname, {color: colorLinkTNC}]}>
              {wordReplacer && wordReplacer?.length > 0
                ? wordReplacer[1].text
                : word}{' '}
            </Text>
          </TouchableWithoutFeedback>
        );
      } else if (word.includes('#2')) {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onPressSecondSpecialText()}>
            <Text style={[styles.fullname, {color: colorLinkSettings}]}>
              {wordReplacer && wordReplacer?.length > 0
                ? wordReplacer[2].text
                : word}{' '}
            </Text>
          </TouchableWithoutFeedback>
        );
      } else {
        return word + ' ';
      }
    });
  };

  return (
    <>
      {data.length !== 0 && (
        <>
          <View style={styles.root}>
            {data?.map((val, i) => {
              if (i < 3) {
                return (
                  <View style={styles.root} key={i}>
                    <Avatar key={i} size={size} imgUri={val.uri || ''} />
                  </View>
                );
              }
            })}
            {data?.length > 3 && (
              <Text style={styles.text}>{moreThanThree}</Text>
            )}
          </View>
          <Gap height={8} />
        </>
      )}

      <View style={{width: '100%', maxWidth: '90%'}}>
        <Text style={styles.fullname}>{renderDesc(desc)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingRight: widthResponsive(3),
    alignItems: 'center',
  },
  text: {
    color: color.Neutral[10],
    fontSize: normalize(15),
    fontFamily: font.InterMedium,
  },
  fullname: {
    fontSize: normalize(13),
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
  },
});
