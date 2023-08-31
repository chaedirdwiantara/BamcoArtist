import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  InteractionManager,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Gap,
  Avatar,
  Button,
  SsuToast,
  EmptyState,
  ModalConfirm,
  TopNavigation,
} from '../../../components';
import {
  ArrowLeftIcon,
  DefaultAvatar,
  TickCircleIcon,
} from '../../../assets/icon';
import {RootStackParams} from '../../../navigations';
import {unblockUser} from '../../../api/setting.api';
import {color, font, typography} from '../../../theme';
import {useSettingHook} from '../../../hooks/use-setting.hook';
import {elipsisText, width, widthPercentage} from '../../../utils';
import {ListBlockedType} from '../../../interface/setting.interface';

export const BlockedUserScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {getListBlockedUser} = useSettingHook();
  const {data: listBlockedUser, refetch} = useQuery('list-blockedUser', () =>
    getListBlockedUser(),
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ListBlockedType>();

  useEffect(() => {
    toastVisible &&
      setTimeout(() => {
        setToastVisible(false);

        // unselect user after toast dissapear
        setSelectedUser(undefined);
      }, 3000);
  }, [toastVisible]);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressConfirm = async () => {
    setShowModal(false);
    try {
      await unblockUser({uuid: selectedUser?.uuid});
      InteractionManager.runAfterInteractions(() => setToastVisible(true));

      // refetch after unblock success
      refetch();
    } catch (error) {}
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('Setting.BlockedUser.Title') || ''}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          paddingHorizontal: ms(15),
        }}
      />

      {listBlockedUser && listBlockedUser.data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginVertical: mvs(15)}}>
          {listBlockedUser.data.map((val, i) => (
            <View key={i}>
              <View style={styles.listContainer}>
                <View style={styles.userSection}>
                  {val.image === null || val.image.length === 0 ? (
                    <DefaultAvatar.MusicianIcon />
                  ) : (
                    <Avatar
                      imgUri={val.image[0].image}
                      size={widthPercentage(44)}
                    />
                  )}
                  <Gap width={10} />
                  <View style={styles.textContainer}>
                    <Text style={styles.fullname} numberOfLines={1}>
                      {val.fullname}
                    </Text>
                    <Text style={styles.username} numberOfLines={1}>
                      {'@' + val.username}
                    </Text>
                  </View>
                </View>

                <Button
                  label={t('Setting.BlockedUser.Unblock')}
                  containerStyles={styles.btnContainer}
                  textStyles={{fontSize: mvs(12)}}
                  onPress={() => {
                    setSelectedUser(val);
                    setShowModal(true);
                  }}
                />
              </View>

              <View
                style={[
                  styles.separator,
                  {
                    borderBottomWidth:
                      listBlockedUser.data.length - 1 === i ? 0 : mvs(1),
                  },
                ]}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          text={t('Setting.BlockedUser.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      )}

      <ModalConfirm
        modalVisible={showModal}
        title={
          t('Setting.BlockedUser.ModalConfirm.Title', {
            username: selectedUser?.username,
          }) || ''
        }
        subtitle={
          t('Setting.BlockedUser.ModalConfirm.Subtitle', {
            username: selectedUser?.username,
          }) || ''
        }
        onPressClose={() => setShowModal(false)}
        onPressOk={onPressConfirm}
      />

      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={ms(21)}
              height={mvs(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={ms(7)} />
            <Text
              numberOfLines={2}
              style={[typography.Button2, styles.textStyle]}>
              {t('Setting.BlockedUser.ToastSuccess', {
                username: elipsisText(selectedUser?.username || '', 10),
              })}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: ms(24)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(14),
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: mvs(22),
    height: mvs(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: ms(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
  listContainer: {
    width: width * 0.9,
    paddingHorizontal: ms(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSection: {
    width: '85%',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  fullname: {
    fontFamily: font.InterRegular,
    fontSize: mvs(14),
    fontWeight: '600',
    color: color.Neutral[10],
    marginBottom: mvs(1),
  },
  username: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
    color: color.Pink[2],
  },
  followerCount: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(10),
    color: color.Dark[50],
  },
  separator: {
    width: width * 0.9,
    borderBottomColor: color.Dark[500],
    alignSelf: 'center',
    marginVertical: mvs(12),
  },
  btnContainer: {
    height: undefined,
    width: ms(70),
    aspectRatio: mvs(70 / 30),
    backgroundColor: '#F4212E',
  },
});
