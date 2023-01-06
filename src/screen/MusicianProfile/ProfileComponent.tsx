import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
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

interface ProfileProps {
  title: string;
  content?: string;
  gap?: number;
  socmedSection?: boolean;
  socmed?: string[];
  memberSection?: boolean;
  members?: string[];
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
  } = props;

  return (
    <View style={{paddingHorizontal: widthResponsive(24)}}>
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
              renderItem={({item, index}) =>
                item === 'facebook' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <FbIcon />
                  </TouchableOpacity>
                ) : item === 'twitter' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <TwitterIcon />
                  </TouchableOpacity>
                ) : item === 'instagram' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <InstagramIcon />
                  </TouchableOpacity>
                ) : item === 'tiktok' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <TiktokIcon />
                  </TouchableOpacity>
                ) : item === 'snapchat' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <SnapchatIcon />
                  </TouchableOpacity>
                ) : item === 'vk' ? (
                  <TouchableOpacity style={styles.touchStyle}>
                    <VkIcon style={{marginTop: ms(-3)}} />
                  </TouchableOpacity>
                ) : item === 'weibo' ? (
                  <TouchableOpacity style={styles.touchStyle}>
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
