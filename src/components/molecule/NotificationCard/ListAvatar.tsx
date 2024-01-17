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
import {storage} from '../../../hooks/use-storage.hook';

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
  type?: string;
}

export const ListAvatar: React.FC<ListAvatarProps> = (
  props: ListAvatarProps,
) => {
  const {data = [], size = width * 0.08, desc, wordReplacer, type} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const moreThanThree = `+${data.length - 3}`;

  const onPressLink = (link: string) => {
    type === '3' && storage.set('tabActiveRewards', 1);
    link.includes('://')
      ? navigation.navigate('Webview', {
          title: 'Terms and Conditions',
          url: link,
        })
      : //@ts-ignore this should be fine since the screen page comes from api response
        navigation.navigate(link);
  };

  const renderDesc = (text: string | undefined) => {
    return text?.split(' ').map((word, index) => {
      if (wordReplacer && word.includes('#')) {
        // Find the character after '#'
        const indexOfHash = word.indexOf('#');
        const ixChoosen = parseInt(word.charAt(indexOfHash + 1), 10);

        return (
          <TouchableWithoutFeedback
            key={index}
            disabled={wordReplacer[ixChoosen].link.length === 0}
            onPress={() => onPressLink(wordReplacer[ixChoosen].link)}>
            <Text
              style={[
                styles.fullname,
                //@ts-ignore
                {
                  color: wordReplacer[ixChoosen]?.color,
                  fontWeight: wordReplacer[ixChoosen]?.fontWeight,
                },
              ]}>
              {wordReplacer && wordReplacer?.length > 0
                ? wordReplacer[ixChoosen].text
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
        <Text style={styles.fullname}>
          {wordReplacer && wordReplacer?.length > 0 ? renderDesc(desc) : desc}
        </Text>
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
