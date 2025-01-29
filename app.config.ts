import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Subs',
  slug: 'my-subs',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL || 'http://192.168.2.64:8000',
  },
}); 