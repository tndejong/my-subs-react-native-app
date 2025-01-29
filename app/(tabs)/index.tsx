import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { SubscriptionSwiper } from '@/components/SubscriptionSwiper';
const { height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.swiperContainer}>
        <SubscriptionSwiper />
      </ThemedView>
      <ThemedView style={styles.restOfScreen}>
        {/* Future content can go here */}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  swiperContainer: {
    height: height / 4,
    paddingTop: 20,
  },
  restOfScreen: {
    flex: 1,
  },
});
