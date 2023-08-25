import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {width} from '../../../utils';
import {color, font} from '../../../theme';
import {ArrowLeftIcon} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {CommentAppeal, TopNavigation} from '../../../components';
import {CommentReportedType} from '../../../interface/setting.interface';

type ReportedContentProps = NativeStackScreenProps<
  RootStackParams,
  'ReportedContent'
>;
export const ReportedContentScreen: React.FC<ReportedContentProps> = ({
  navigation,
  route,
}: ReportedContentProps) => {
  const {t} = useTranslation();
  const {title, dataViolation} = route.params;
  const [selectedContent, setSelectedContent] = useState<number>(-1);
  const onPressGoBack = () => {
    navigation.goBack();
  };

  const goToSendAppeal = (val: CommentReportedType) => {
    setSelectedContent(val.reportedViolationId);
    navigation.navigate('SendAppeal', {title, selectedViolation: val});
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={title}
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
        {dataViolation.commentReported.map((val, i) => (
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
            onPressSelected={() => goToSendAppeal(val)}
            containerStyles={{marginBottom: mvs(15)}}
          />
        ))}
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
