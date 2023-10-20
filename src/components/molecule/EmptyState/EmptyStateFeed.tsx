import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {EmptyState} from './EmptyState';
import {widthResponsive} from '../../../utils';
import {Button, Gap} from '../../atom';
import {color} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

interface EmptyStateFeedProps {
  text: string;
  icon?: React.ReactNode;
}

const EmptyStateFeed: FC<EmptyStateFeedProps> = (
  props: EmptyStateFeedProps,
) => {
  const {text, icon} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
        label="Discover Artist"
        containerStyles={styles.buttonStyle}
        onPress={buttonOnPress}
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
