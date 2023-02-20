import React, {FC} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Gap, Title} from '../../components';
import {color, font} from '../../theme';
import {widthResponsive} from '../../utils';
import {ms} from 'react-native-size-matters';
import {
  FbIcon,
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
  TwitterIcon,
  VkIcon,
  WeiboIcon,
} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../navigations';
import {nameValue} from '../../interface/base.interface';

interface ProfileProps {
  title: string;
  content?: string;
  gap?: number;
  socmedSection?: boolean;
  socmed?: nameValue[];
  memberSection?: boolean;
  members?: string[];
  containerStyles?: ViewStyle;
}

const ProfileComponent: FC<ProfileProps> = (props: ProfileProps) => {
  const {
    title,
    content,
    gap = 8,
    socmedSection,
    socmed,
    members,
    memberSection,
    containerStyles,
  } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleWebview = (ttl: string, url: string) => {
    navigation.navigate('Webview', {
      title: ttl,
      url: url,
    });
  };

  return (
    <View style={[{paddingHorizontal: widthResponsive(24)}, containerStyles]}>
      <Title text={title} />
      <Gap height={gap} />
      {content && <Text style={styles.captionStyle}>{content}</Text>}
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
            <Text style={styles.captionStyle}>No information given</Text>
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
            <Text style={styles.captionStyle}>No information given</Text>
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
    fontSize: ms(12),
  },
  touchStyle: {
    marginRight: widthResponsive(16),
  },
});
