export interface AddRemoveFcmResponseType {
  code: number;
  data: {
    uuid: string;
    lastLoginAt: string | null;
    fcmToken: string[];
  };
  message: string;
  status: number;
}
