import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {useListenerAlsoLikesStore} from '../../../store/listenerAlsoLike';
import {PlayPinkIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {widthResponsive} from '../../../utils';
import MusiciansListCard from '../ListCard/MusiciansListCard';
import {color, font} from '../../../theme';

const ListenerLikes = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {storedListenerLikes} = useListenerAlsoLikesStore();

  return (
    <View style={styles.container}>
      {/* TITLE AREA */}
      <View style={styles.titleContainer}>
        <PlayPinkIcon />
        <Gap width={10} />
        <Text style={styles.title}>
          {t('Home.Tab.Analytic.Album.ListenerLikes.Title')}
        </Text>
      </View>
      {/* BODY AREA */}
      {storedListenerLikes && (
        <View>
          {storedListenerLikes.map((item, index) => (
            <View
              style={{
                marginTop:
                  index !== 0 ? widthResponsive(12) : widthResponsive(20),
              }}
              key={index}>
              <MusiciansListCard
                musicianNum={index + 1}
                onPressMore={() => {}}
                activeMore={false}
                onPressImage={() => {
                  // navigation.navigate('OtherUserProfile', {id: item.uuid})
                }}
                musicianName={item.fullname}
                imgUri={item.imageProfileUrls[0]?.image}
                containerStyles={{marginBottom: widthResponsive(12)}}
                imageSize={36}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ListenerLikes;

const styles = StyleSheet.create({
  container: {
    padding: widthResponsive(20),
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(18),
    color: color.Neutral[10],
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
});
