import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import {EventScreen} from '../screen/Event';
import {FeedScreen} from '../screen/Feed';
import {ForgotPassword} from '../screen/ForgotPassword';
import {HomeScreen} from '../screen/Home';
import {LoginScreen} from '../screen/Login';
import {OnboardScreen} from '../screen/Onboard';
import {Otp} from '../screen/Otp';
import {PreferenceScreen} from '../screen/Preference';
import {ReferralScreen} from '../screen/Referral';
import {SignInGuestScreen} from '../screen/SignInGuest';
import {SignupScreen} from '../screen/Signup';
import {Notification} from '../screen/Notification';
import {PostDetail} from '../screen/Detail/PostDetail';
import {SearchScreen} from '../screen/Search/Search';
import MusicianProfile from '../screen/MusicianProfile';
import {WebviewPage} from '../screen/Webview';
import {MusicPlayer} from '../screen/Music';

// Setting
import {SettingScreen} from '../screen/Setting/Setting';
import {AccountScreen} from '../screen/Setting/Account';
import {EmailScreen} from '../screen/Setting/Email/Email';
import {ChangeEmailScreen} from '../screen/Setting/Email/ChangeEmail';
import {ChangePasswordScreen} from '../screen/Setting/ChangePassword';
import {LanguageScreen} from '../screen/Setting/Language';
import {ReferralCodeSetting} from '../screen/Setting/ReferralCode';
import {PhoneNumberScreen} from '../screen/Setting/PhoneNumber';
import {ShippingInformationScreen} from '../screen/Setting/ShippingInformation';
import {DonationAndSubscription} from '../screen/Setting/DonationAndSubscription';
import {SendReportScreen} from '../screen/Setting/SendReport';

// Profile
import {ProfileScreen} from '../screen/Profile/Profile';
import {EditProfileScreen} from '../screen/Profile/EditProfile';
import {FollowingScreen} from '../screen/Profile/FollowingScreen';
import {ExclusiveContentScreen} from '../screen/ExclusiveContent';

// Playlist
import {PlaylistScreen} from '../screen/Playlist/Playlist';
import {CreateNewPlaylist} from '../screen/Playlist/CreateNewPlaylist';
import {EditPlaylist} from '../screen/Playlist/EditPlaylist';
import {AddToPlaylistScreen} from '../screen/Playlist/AddToPlaylist';
import {AddSongScreen} from '../screen/Playlist/AddSong';

// Song Details
import {ShowCreditScreen} from '../screen/SongDetails/ShowCredit';
import {SongDetailsScreen} from '../screen/SongDetails/SongDetails';

// Album
import {AlbumScreen} from '../screen/Album/Album';

// TopUp
import {TopupCoinScreen} from '../screen/TopupCoin';

// Merch
import {MerchDetail} from '../screen/MerchDetail';

import {storage} from '../hooks/use-storage.hook';

// Icon
import {CrownIcon, FeedIcon, HomeIcon, UserProfileIcon} from '../assets/icon';

import Font from '../theme/Font';
import Color from '../theme/Color';
import {normalize} from '../utils';
import {PostList} from '../interface/feed.interface';
import {MerchListType} from '../data/merchList';
import {ConcertDetail} from '../screen/ConcertDetail';

export type RootStackParams = {
  Account: undefined;
  AddToPlaylist: undefined;
  AddSong: undefined;
  Album: undefined;
  Boarding: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  CreateNewPlaylist: undefined;
  DonationAndSubscription: undefined;
  EditProfile: undefined;
  EditPlaylist: undefined;
  Email: undefined;
  ExclusiveContent: undefined;
  Following: undefined;
  ForgotPassword: undefined;
  Language: undefined;
  Login: undefined;
  MainTab: undefined;
  Otp: {
    id: string;
    type: 'email' | 'phoneNumber';
    title: string;
    subtitle: string;
  };
  PhoneNumber: undefined;
  Playlist: undefined;
  Preference: undefined;
  Referral: undefined;
  ReferralCode: undefined;
  SendReport: undefined;
  Setting: undefined;
  Signup: undefined;
  SignInGuest: undefined;
  ShippingInformation: undefined;
  ShowCredit: undefined;
  SongDetails: {
    id: number;
  };
  Notification: undefined;
  PostDetail: PostList;
  SearchScreen: undefined;
  TopupCoin: undefined;
  MusicianProfile: {
    id: string;
  };
  Webview: {
    title: string;
    url: string;
  };
  MusicPlayer: undefined;
  MerchDetail: MerchListType;
  ConcertDetail: MerchListType;
};

