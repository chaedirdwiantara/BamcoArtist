import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Button, SsuInput} from '../../atom';
import Font from '../../../theme/Font';
import SsuSheet from '../../atom/SsuSheet';
import {color} from '../../../theme';
import {
  CheckIcon,
  CloseIcon,
  Fb2Icon,
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
  TwitterIcon,
  VkIcon,
  WeiboIcon,
} from '../../../assets/icon';
import {useProfileHook} from '../../../hooks/use-profile.hook';
import {nameValue} from '../../../interface/base.interface';
import {Social} from '../../../data/profile';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {useTranslation} from 'react-i18next';

interface ModalSocMedProps {
  titleModal: string;
  modalVisible: boolean;
  onPressClose: () => void;
}

export const ModalSocMed: React.FC<ModalSocMedProps> = ({
  titleModal,
  modalVisible,
  onPressClose,
}) => {
  const {t} = useTranslation();
  const {isLoading, updateProfileUser, getProfileUser, dataProfile} =
    useProfileHook();
  const [focusInput, setFocusInput] = useState<string>('');
  const [listSocmed, setListSocmed] = useState<nameValue[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);

  const onPressSave = (name: string, value: string, username: string) => {
    const newArray = {name, value, username};
    setListSocmed([...listSocmed, newArray]);
    setSubmit(true);
  };

  const onPressUnset = (item: string) => {
    if (listSocmed) {
      const newArray = listSocmed?.filter(val => {
        return val.Name !== item && val.name !== item;
      });
      setListSocmed(newArray);
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit) {
      updateProfileUser({
        socialMedia: listSocmed as any,
      });
      setFocusInput('');
      setSubmit(false);
    }
  }, [submit]);

  useEffect(() => {
    if (dataProfile?.data.socialMedia) {
      setListSocmed(dataProfile.data.socialMedia);
    }
  }, [dataProfile]);

  useEffect(() => {
    getProfileUser();
  }, []);

  const ListSocMed = ({item}: {item: string}) => {
    const defaultValue = listSocmed.find(i => i.name === item)
      ?.username as string;
    const [newValue, setNewValue] = useState(defaultValue);
    const isFocus = focusInput === item;
    const icon =
      item === 'facebook' ? (
        <Fb2Icon width={18} height={18} />
      ) : item === 'twitter' ? (
        <TwitterIcon width={18} height={18} />
      ) : item === 'instagram' ? (
        <InstagramIcon width={18} height={18} />
      ) : item === 'tiktok' ? (
        <TiktokIcon width={18} height={18} />
      ) : item === 'snapchat' ? (
        <SnapchatIcon width={18} height={18} />
      ) : item === 'vk' ? (
        <VkIcon width={18} height={18} />
      ) : item === 'weibo' ? (
        <WeiboIcon width={18} height={18} />
      ) : null;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          borderBottomColor: color.Pink.linear,
          borderBottomWidth: isFocus ? 1 : 0,
        }}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: color.Dark[400],
            padding: 6,
          }}>
          {icon}
        </View>
        <SsuInput.InputText
          placeholder={t('Setting.Account.Placeholder.Username') || ''}
          fontColor={color.Neutral[10]}
          disabled={!isFocus}
          containerStyles={styles.containerContent}
          isFocus={isFocus}
          autoFocus={isFocus}
          value={newValue}
          defaultValue={defaultValue}
          onChangeText={val => setNewValue(val)}
        />
        {isFocus ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '25%',
            }}>
            <TouchableOpacity
              onPress={() => onPressSave(item, newValue, newValue)}>
              <CheckIcon width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFocusInput('')}>
              <CloseIcon stroke="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            label={newValue ? t('Btn.Unset') : t('Btn.Set')}
            onPress={() =>
              newValue ? onPressUnset(item) : setFocusInput(item)
            }
            containerStyles={styles.button}
          />
        )}
      </View>
    );
  };

  const children = () => {
    return (
      <>
        <Text style={styles.titleStyle}>{titleModal}</Text>
        <View style={styles.separator} />
        {Social.map((item, i) => {
          return <ListSocMed key={i} item={item} />;
        })}

        <Button
          type="border"
          label={t('Btn.Finish')}
          containerStyles={styles.btnCancel}
          textStyles={{color: color.Pink.linear}}
          onPress={onPressClose}
        />

        <ModalLoading visible={isLoading} />
      </>
    );
  };

  return (
    <Modal avoidKeyboard isVisible={modalVisible} style={{margin: 0}}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <SsuSheet children={children()} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Font.InterSemiBold,
    fontSize: normalize(18),
    lineHeight: mvs(28),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  separator: {
    backgroundColor: '#2B3240',
    width: width,
    height: mvs(1),
    marginVertical: heightPercentage(30),
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnCancel: {
    width: widthPercentage(327),
    aspectRatio: heightPercentage(327 / 40),
    marginTop: heightPercentage(10),
  },
  containerContent: {
    width: '78%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  button: {
    width: '25%',
    aspectRatio: heightPercentage(120 / 40),
    alignSelf: 'center',
    backgroundColor: color.Pink[200],
  },
});
