import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../../utils';
import PopularPost from './PopularPost';
import MostPlayed from './MostPlayed';
import Released from './Released';
import Merch from './Merch';

interface MainTabProps {
  uuid?: string;
}

const MainTab: FC<MainTabProps> = (props: MainTabProps) => {
  const {uuid} = props;
  return (
    <View style={styles.container}>
      {uuid && <PopularPost uuidMusician={uuid} />}
      {uuid && <MostPlayed uuidMusician={uuid} />}
      <Merch />
      {uuid && <Released uuidMusician={uuid} />}
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: widthResponsive(14),
  },
});
