import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  InteractionManager,
} from 'react-native';
import {mvs} from 'react-native-size-matters';

import {Dropdown} from '../DropDown';
import {color, font} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {Image} from 'react-native-image-crop-picker';
import {dataVisibility} from '../../../data/playlist';
import {uploadImage} from '../../../api/uploadImage.api';
import {addSong, createPlaylist} from '../../../api/playlist.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import checkEmptyProperties from '../../../utils/checkEmptyProperties';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {useTranslation} from 'react-i18next';

interface Props {
  goToPlaylist: (id: number) => void;
  onPressGoBack: () => void;
  songAddedToPlaylist: {id: number[]; type?: string};
}

export const CreateNewPlaylistContent: React.FC<Props> = ({
  goToPlaylist,
  onPressGoBack,
  songAddedToPlaylist,
}) => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    playlistName: '',
    playlistDesc: '',
    isPublic: '',
    thumbnailUrl: '',
  });

  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const resetImage = () => {
    setPlaylistUri({path: ''});
    setState({...state, thumbnailUrl: ''});
    closeModal();
  };

  const setUploadImage = async (image: Image) => {
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    try {
      const response = await uploadImage(image);
      setState({...state, thumbnailUrl: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendUri = (val: Image) => {
    setUploadImage(val);
    setPlaylistUri(val);
  };

  const openModal = (type: string) => {
    setModalVisible({
      ...isModalVisible,
      [type]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const addSongToPlaylist = async (id: number) => {
    if (songAddedToPlaylist !== undefined) {
      if (songAddedToPlaylist?.type === 'song') {
        await addSong({
          playlistId: id,
          songId: songAddedToPlaylist.id[0],
        });
      }
    }
  };

  const onPressConfirm = async () => {
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    try {
      const payload = {
        name: state.playlistName,
        description: state.playlistDesc,
        thumbnailUrl: state.thumbnailUrl,
        isPublic: state.isPublic === 'Public',
      };
      const response = await createPlaylist(payload);
      // to add song to new created playlist
      addSongToPlaylist(response.data.id);
      goToPlaylist(response.data.id);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disabledButton = checkEmptyProperties({
    playlistName: state.playlistName,
    isPublic: state.isPublic,
  });
  const colorDisabled = [color.Dark[50], color.Dark[50]];
  const defaultGradient = ['#F98FD9', '#FF70D4'];

  const hideMenuDelete =
    playlistUri?.path !== undefined && playlistUri?.path !== '';

  const maxColorTitle =
    state.playlistName.length === 100 ? color.Error[400] : color.Neutral[10];
  const maxColorDesc =
    state.playlistDesc.length === 600 ? color.Error[400] : color.Neutral[10];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Music.NewPlaylist.Title')}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          containerStyles={{paddingHorizontal: widthPercentage(12)}}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <PhotoPlaylist
            uri={playlistUri?.path}
            showIcon
            onPress={() => openModal('modalImage')}
          />

          <View>
            <SsuInput.InputLabel
              label=""
              value={state.playlistName}
              onChangeText={(newText: string) => {
                onChangeText('playlistName', newText);
              }}
              placeholder={t('Music.NewPlaylist.Placeholder.Name') || ''}
              containerStyles={styles.textInput}
              maxLength={100}
              numberOfLines={1}
            />
            <Text
              style={[
                styles.length,
                {color: maxColorTitle},
              ]}>{`${state.playlistName.length}/100`}</Text>
          </View>

          <View>
            <SsuInput.InputLabel
              label=""
              value={state.playlistDesc}
              onChangeText={(newText: string) => {
                onChangeText('playlistDesc', newText);
              }}
              placeholder={t('Music.NewPlaylist.Placeholder.Desc') || ''}
              inputStyles={styles.inputDesc}
              maxLength={600}
              numberOfLines={5}
              multiline
              containerStyles={{
                marginTop: heightPercentage(15),
                marginBottom: heightPercentage(4),
              }}
            />
            <Text
              style={[
                styles.length,
                {color: maxColorDesc},
              ]}>{`${state.playlistDesc.length}/600`}</Text>
          </View>

          <Dropdown.Input
            data={dataVisibility}
            placeHolder={t('Music.NewPlaylist.Visibility.Title') || ''}
            dropdownLabel={t('Music.NewPlaylist.Visibility.Title') || ''}
            textTyped={(newText: {label: string; value: string}) =>
              onChangeText('isPublic', newText.value)
            }
            containerStyles={{
              marginTop: heightPercentage(15),
              width: width * 0.9,
            }}
            translation={true}
          />

          <View style={styles.footer}>
            <Button
              type="border"
              label={t('Btn.Cancel') || ''}
              containerStyles={styles.btnContainer}
              textStyles={{color: color.Pink.linear}}
              onPress={onPressGoBack}
            />
            <ButtonGradient
              label={t('Btn.Create') || ''}
              disabled={disabledButton}
              colors={disabledButton ? colorDisabled : defaultGradient}
              onPress={() => openModal('modalConfirm')}
              gradientStyles={styles.btnContainer}
            />
          </View>
        </ScrollView>

        <ModalImagePicker
          title={t('Music.NewPlaylist.Cover') || ''}
          modalVisible={isModalVisible.modalImage}
          sendUri={sendUri}
          onDeleteImage={resetImage}
          onPressClose={closeModal}
          hideMenuDelete={hideMenuDelete}
        />

        <ModalConfirm
          modalVisible={isModalVisible.modalConfirm}
          title={t('Btn.Save') || ''}
          subtitle={t('Modal.Playlist.Save') || ''}
          onPressClose={closeModal}
          onPressOk={onPressConfirm}
          disabled={isLoading}
        />

        <ModalLoading visible={isLoading} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthPercentage(12),
    alignItems: 'center',
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
  textInput: {
    width: width * 0.9,
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(4),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightPercentage(40),
  },
  btnContainer: {
    width: widthPercentage(150),
    aspectRatio: heightPercentage(150 / 36),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 3 / 1,
    textAlignVertical: 'top',
    marginBottom: heightPercentage(4),
  },
  length: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
  },
});
