import { StyleSheet, Image } from 'react-native';

export function Logo({ width = 250 }: { width?: number }) {
  // Calculate height based on original aspect ratio (230/500 = 0.46)
  const height = width * 0.46;

  return (
    <Image
      source={require('../assets/images/MSLOGO500x230SUBSBLUE.png')}
      style={[styles.logo, { width, height }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 20,
  },
}); 