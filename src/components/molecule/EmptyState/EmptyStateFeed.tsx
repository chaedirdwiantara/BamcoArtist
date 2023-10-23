import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {EmptyState} from './EmptyState';
import {widthResponsive} from '../../../utils';
import {Button, Gap} from '../../atom';
import {color} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {useTranslation} from 'react-i18next';

interface EmptyStateFeedProps {
  text: string;
  buttonCaption?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const EmptyStateFeed: FC<EmptyStateFeedProps> = (
  props: EmptyStateFeedProps,
) => {
  const {text, buttonCaption, icon, onPress} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {t} = useTranslation();

  const buttonOnPress = () => {
    navigation.navigate('DiscoverArtist');
  };

  return (
    <View style={styles.container}>
      <EmptyState
        text={text}
        containerStyle={{
          flex: 0,
          justifyContent: 'flex-start',
          paddingTop: widthResponsive(24),
        }}
        icon={icon}
      />
      <Gap height={24} />
      <Button
        label={buttonCaption ?? t('DiscoverArtist.Title')}
        containerStyles={styles.buttonStyle}
        onPress={onPress ?? buttonOnPress}
      />
    </View>
  );
};

export default EmptyStateFeed;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: color.Pink[200],
    width: undefined,
    aspectRatio: undefined,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(12),
  },
});
