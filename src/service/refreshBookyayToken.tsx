import jwtDecode from 'jwt-decode';
import {storage} from '../hooks/use-storage.hook';
import {
  AuthType,
  DecodeTokenType,
  TokenBookyayDecodeType,
} from '../interface/auth.interface';
import {refreshToken} from '../api/auth.api';

export const getBookyayToken = async (): Promise<string | null> => {
  return new Promise(async function (resolve, reject) {
    const JSONProfile = storage.getString('profile');
    let bookyayToken: string | null = null;
    let refreshTokenUser: string | null = null;
    let now = Math.round(Date.now() / 1000);
    if (JSONProfile) {
      const profileObject = JSON.parse(JSONProfile) as AuthType;
      bookyayToken = profileObject.accessToken;
      let decodedBookyayToken = jwtDecode(
        bookyayToken,
      ) as TokenBookyayDecodeType;
      refreshTokenUser = profileObject.refreshToken;
      let decodedRefreshToken = jwtDecode(refreshTokenUser) as DecodeTokenType;

      if (now > decodedBookyayToken.exp) {
        if (now > decodedRefreshToken.exp) {
          // THROW TO LOGIN
          reject('expired to login');
          storage.set('isLogin', false);
        } else {
          // HIT REFRESH TOKEN API AND UPDATE LOCAL STORAGE
          refreshToken()
            .then(res => {
              profileObject.accessToken = res.data.accessToken;
              profileObject.refreshToken = res.data.refreshToken;
              profileObject.bookyayToken = res.data.bookyayToken;
              storage.set('profile', JSON.stringify(JSONProfile));
              resolve(res.data.accessToken);
            })
            .catch(err => {
              console.log(err);
              storage.set('isLogin', false);
            });
        }
      } else {
        resolve(bookyayToken);
      }
    }
  });
};
