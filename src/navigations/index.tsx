import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native-image-crop-picker';
// Screen
import {MerchScreen} from '../screen/Merch';
import {TicketScreen} from '../screen/Ticket';
import {FeedScreen} from '../screen/Feed';
import {ForgotPassword} from '../screen/ForgotPassword';
import {LoginScreen} from '../screen/Login';
import {OnboardScreen} from '../screen/Onboard';
import {Otp} from '../screen/Otp';
import PhotoGallery from '../screen/MusicianProfile/PhotoGallery';
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
import CreatePost from '../screen/CreatePost';
import {OtherUserProfile} from '../screen/OtherUserProfile/OtherUserProfile';
import {FollowingScreen} from '../screen/OtherUserProfile/FollowingScreen';
import QuoteMusic from '../screen/CreatePost/MusicPost/QuoteMusic';
import AddPreview from '../screen/CreatePost/MusicPost/AddPreview';
import YourTopFansScreen from '../screen/Analytics/Fans/YourTopFans/FullScreen';
import AlbumAnalyticScreen from '../screen/Analytics/Album/AlbumFullScreen';
import SongDetailAnalytic from '../screen/Analytics/Album/DetailSong';
import {EventDetail} from '../screen/EventDetail';
import {LiveTipping} from '../screen/LiveTipping';
import ClaimReward from '../screen/EventDetail/ClaimReward';

// Home
import {HomeScreen} from '../screen/Home';
import {ListImageScreen} from '../screen/ListItem/ListImage';
import {ListMusicScreen} from '../screen/ListItem/ListMusic';
import {ListPostScreen} from '../screen/ListItem/ListPost';
import {ProfileProgressScreen} from '../screen/ProfileProgress';

// Setting
import {SettingScreen} from '../screen/Setting/Setting';
import {AccountScreen} from '../screen/Setting/Account';
import {AccountInformationScreen} from '../screen/Setting/Account/AccountInformation';
import {BlockedUserScreen} from '../screen/Setting/Account/BlockedUser';
import {EmailScreen} from '../screen/Setting/Email/Email';
import {ChangeEmailScreen} from '../screen/Setting/Email/ChangeEmail';
import {ChangePasswordScreen} from '../screen/Setting/ChangePassword';
import {LanguageScreen} from '../screen/Setting/Language';
import {ReferralCodeSetting} from '../screen/Setting/ReferralCode';
import {PhoneNumberScreen} from '../screen/Setting/PhoneNumber/PhoneNumber';
import {DonationAndSubscription} from '../screen/Setting/DonationAndSubscription';
import {SendReportScreen} from '../screen/Setting/SendReport';
import {PushNotificationScreen} from '../screen/Setting/PushNotification';
import {PreferenceSettingScreen} from '../screen/Setting/Preference';
import {ExclusiveContentSetting} from '../screen/Setting/ExclusiveContent';
import {SecurityScreen} from '../screen/Setting/Security';
import {TnCAndPPScreen} from '../screen/Setting/TnCAndPP';
import {AboutDeletionScreen} from '../screen/Setting/DeleteAccount/AboutDeletion';
import {InputDeletionScreen} from '../screen/Setting/DeleteAccount/InputDeletion';
import {SendAppealScreen} from '../screen/Setting/SendAppeal/SendAppeal';
import {ReportedContentScreen} from '../screen/Setting/SendAppeal/ReportedContent';
import {ListAddressScreen} from '../screen/Setting/ShippingInfo/ListAddress';
import {AddNewAddressScreen} from '../screen/Setting/ShippingInfo/AddNewAddress';
import {RevenueScreen} from '../screen/Setting/Revenue';
import QrCode from '../screen/Setting/QrCode';
import Device from '../screen/Setting/QrCode/Device';

