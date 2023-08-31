import React, {useEffect, useState} from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ListCard} from '../ListCard';
import {Gap, SsuToast} from '../../atom';
import {color, font} from '../../../theme';
import {ModalShare} from '../Modal/ModalShare';
import {ModalDonate} from '../Modal/ModalDonate';
import {RootStackParams} from '../../../navigations';
import {CheckCircle2Icon} from '../../../assets/icon';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {BottomSheetGuest} from '../GuestComponent/BottomSheetGuest';
import {heightPercentage, normalize, widthResponsive} from '../../../utils';
import {useShareHook} from '../../../hooks/use-share.hook';
import Clipboard from '@react-native-community/clipboard';
import {profileStorage} from '../../../hooks/use-storage.hook';
import {mediaReportRecorded} from '../../../store/idReported';
import {useReportHook} from '../../../hooks/use-report.hook';
import {
  dataListSongAlbum,
  dataListSongAlbumReportSent,
  dataListSongMoreMyAlbum,
} from '../../../data/dropdown';
import {ReportParamsProps} from '../../../interface/report.interface';
import {ModalReport} from '../Modal/ModalReport';
import {reportingMenu} from '../../../data/report';
import SuccessToast from '../Toast/SuccessToast';

interface DataMore {
  label: string;
  value: string;
}
interface ListProps {
  imgUri: string;
  onPressMore?: (data: any) => void;
  onPressCard?: () => void;
  musicNum?: number | string;
  musicTitle: string;
  singerName: string;
  containerStyles?: ViewStyle;
  played?: boolean;
  hideDropdownMore?: boolean;
  rightIcon?: boolean;
  rightIconComponent?: React.ReactNode;
  onPressIcon?: (data: any) => void;
  activeOpacity?: number;
  loveIcon?: boolean;
  likeOnPress?: () => void;
  isLiked?: boolean;
  onPressAddToQueue: () => void;
  songId: number;
  newDataMore?: DataMore[];
  newOnPressMore?: (data: DataMore) => void;
  disabled?: boolean;
  fromMainTab?: boolean;
  singerId: string;
}

export const MusicSection: React.FC<ListProps> = (props: ListProps) => {
  const {newDataMore, newOnPressMore, singerId, songId} = props;
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {creditCount, getCreditCount} = useCreditHook();
  const {shareLink, getShareLink, successGetLink} = useShareHook();
  const {idReported, setIdReported} = mediaReportRecorded();
  const MyUuid = profileStorage()?.uuid;

  const {
    dataReport,
    reportIsLoading,
    reportIsError,
    setDataReport,
    setPostReport,
  } = useReportHook();

  const dataMore =
    singerId !== MyUuid && !idReported.includes(songId.toString())
      ? dataListSongAlbum
      : singerId !== MyUuid && idReported.includes(songId.toString())
      ? dataListSongAlbumReportSent
      : dataListSongMoreMyAlbum;

  const [textToast, setTextToast] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [reportToast, setReportToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (modalDonate) getCreditCount();
  }, [modalDonate]);

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
  }, [toastVisible]);

  useEffect(() => {
    modalSuccessDonate &&
      setTimeout(() => {
        setModalSuccessDonate(false);
      }, 3000);
  }, [modalSuccessDonate, trigger2ndModal]);

  //? set status disable after report sent to make sure the status report is updated
  useEffect(() => {
    if (dataReport && songId) {
      if (!idReported.includes(songId.toString())) {
        setIdReported([...idReported, songId.toString()]);
      }
    }
  }, [dataReport]);

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressCopy = () => {
    InteractionManager.runAfterInteractions(() => {
      Clipboard.setString(shareLink);
      setToastVisible(true);
      setTextToast(t('General.LinkCopied') || '');
    });
  };

  const resultDataMore = (dataResult: DataMore) => {
    if (dataResult.value === '1') {
      navigation.navigate('AddToPlaylist', {
        id: [props.songId],
        type: 'song',
        fromMainTab: props.fromMainTab ? props.fromMainTab : false,
      });
    } else if (dataResult.value === '2') {
      setModalDonate(true);
    } else if (dataResult.value === '3') {
      props.onPressAddToQueue() !== undefined && props.onPressAddToQueue();
      setToastVisible(true);
      setTextToast('Song added to queue!');
    } else if (dataResult.value === '4') {
      setModalShare(true);
    } else if (dataResult.value === '22') {
      setReportToast(true);
    } else {
      navigation.push('SongDetails', {songId, musicianId: singerId});
    }
  };

  const sendOnPress = () => {
    const reportBody: ReportParamsProps = {
      reportType: 'song',
      reportTypeId: songId.toString() ?? '',
      reporterUuid: MyUuid ?? '',
      reportedUuid: singerId ?? '',
      reportCategory: t(selectedCategory ?? ''),
      reportReason: reason ?? '',
    };
    setPostReport(reportBody);
  };

  const closeModalSuccess = () => {
    setDataReport(false);
  };

  useEffect(() => {
    if (props.songId) {
      getShareLink({
        scheme: `/song/${props.songId}`,
        image: props.imgUri,
        title: t('ShareLink.Music.Title', {title: props.musicTitle}),
        description: t('ShareLink.Music.Song', {owner: props.singerName}),
      });
    }
  }, [props.songId]);

  return (
    <>
      <ListCard.MusicList
        dataFilter={newDataMore ? newDataMore : dataMore}
        onPressMore={newDataMore ? newOnPressMore : resultDataMore}
        {...props}
      />

      <ModalDonate
        userId={singerId}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={() => setModalDonate(false)}
        onModalHide={() => setModalSuccessDonate(true)}
      />

      <ModalShare
        url={shareLink}
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('Home.Tab.TopSong.Share')}
        hideMusic={true}
        onPressCopy={onPressCopy}
        disabled={!successGetLink}
      />

      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal}
        toggleModal={onPressSuccess}
      />

      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <CheckCircle2Icon />
            <Gap width={4} />
            <Text style={[styles.textStyle]} numberOfLines={2}>
              {textToast}
            </Text>
          </View>
        }
        modalStyle={styles.toast}
      />

      <ModalReport
        modalVisible={reportToast}
        onPressClose={() => setReportToast(false)}
        title={`${t('ModalComponent.Report.Type.Song.FirstTitle')}`}
        secondTitle={`${t('ModalComponent.Report.Type.Song.SecondTitle')}`}
        dataReport={reportingMenu}
        onPressOk={sendOnPress}
        category={setSelectedCategory}
        reportReason={setReason}
      />
      {/* //? When report succesfully */}
      <SuccessToast
        toastVisible={dataReport}
        onBackPressed={closeModalSuccess}
        caption={t('ModalComponent.Report.ReportSuccess')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStyle: {
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    width: widthResponsive(30),
    color: color.Dark[100],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ms(12),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(14),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    lineHeight: mvs(12),
    color: color.Dark[100],
  },
  likeButton: {
    justifyContent: 'center',
    marginRight: ms(5),
  },
  dotsButton: {
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  toast: {
    maxWidth: '100%',
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
