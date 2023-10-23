import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {heightPercentage, width, widthResponsive} from '../../../utils';
import {Button, Gap} from '../../atom';
import {color} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import Typography from '../../../theme/Typography';
import Color from '../../../theme/Color';

interface EmptyStateBookyayProps {
  text: string;
  buttonCaption?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const EmptyStateBookyay: FC<EmptyStateBookyayProps> = (
  props: EmptyStateBookyayProps,
) => {
  const {text, buttonCaption, onPress} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const buttonOnPress = () => {
    navigation.navigate('DiscoverArtist');
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.Caption, styles.subtitle]}>{text}</Text>
      <Gap height={24} />
      <Button
        label={buttonCaption ?? ''}
        containerStyles={styles.buttonStyle}
        onPress={onPress ?? buttonOnPress}
      />
    </View>
  );
};

export default EmptyStateBookyay;

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
  subtitle: {
    color: Color.Neutral[10],
    maxWidth: width * 0.9,
    textAlign: 'center',
    paddingTop: heightPercentage(28),
  },
});
