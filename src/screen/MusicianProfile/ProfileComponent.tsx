import React, {FC} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import {
  FbIcon,
  VkIcon,
  WeiboIcon,
  TiktokIcon,
  TwitterIcon,
  SnapchatIcon,
  InstagramIcon,
} from '../../assets/icon';
import {color, font} from '../../theme';
import {Gap, Title} from '../../components';
import {widthResponsive} from '../../utils';
import {RootStackParams} from '../../navigations';
import {nameValue} from '../../interface/base.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ProfileProps {
  title: string;
  content?: string;
  gap?: number;
  socmedSection?: boolean;
  websiteSection?: boolean;
  socmed?: nameValue[];
  memberSection?: boolean;
  members?: string[];
  containerStyles?: ViewStyle;
}

const ProfileComponent: FC<ProfileProps> = (props: ProfileProps) => {
  const {t} = useTranslation();
  const {
    title,
    content,
    gap = 8,
    socmedSection,
    websiteSection,
    socmed,
    members,
    memberSection,
    containerStyles,
  } = props;

  const noDataText = t('EmptyState.NoInfo');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleWebview = (ttl: string, url: string) => {
    navigation.navigate('Webview', {
      title: ttl,
      url: url,
    });
  };

  const onPressLink = (url: string) => {
    websiteSection ? Linking.openURL(url) : null;
  };

  const isWebsite = websiteSection && content !== noDataText;

  return (
    <View style={[{paddingHorizontal: widthResponsive(24)}, containerStyles]}>
      <Title textStyle={{fontSize: mvs(13)}} text={title} />
      <Gap height={gap} />
      {content && (
        <TouchableOpacity
          activeOpacity={isWebsite ? 0 : 1}
          onPress={() => onPressLink(content)}>
          <Text
            style={[
              styles.captionStyle,
              {
                color: isWebsite ? color.Pink[2] : color.Neutral[10],
              },
            ]}>
            {content}
          </Text>
        </TouchableOpacity>
      )}
      {memberSection && (
        <View>
          {members ? (
            <FlatList
              horizontal
              data={members}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              renderItem={({item, index}) => (
                <Text style={styles.captionStyle}>
                  {members?.length - 1 === index ? item : `${item}, `}
                </Text>
              )}
            />
          ) : (
            <Text style={styles.captionStyle}>{noDataText}</Text>
          )}
        </View>
      )}
      {socmedSection && (
        <View style={{flexDirection: 'row'}}>
          {socmed ? (
            <FlatList
              horizontal
              data={socmed}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              renderItem={({item}) =>
                item.name === 'facebook' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <FbIcon />
                  </TouchableOpacity>
                ) : item.name === 'twitter' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <TwitterIcon />
                  </TouchableOpacity>
                ) : item.name === 'instagram' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <InstagramIcon />
                  </TouchableOpacity>
                ) : item.name === 'tiktok' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <TiktokIcon />
                  </TouchableOpacity>
                ) : item.name === 'snapchat' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <SnapchatIcon />
                  </TouchableOpacity>
                ) : item.name === 'vk' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <VkIcon style={{marginTop: ms(-3)}} />
                  </TouchableOpacity>
                ) : item.name === 'weibo' ? (
                  <TouchableOpacity
                    style={styles.touchStyle}
                    onPress={() =>
                      handleWebview(item.name as string, item.value as string)
                    }>
                    <WeiboIcon />
                  </TouchableOpacity>
                ) : null
              }
            />
          ) : (
            <Text style={styles.captionStyle}>{noDataText}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(13),
  },
  touchStyle: {
    marginRight: widthResponsive(16),
  },
});
