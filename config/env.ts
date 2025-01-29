import Constants from 'expo-constants';

export const ENV = {
  API_URL: Constants.expoConfig?.extra?.apiUrl as string,
  SANCTUM_TOKEN_URL: `${Constants.expoConfig?.extra?.apiUrl}/api/sanctum/token`,
  SANCTUM_LOGOUT_URL: `${Constants.expoConfig?.extra?.apiUrl}/api/logout`,
  SANCTUM_REGISTER_URL: `${Constants.expoConfig?.extra?.apiUrl}/api/register`,
  SANCTUM_USER_URL: `${Constants.expoConfig?.extra?.apiUrl}/api/user`,
}; 