// Profile
import {ProfileScreen} from '../screen/Profile/Profile';
import {EditProfileScreen} from '../screen/Profile/EditProfile';
import {ExclusiveContentScreen} from '../screen/ExclusiveContent';
import {FollowersScreen} from '../screen/Profile/ListFollowers';
import {RecoverAccountScreen} from '../screen/Profile/RecoverAccount';

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
import {TopUpCreditScreen} from '../screen/TopUpCredit/TopUpCredit';
import {WithdrawalScreen} from '../screen/Withdrawal';
import {NewBankAccountScreen} from '../screen/Withdrawal/NewBankAccount';
import {VerifCodeWithdrawalScreen} from '../screen/Withdrawal/VerifCodeWithdrawal';
import {DetailHistoryTransactionScreen} from '../screen/TopUpCredit/DetailHistoryTransaction';

// Action
import Cart from '../screen/Action/Cart';
import PromoCode from '../screen/Action/PromoCode';
import PromoDetail from '../screen/Action/PromoDetail';
import Checkout from '../screen/Action/Checkout';
import Transaction from '../screen/Action/Transaction';
import TransactionDetailMerch from '../screen/Action/TransactionDetailMerch';
import TransactionDetailTicket from '../screen/Action/TransactionDetailTicket';
import Track from '../screen/Action/Track';
import {MerchDetail} from '../screen/MerchDetail';
import {ConcertDetail} from '../screen/ConcertDetail';
import {TicketDetail} from '../screen/ConcertDetail/TicketDetail';
import Shop from '../screen/Action/Shop';
import {TransactionDetail} from '../screen/Action/TransactionDetail';

// Icon
import {
  CrownIcon,
  FeedIcon,
  HomeIcon,
  UserProfileIcon,
  TicketDefaultIcon,
} from '../assets/icon';

import Font from '../theme/Font';
import Color from '../theme/Color';
import {normalize} from '../utils';
import {MerchListType} from '../data/merchList';

import {SignupSSOScreen} from '../screen/SignupSSO';
import {
  ProfileResponseData,
  RegistrationType,
} from '../interface/profile.interface';

// interface
import {PostList} from '../interface/feed.interface';
import {Playlist} from '../interface/playlist.interface';
import {AlbumData, photos} from '../interface/musician.interface';
import {ChangePNScreen} from '../screen/Setting/PhoneNumber/ChangePN';
import {OtpPNScreen} from '../screen/Setting/PhoneNumber/OTP';
import {useNavigation} from '@react-navigation/native';
import {ListDataSearchSongs} from '../interface/search.interface';
import {
  AlbumReportedType,
  CommentReportedType,
  DataExclusiveResponse,
  DataShippingProps,
  ListViolationsType,
  OtpEmailScreen as OtpEmailProps,
  OtpPhoneScreen,
  PostReportedType,
  SongReportedType,
} from '../interface/setting.interface';
import {OtpEmailScreen} from '../screen/Setting/Email/OTP';
import {SplashScreen} from '../screen/SplashScreen';
import {SongAlbum} from '../interface/song.interface';
import ListPlaylist from '../screen/Playlist/ListPlaylist';
import {MyQRCode} from '../screen/Setting/MyQRCode';
import {TransactionHistoryPropsType} from '../interface/credit.interface';
import {BankAccountPropsType} from '../interface/withdraw.interface';

