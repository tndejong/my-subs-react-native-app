import { StyleSheet, Platform, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/context/TranslationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { 
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#000000'
    }]}>
      <View style={styles.contentWrapper}>
        <ThemedView 
          style={styles.contentContainer}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <Logo width={250} />
          <ThemedText style={styles.subtitle}>{t('onboarding.subtitle')}</ThemedText>
        </ThemedView>
      </View>

      <View style={[styles.buttonContainer, { 
        paddingBottom: Math.max(insets.bottom + 20, 40),
        paddingHorizontal: 20,
      }]}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme].primary }]}
          onPress={() => router.push('/join')}
        >
          <ThemedText style={styles.buttonText}>
            {t('onboarding.subscribeButton')}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton, { borderColor: Colors[colorScheme].primary }]}
          onPress={() => router.push('/login')}
        >
          <ThemedText style={[styles.buttonText, { color: Colors[colorScheme].primary }]}>
            {t('onboarding.loginButton')}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    color: Colors.light.text,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 