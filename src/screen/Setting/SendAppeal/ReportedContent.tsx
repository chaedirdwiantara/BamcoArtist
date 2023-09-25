import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Gap,
  PostAppeal,
  CommentAppeal,
  TopNavigation,
  MusicAppeal,
  AlbumAppeal,
} from '../../../components';
import {width} from '../../../utils';
import {color, font} from '../../../theme';
import {
  AlbumReportedType,
  CommentReportedType,
  PostReportedType,
  SongReportedType,
} from '../../../interface/setting.interface';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {useNavigation} from '@react-navigation/native';

export const ReportedContentScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {listViolation, getListViolations} = useSettingHook();
  const [selectedContent, setSelectedContent] = useState<number>(-1);

  useEffect(() => {
    getListViolations();
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToSendAppeal = (
    type: string,
    val: PostReportedType &
      CommentReportedType &
      SongReportedType &
      AlbumReportedType,
  ) => {
    setSelectedContent(val.reportedViolationId);
    navigation.navigate('SendAppeal', {selectedViolation: val, type});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.Report.Modal.SendAppeal')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: mvs(10),
          paddingHorizontal: ms(15),
        }}
      />

      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {t('Setting.SendAppeal.ReportedContent.Title')}
        </Text>
        <Text style={styles.subtitle}>
          {t('Setting.SendAppeal.ReportedContent.Subtitle')}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* // post violation */}
          {listViolation?.postReported.map((val, i) => (
            <PostAppeal
              key={i}
              data={val}
              isSelected={val.reportedViolationId === selectedContent}
              onPressSelected={() => goToSendAppeal('post', val)}
              containerStyles={{marginBottom: mvs(15)}}
            />
          ))}

          {/* // comment violation */}
          {listViolation?.commentReported.map((val, i) => (
            <CommentAppeal
              key={i}
              isSelected={val.reportedViolationId === selectedContent}
              fullname={val.commentOwner.fullname}
              username={val.commentOwner.username}
              repliedTo={val.repliedTo}
              postDate={val.timeAgo}
              caption={val.caption}
              likesCount={val.likesCount}
              commentsCount={val.commentsCount}
              onPressSelected={() => goToSendAppeal('comment', val)}
              containerStyles={{marginBottom: mvs(15)}}
            />
          ))}

          {/* // song violation */}
          {listViolation?.songReported.map((val, i) => (
            <MusicAppeal
              key={i}
              title={val.title}
              musician={val.musicianName}
              coverImage={val.image}
              duration={val.songDuration}
              isSelected={val.reportedViolationId === selectedContent}
              onPressSelected={() => goToSendAppeal('song', val)}
              containerStyles={{marginBottom: mvs(15)}}
            />
          ))}

          {/* // album violation */}
          {listViolation?.albumReported.map((val, i) => (
            <AlbumAppeal
              key={i}
              title={val.title}
              coverImage={val.image}
              year={val.productionYear}
              numberOfSongs={val.songTotal}
              isSelected={val.reportedViolationId === selectedContent}
              onPressSelected={() => goToSendAppeal('album', val)}
              containerStyles={{marginBottom: mvs(15)}}
            />
          ))}

          <Gap height={mvs(50)} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerContent: {
    flex: 1,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: mvs(10),
  },
  title: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(15),
    lineHeight: mvs(20),
  },
  subtitle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(14),
    lineHeight: mvs(20),
    marginTop: mvs(20),
    marginBottom: mvs(15),
  },
});