export type RootStackParams = {
  AboutDeletion: undefined;
  Account: undefined;
  AccountInformation: {
    fromScreen: string;
  };
  AddToPlaylist: {id: number[]; type?: string; fromMainTab?: boolean};
  AddSong: Playlist;
  AddPreview: ListDataSearchSongs;
  Album: AlbumData | SongAlbum | {id: number; type?: string};
  BlockedUser: undefined;
  Boarding: undefined;
  ChangeEmail: {
    type: 'Add' | 'Change';
    oldEmail: string;
  };
  OtpEmail: OtpEmailProps;
  ChangePassword: undefined;
  ChangePhoneNumber: {
    type: 'Add' | 'Change';
    oldPhone: string;
  };
  OtpPhoneNumber: OtpPhoneScreen;
  CreateNewPlaylist: {id?: number[]; type?: string};
  DetailHistoryTransaction: {
    dataDetail: TransactionHistoryPropsType;
  };
  DonationAndSubscription: undefined;
  EditProfile: {data: ProfileResponseData};
  EditPlaylist: Playlist;
  Email: {
    info?: boolean;
    message?: string;
  };
  ExclusiveContent: {
    data?: DataExclusiveResponse;
  };
  ExclusiveContentSetting: {type?: string} | undefined;
  Following: {
    uuid?: string;
  };
  Followers: {
    uuid: string;
  };
  ForgotPassword: undefined;
  InputDeletion: {
    id: number;
    text: string;
  };
  Language: undefined;
  ListImage: {
    title: string;
    filterBy?: string;
    containerStyle?: ViewStyle;
  };
  ListMusic: {
    title: string;
    type: string;
    fromMainTab: boolean;
    id?: number;
    filterBy?: string;
  };
  ListPost: {
    title: string;
  };
  Login: undefined;
  MainTab: undefined;
  QuoteMusic: undefined;
  OtherUserProfile: {id: string};
  Otp: {
    id: string;
    type: 'email' | 'phoneNumber';
    title: string;
    subtitle: string;
    context?: string;
  };
  PhoneNumber: {
    info?: boolean;
    message?: string;
  };
  PhotoGallery: {
    imageData: photos[] | Image[];
    userName: string;
    type: string;
  };
  Playlist: {
    id: number;
    name?: string;
    from?: string;
  };
  Preference: undefined;
  PreferenceSetting: undefined;
  ProfileProgress: undefined;
  PushNotification: undefined;
  RecoverAccount: undefined;
  Referral: undefined;
  ReferralCode: undefined;
  ReportedContent: {
    dataViolation: ListViolationsType;
  };
  SendAppeal: {
    type?: string;
    selectedViolation?: PostReportedType &
      CommentReportedType &
      SongReportedType &
      AlbumReportedType;
  };
  SendReport: {
    title: string;
  };
  Setting: undefined;
  MyQRCode: {uuid?: string; type?: 'fans' | 'otherMusician' | 'myProfile'};
  Security: {
    info?: boolean;
    message?: string;
  };
  Signup: undefined;
  SignupSSO: {
    email: string;
    ssoType: RegistrationType;
    ssoId: string;
  };
  SignInGuest: {
    showToastDelete?: boolean;
  };
  ShowCredit: {
    songId: number;
  };
  SongDetails: {
    songId: number;
    musicianId: string;
  };
  Notification: undefined;
  PostDetail: PostList;
  SearchScreen: undefined;
  TnCAndPP: undefined;
  TopUpCredit: undefined;
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
  CreatePost:
    | {songData?: ListDataSearchSongs; postData?: PostList; audience?: string}
    | undefined;
  SplashScreen: undefined;
  ListPlaylist: undefined;
  Event: undefined;
  Merch: undefined;
  Ticket: undefined;
  Cart: {
    promoId?: string;
  };
  PromoCode: undefined;
  PromoDetail: {
    id: string;
  };
  Checkout: undefined;
  Transaction: undefined;
  TransactionDetailMerch: {
    id: string;
  };
  TransactionDetailTicket: {
    id: string;
  };
  Track: {
    status: number;
  };
  TicketDetail: undefined;
  Shop: undefined;
  NewBankAccount: {
    type: string;
    data?: BankAccountPropsType;
  };
  VerifCodeWithdrawal: {
    type: string;
    data?: BankAccountPropsType;
    idWithdraw?: number;
  };
  Withdrawal: undefined;
  YourTopFansScreen: undefined;
  AlbumAnalyticScreen: {albumId: number};
  SongDetailAnalytic: {
    songId: string;
  };
  ListAddress: {
    from?: string;
  };
  AddNewAddress: {
    data?: DataShippingProps;
    from?: string;
  };
  Revenue: undefined;
  EventDetail: {
    id: string;
  };
  LiveTipping: {id: string; eventId: string; endDate: string};
  ClaimReward: {id: string};
  TransactionDetail: {
    id: string;
  };
  QrCode: undefined;
  Device: undefined;
};

