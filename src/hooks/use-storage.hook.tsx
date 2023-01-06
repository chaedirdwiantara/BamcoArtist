import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: `ssufans-storage`,
  encryptionKey: 'ssuplayer',
});

export const profileStorage = (): {
  id: number;
  uuid: string;
  username: string;
  email: string;
  fullname: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  lastLoginAt: string | null;
} | null => {
  let profile: {
    id: number;
    uuid: string;
    username: string;
    email: string;
    fullname: string;
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    lastLoginAt: string | null;
  } | null = null;
  const profileJSON = storage.getString('profile');
  if (profileJSON) {
    profile = JSON.parse(profileJSON);
  }
  return profile;
};
