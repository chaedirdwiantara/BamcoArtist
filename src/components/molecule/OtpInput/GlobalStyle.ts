import { StyleSheet } from 'react-native';
import { color } from '../../../theme';

const styles = StyleSheet.create({
  // For Shadow Style
  shadowStyle: {
    shadowColor: color.Dark[100],
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
});

export default styles;
