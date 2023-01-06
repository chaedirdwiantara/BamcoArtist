import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {color, font} from '../../../theme';
import {Dropdown} from '../DropDown';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ArrowLeftIcon} from '../../../assets/icon';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataVisibility} from '../../../data/playlist';
import {createPlaylist} from '../../../api/playlist.api';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {Button, ButtonGradient, SsuInput} from '../../atom';
import checkEmptyProperties from '../../../utils/checkEmptyProperties';

interface Props {
  goToPlaylist: (id: number) => void;
  onPressGoBack: () => void;
}

export const CreateNewPlaylistContent: React.FC<Props> = ({
  goToPlaylist,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    playlistName: '',
    playlistDesc: '',
    isPublic: true,
  });
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: undefined,
  });
  const [focusInput, setFocusInput] = useState<'name' | 'description' | null>(
    null,
  );

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const resetImage = () => {
    setPlaylistUri({path: undefined});
    closeModal();
  };

  const sendUri = (val: React.SetStateAction<{path: undefined}>) => {
    setPlaylistUri(val);
  };

  const handleFocusInput = (focus: 'name' | 'description' | null) => {
    setFocusInput(focus);
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

  const onPressConfirm = async () => {
    try {
      const payload = {
        name: state.playlistName,
        description: state.playlistDesc,
        thumbnailUrl: '',
        isPublic: true,
      };
      const response = await createPlaylist(payload);
      goToPlaylist(response.data.id);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const disabledButton = checkEmptyProperties({
    playlistName: state.playlistName,
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title="New Playlist"
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
            <SsuInput.TextArea
              value={state.playlistName}
              onChangeText={(newText: string) =>
                onChangeText('playlistName', newText)
              }
              placeholder={'Playlist Name'}
              containerStyles={styles.textInput}
              numberOfLines={1}
              maxLength={100}
              multiline={false}
              onFocus={() => {
                handleFocusInput('name');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isFocus={focusInput === 'name'}
            />
            <Text
              style={[
                styles.length,
                {color: maxColorTitle},
              ]}>{`${state.playlistName.length}/100`}</Text>
          </View>

          <View>
            <SsuInput.TextArea
              value={state.playlistDesc}
              onChangeText={(newText: string) =>
                onChangeText('playlistDesc', newText)
              }
              placeholder={'Playlist Description'}
              containerStyles={styles.textArea}
              multiline
              numberOfLines={5}
              maxLength={600}
              inputStyles={styles.inputDesc}
              onFocus={() => {
                handleFocusInput('description');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isFocus={focusInput === 'description'}
            />
            <Text
              style={[
                styles.length,
                {color: maxColorDesc},
              ]}>{`${state.playlistDesc.length}/600`}</Text>
          </View>

          <Dropdown.Input
            data={dataVisibility}
            placeHolder={'Visibility'}
            dropdownLabel={'Visibility'}
            textTyped={(newText: string) => onChangeText('isPublic', newText)}
            containerStyles={{marginTop: heightPercentage(15)}}
          />

          <View style={styles.footer}>
            <Button
              type="border"
              label="Cancel"
              containerStyles={styles.btnContainer}
              textStyles={{color: color.Pink.linear}}
              onPress={() => null}
            />
            <ButtonGradient
              label={'Create'}
              disabled={disabledButton}
              colors={disabledButton ? colorDisabled : defaultGradient}
              onPress={() => openModal('modalConfirm')}
              gradientStyles={styles.btnContainer}
            />
          </View>
        </ScrollView>

        <ModalImagePicker
          title="Edit Playlist Cover"
          modalVisible={isModalVisible.modalImage}
          sendUri={sendUri}
          onDeleteImage={resetImage}
          onPressClose={closeModal}
          hideMenuDelete={hideMenuDelete}
        />
        <ModalConfirm
          modalVisible={isModalVisible.modalConfirm}
          title="Save"
          subtitle="Are you sure you want to save your new playlist?"
          onPressClose={closeModal}
          onPressOk={onPressConfirm}
        />
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
  textArea: {
    paddingHorizontal: 0,
    marginBottom: heightPercentage(4),
    marginTop: heightPercentage(15),
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
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  length: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
  },
});