export type MainTabParams = {
  Collection: undefined;
  Event: undefined;
  Feed: undefined;
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};

const screenOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const MainTab = createBottomTabNavigator<MainTabParams>();
const TabScreen = () => (
  <MainTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Color.Pink[200],
      tabBarInactiveTintColor: Color.Dark[300],
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        height: Platform.OS === 'ios' ? 84 : 64,
        backgroundColor: '#0F1319',
        borderTopColor: Color.Dark[800],
      },
    }}>
    <MainTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <HomeIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Home'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <FeedIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Feed'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Event"
      component={EventScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <CrownIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Event'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <UserProfileIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Profile'}</Text>
          </View>
        ),
      }}
    />
  </MainTab.Navigator>
);

const RootStack = createNativeStackNavigator<RootStackParams>();
export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={screenOption}
    initialRouteName={
      storage.getBoolean('isLogin')
        ? 'MainTab'
        : storage.getBoolean('isOnboard')
        ? 'SignInGuest'
        : 'Boarding'
    }>
    <RootStack.Screen name="Boarding" component={OnboardScreen} />
    <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
    <RootStack.Screen name="AddToPlaylist" component={AddToPlaylistScreen} />
    <RootStack.Screen name="AddSong" component={AddSongScreen} />
    <RootStack.Screen name="CreateNewPlaylist" component={CreateNewPlaylist} />
    <RootStack.Screen name="EditPlaylist" component={EditPlaylist} />
    <RootStack.Screen name="Playlist" component={PlaylistScreen} />
    <RootStack.Screen name="Following" component={FollowingScreen} />
    <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Otp" component={Otp} />
    <RootStack.Screen name="Preference" component={PreferenceScreen} />
    <RootStack.Screen name="Referral" component={ReferralScreen} />
    <RootStack.Screen name="Account" component={AccountScreen} />
    <RootStack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
    <RootStack.Screen name="Email" component={EmailScreen} />
    <RootStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
    <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <RootStack.Screen name="ReferralCode" component={ReferralCodeSetting} />
    <RootStack.Screen name="Language" component={LanguageScreen} />
    <RootStack.Screen
      name="ShippingInformation"
      component={ShippingInformationScreen}
    />
    <RootStack.Screen
      name="DonationAndSubscription"
      component={DonationAndSubscription}
    />
    <RootStack.Screen name="SendReport" component={SendReportScreen} />
    <RootStack.Screen name="Setting" component={SettingScreen} />
    <RootStack.Screen name="SongDetails" component={SongDetailsScreen} />
    <RootStack.Screen name="ShowCredit" component={ShowCreditScreen} />
    <RootStack.Screen name="Album" component={AlbumScreen} />
    <RootStack.Screen name="SignInGuest" component={SignInGuestScreen} />
    <RootStack.Screen name="Signup" component={SignupScreen} />
    <RootStack.Screen name="MainTab" component={TabScreen} />
    <RootStack.Screen name="Notification" component={Notification} />
    <RootStack.Screen
      name="ExclusiveContent"
      component={ExclusiveContentScreen}
    />
    <RootStack.Screen name="PostDetail" component={PostDetail} />
    <RootStack.Screen name="SearchScreen" component={SearchScreen} />
    <RootStack.Screen name="MusicianProfile" component={MusicianProfile} />
    <RootStack.Screen name="Webview" component={WebviewPage} />
    <RootStack.Screen name="MusicPlayer" component={MusicPlayer} />
    <RootStack.Screen name="TopupCoin" component={TopupCoinScreen} />
    <RootStack.Screen name="MerchDetail" component={MerchDetail} />
    <RootStack.Screen name="ConcertDetail" component={ConcertDetail} />
  </RootStack.Navigator>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginTop: 2,
  },
});
