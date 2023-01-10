import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: `ssufans-storage`,
  encryptionKey: 'ssuplayer',
});

export type ProfileProps = {
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
};

export const profileStorage = (): ProfileProps | null => {
  let profile: ProfileProps | null = null;
  const profileJSON = storage.getString('profile');
  if (profileJSON) {
    profile = JSON.parse(profileJSON);
  }
  return profile;
};