export type MainTabParams = {
  Collection: undefined;
  Event: undefined;
  Merch: undefined;
  Events: undefined;
  Feed: undefined;
  Home: {
    showToast?: boolean;
  };
  Profile: {
    showToast?: boolean;
    deletePlaylist?: boolean;
  };
  Search: undefined;
};

const screenOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const MainTab = createBottomTabNavigator<MainTabParams>();
const TabScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  return (
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
        initialParams={{showToast: false}}
        options={{
          tabBarIcon: ({color}) => (
            <TouchableOpacity
              style={styles.root}
              onPress={() =>
                navigation.navigate('Home', {
                  showToast: false,
                })
              }>
              <HomeIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Home'}</Text>
            </TouchableOpacity>
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
        name="Merch"
        component={MerchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.root}>
              <CrownIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Merch'}</Text>
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Events"
        component={TicketScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.root}>
              <TicketDefaultIcon fill={color} />
              <Text style={[styles.label, {color}]}>{'Events'}</Text>
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{showToast: false, deletePlaylist: false}}
        options={{
          tabBarIcon: ({color}) => (
            <TouchableOpacity
              style={styles.root}
              onPress={() =>
                navigation.navigate('Profile', {
                  showToast: false,
                  deletePlaylist: false,
                })
              }>
              <UserProfileIcon stroke={color} />
              <Text style={[styles.label, {color}]}>{'Profile'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackParams>();
export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={screenOption}
    initialRouteName={'SplashScreen'}>
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
    <RootStack.Screen
      name="AccountInformation"
      component={AccountInformationScreen}
    />
    <RootStack.Screen name="BlockedUser" component={BlockedUserScreen} />
    <RootStack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
    <RootStack.Screen name="Email" component={EmailScreen} />
    <RootStack.Screen name="OtpEmail" component={OtpEmailScreen} />
    <RootStack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
    <RootStack.Screen name="ChangePhoneNumber" component={ChangePNScreen} />
    <RootStack.Screen name="OtpPhoneNumber" component={OtpPNScreen} />
    <RootStack.Screen
      name="PreferenceSetting"
      component={PreferenceSettingScreen}
    />
    <RootStack.Screen name="Security" component={SecurityScreen} />
    <RootStack.Screen name="TnCAndPP" component={TnCAndPPScreen} />
    <RootStack.Screen name="AboutDeletion" component={AboutDeletionScreen} />
    <RootStack.Screen name="InputDeletion" component={InputDeletionScreen} />
    <RootStack.Screen
      name="PushNotification"
      component={PushNotificationScreen}
    />
    <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <RootStack.Screen name="ReferralCode" component={ReferralCodeSetting} />
    <RootStack.Screen name="Language" component={LanguageScreen} />
    <RootStack.Screen name="ListAddress" component={ListAddressScreen} />
    <RootStack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
    <RootStack.Screen
      name="DonationAndSubscription"
      component={DonationAndSubscription}
    />
    <RootStack.Screen
      name="ExclusiveContentSetting"
      component={ExclusiveContentSetting}
    />
    <RootStack.Screen name="SendAppeal" component={SendAppealScreen} />
    <RootStack.Screen
      name="ReportedContent"
      component={ReportedContentScreen}
    />
    <RootStack.Screen name="SendReport" component={SendReportScreen} />
    <RootStack.Screen name="Setting" component={SettingScreen} />
    <RootStack.Screen name="MyQRCode" component={MyQRCode} />
    <RootStack.Screen name="SongDetails" component={SongDetailsScreen} />
    <RootStack.Screen name="ShowCredit" component={ShowCreditScreen} />
    <RootStack.Screen name="Album" component={AlbumScreen} />
    <RootStack.Screen
      name="SignInGuest"
      component={SignInGuestScreen}
      initialParams={{showToastDelete: false}}
    />
    <RootStack.Screen name="Signup" component={SignupScreen} />
    <RootStack.Screen name="SignupSSO" component={SignupSSOScreen} />
    <RootStack.Screen name="MainTab" component={TabScreen} />
    <RootStack.Screen name="Notification" component={Notification} />
    <RootStack.Screen
      name="ExclusiveContent"
      component={ExclusiveContentScreen}
    />
    <RootStack.Screen name="RecoverAccount" component={RecoverAccountScreen} />
    <RootStack.Screen name="Followers" component={FollowersScreen} />
    <RootStack.Screen name="PostDetail" component={PostDetail} />
    <RootStack.Screen name="SearchScreen" component={SearchScreen} />
    <RootStack.Screen name="MusicianProfile" component={MusicianProfile} />
    <RootStack.Screen name="Webview" component={WebviewPage} />
    <RootStack.Screen name="MusicPlayer" component={MusicPlayer} />
    <RootStack.Screen name="TopUpCredit" component={TopUpCreditScreen} />
    <RootStack.Screen
      name="DetailHistoryTransaction"
      component={DetailHistoryTransactionScreen}
    />
    <RootStack.Screen name="Withdrawal" component={WithdrawalScreen} />
    <RootStack.Screen name="NewBankAccount" component={NewBankAccountScreen} />
    <RootStack.Screen
      name="VerifCodeWithdrawal"
      component={VerifCodeWithdrawalScreen}
    />
    <RootStack.Screen
      name="ProfileProgress"
      component={ProfileProgressScreen}
    />
    <RootStack.Screen name="MerchDetail" component={MerchDetail} />
    <RootStack.Screen name="ConcertDetail" component={ConcertDetail} />
    <RootStack.Screen name="CreatePost" component={CreatePost} />
    <RootStack.Screen name="PhotoGallery" component={PhotoGallery} />
    <RootStack.Screen name="OtherUserProfile" component={OtherUserProfile} />
    <RootStack.Screen name="QuoteMusic" component={QuoteMusic} />
    <RootStack.Screen name="AddPreview" component={AddPreview} />
    <RootStack.Screen name="ListImage" component={ListImageScreen} />
    <RootStack.Screen name="ListMusic" component={ListMusicScreen} />
    <RootStack.Screen name="ListPost" component={ListPostScreen} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="ListPlaylist" component={ListPlaylist} />
    <RootStack.Screen name="Cart" component={Cart} />
    <RootStack.Screen name="PromoCode" component={PromoCode} />
    <RootStack.Screen name="PromoDetail" component={PromoDetail} />
    <RootStack.Screen name="Checkout" component={Checkout} />
    <RootStack.Screen name="Transaction" component={Transaction} />
    <RootStack.Screen
      name="TransactionDetailMerch"
      component={TransactionDetailMerch}
    />
    <RootStack.Screen
      name="TransactionDetailTicket"
      component={TransactionDetailTicket}
    />
    <RootStack.Screen name="Track" component={Track} />
    <RootStack.Screen name="TicketDetail" component={TicketDetail} />
    <RootStack.Screen name="Shop" component={Shop} />
    <RootStack.Screen name="YourTopFansScreen" component={YourTopFansScreen} />
    <RootStack.Screen
      name="AlbumAnalyticScreen"
      component={AlbumAnalyticScreen}
    />
    <RootStack.Screen
      name="SongDetailAnalytic"
      component={SongDetailAnalytic}
    />
    <RootStack.Screen name="Revenue" component={RevenueScreen} />
    <RootStack.Screen name="EventDetail" component={EventDetail} />
    <RootStack.Screen name="LiveTipping" component={LiveTipping} />
    <RootStack.Screen name="ClaimReward" component={ClaimReward} />
    <RootStack.Screen name="TransactionDetail" component={TransactionDetail} />
    <RootStack.Screen name="QrCode" component={QrCode} />
    <RootStack.Screen name="Device" component={Device} />
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
