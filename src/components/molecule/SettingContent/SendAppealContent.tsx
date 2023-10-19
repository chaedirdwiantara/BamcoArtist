import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

import {color, font} from '../../../theme';
import {Button, SsuInput} from '../../atom';
import {
  AlbumReportedType,
  CommentReportedType,
  PostReportedType,
  SongReportedType,
} from '../../../interface/setting.interface';
import {ModalLimit} from '../Modal/ModalLimit';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {width, widthPercentage} from '../../../utils';
import {requestAppeal} from '../../../api/setting.api';
import CommentAppeal from '../AppealCard/CommentAppeal';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalSuccessDonate} from '../Modal/ModalSuccessDonate';
import {useUploadImageHook} from '../../../hooks/use-uploadImage.hook';
import PostAppeal from '../AppealCard/PostAppeal';
import MusicAppeal from '../AppealCard/MusicAppeal';
import AlbumAppeal from '../AppealCard/AlbumAppeal';
import {KeyboardShift} from '../KeyboardShift';

interface SendAppealProps {
  type?: string;
  selectedViolation?: PostReportedType &
    CommentReportedType &
    SongReportedType &
    AlbumReportedType;
  onPressGoBack: () => void;
  goToHome: () => void;
}

export const SendAppealContent: React.FC<SendAppealProps> = ({
  type,
  selectedViolation,
  onPressGoBack,
  goToHome,
}) => {
  const {t} = useTranslation();
  const [description, setDescription] = useState<string>('');
  const [listImage, setListImage] = useState<Image[]>([]);
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalLimit, setShowModalLimit] = useState<boolean>(false);
  const [modalLimitType, setModalLimitType] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [unUploadedPhotos, setUnUploadedPhotos] = useState<Image[]>([]);

  useEffect(() => {
    if (unUploadedPhotos.length > 0 && active) {
      for (let i = 0; i < unUploadedPhotos.length; i++) {
        setUploadImage(unUploadedPhotos[i]);
      }
    }
  }, [unUploadedPhotos]);

  useEffect(() => {
    if (active) {
      dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
        ? setDataResponseImg([...dataResponseImg, dataImage?.data])
        : null;
    }
  }, [dataImage]);

  const onPressSend = async () => {
    try {
      const selectedId = selectedViolation
        ? {reportedViolationId: selectedViolation.reportedViolationId}
        : {};
      const payload = {
        ...selectedId,
        description,
        images: dataResponseImg,
      };
      await requestAppeal(payload);
      setShowModalSuccess(true);
    } catch (error) {}
  };

  const sendSingleUri = (val: Image) => {
    const allPhotos = [...listImage, val];
    setUnUploadedPhotos([val]);
    setListImage(allPhotos);
  };

  const sendMultipleUri = (val: Image[]) => {
    setActive(true);
    let newVal: Image[] = [];
    let newUniqueImageVal: Image[] = [];
    const allLength = listImage.length + val.length;
    val.map(res => {
      // check if new image is not include in listImage, compare using filename / size
      const propertyToCompare = Platform.OS === 'ios' ? 'filename' : 'size';
      if (
        listImage.length === 0 ||
        listImage.filter(v => v[propertyToCompare] === res[propertyToCompare])
          .length === 0
      ) {
        newUniqueImageVal.push(res);
      }
    });

    newVal =
      allLength > 4
        ? newUniqueImageVal.slice(0, 4 - listImage.length)
        : newUniqueImageVal;

    const allPhotos = [...listImage, ...newVal];
    setUnUploadedPhotos(newVal);
    setListImage(allPhotos);

    if (allLength > 4) {
      setShowModalLimit(true);
      setModalLimitType('onUpload');
    }
  };

  const onCameraPress = () => {
    if (listImage.length >= 4) {
      setShowModalLimit(true);
      setModalLimitType('');
    } else {
      ImagePicker.openCamera({
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        compressImageQuality: 0.9,
        cropping: true,
      }).then(image => {
        sendSingleUri(image);
      });
    }
  };

  const onImageLibraryPress = () => {
    if (listImage.length >= 4) {
      setShowModalLimit(true);
      setModalLimitType('');
    } else {
      ImagePicker.openPicker({
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        compressImageQuality: 0.9,
        cropping: true,
        multiple: true,
        maxFiles: 4 - listImage.length,
      }).then(image => {
        sendMultipleUri(image);
      });
    }
  };

  const removeImage = (id: number) => {
    setActive(false);
    setListImage(listImage.filter((x: Image) => x.path !== listImage[id].path));
    const newImage = [...dataResponseImg];
    newImage.splice(id, 1);
    setDataResponseImg(newImage);
  };

  return (
    <KeyboardShift>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Setting.Report.Modal.SendAppeal')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{paddingHorizontal: widthPercentage(12)}}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedViolation ? (
            <>
              <View style={styles.containerViolation}>
                <Text style={styles.title}>
                  {t('Setting.SendAppeal.ContentToRecover')}
                </Text>
                {type === 'post' ? (
                  <PostAppeal
                    data={selectedViolation}
                    containerStyles={{marginBottom: mvs(15)}}
                    hideChoiceIcon={true}
                  />
                ) : type === 'comment' ? (
                  <CommentAppeal
                    fullname={selectedViolation.commentOwner.fullname}
                    username={selectedViolation.commentOwner.username}
                    repliedTo={selectedViolation.repliedTo}
                    postDate={selectedViolation.timeAgo}
                    caption={selectedViolation.caption}
                    likesCount={selectedViolation.likesCount}
                    commentsCount={selectedViolation.commentsCount}
                    containerStyles={{marginBottom: mvs(15)}}
                    hideChoiceIcon={true}
                  />
                ) : type === 'song' ? (
                  <MusicAppeal
                    title={selectedViolation.title}
                    musician={selectedViolation.musicianName}
                    coverImage={selectedViolation.image}
                    duration={selectedViolation.songDuration}
                    containerStyles={{marginBottom: mvs(15)}}
                    hideChoiceIcon={true}
                  />
                ) : (
                  <AlbumAppeal
                    title={selectedViolation.title}
                    coverImage={selectedViolation.image}
                    year={selectedViolation.productionYear}
                    numberOfSongs={selectedViolation.songTotal}
                    containerStyles={{marginBottom: mvs(15)}}
                    hideChoiceIcon={true}
                  />
                )}
              </View>
              <View style={styles.separator} />
            </>
          ) : null}

          <SsuInput.InputLabel
            value={description}
            onChangeText={(newText: string) => setDescription(newText)}
            placeholder={t('Setting.Report.Placeholder.Text') || ''}
            containerStyles={styles.textArea}
            multiline
            numberOfLines={10}
            inputStyles={styles.inputDesc}
            showImage={true}
            onPressCamera={onCameraPress}
            onPressLibrary={onImageLibraryPress}
            containerInputStyles={{borderBottomWidth: 0}}
            listImage={listImage}
            onPressDeleteImage={removeImage}
            blurOnSubmit={true}
          />

          <Button
            label={t('Btn.Send')}
            onPress={onPressSend}
            containerStyles={styles.button}
          />
          <ModalLoading visible={isLoadingImage} />

          <ModalSuccessDonate
            title={t('Setting.SendAppeal.ModalSuccess.Title') || ''}
            subtitle={t('Setting.SendAppeal.ModalSuccess.Subtitle') || ''}
            buttonText={t('Btn.Dismiss') || ''}
            modalVisible={showModalSuccess}
            toggleModal={goToHome}
          />

          <ModalLimit
            text={
              modalLimitType === 'onUpload'
                ? t('Modal.Limit.SubtitleSR2')
                : t('Modal.Limit.SubtitleSR1')
            }
            modalVisible={showModalLimit}
            onPressClose={() => setShowModalLimit(false)}
          />
        </ScrollView>
      </View>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  textInput: {
    marginTop: mvs(10),
  },
  textArea: {
    paddingHorizontal: widthPercentage(10),
    marginTop: mvs(10),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 2 / 1,
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  button: {
    width: width * 0.9,
    aspectRatio: widthPercentage(327 / 36),
    alignSelf: 'center',
    marginVertical: mvs(40),
  },
  title: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(15),
    lineHeight: mvs(20),
    marginBottom: mvs(10),
  },
  containerViolation: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: mvs(20),
    marginBottom: mvs(15),
  },
  separator: {
    width,
    height: mvs(1),
    backgroundColor: color.Dark[500],
  },
});
