import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/context/TranslationContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function JoinScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [slug, setSlug] = useState('');

  const handleQRScan = () => {
    router.push('/scan');
  };

  const handleJoin = () => {
    if (slug) {
      // TODO: Implement joining by slug
      console.log('Joining with slug:', slug);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
            <ThemedText style={styles.backText}>{t('global.buttons.back')}</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('join.title')}</ThemedText>
            <ThemedText style={styles.subtitle}>{t('join.subtitle')}</ThemedText>
          </View>

          <TouchableOpacity 
            style={[styles.qrButton, { backgroundColor: Colors[colorScheme]?.primary }]}
            onPress={handleQRScan}
          >
            <IconSymbol name="qrcode" size={24} color="#FFFFFF" />
            <ThemedText style={styles.qrButtonText}>{t('join.qrButton')}</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.qrDescription}>{t('join.qrDescription')}</ThemedText>

          <View style={styles.divider}>
            <ThemedText style={styles.slugTitle}>{t('join.slugTitle')}</ThemedText>
          </View>

          <TextInput
            style={styles.input}
            placeholder={t('join.slugPlaceholder')}
            placeholderTextColor="#666"
            value={slug}
            onChangeText={setSlug}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ThemedText style={styles.slugDescription}>{t('join.slugDescription')}</ThemedText>

          <TouchableOpacity 
            style={[styles.joinButton, { 
              backgroundColor: slug ? Colors[colorScheme]?.primary : '#666',
              opacity: slug ? 1 : 0.5
            }]}
            onPress={handleJoin}
            disabled={!slug}
          >
            <ThemedText style={styles.buttonText}>{t('join.joinButton')}</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 20,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    padding: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  qrButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  qrDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  divider: {
    marginVertical: 20,
    alignItems: 'center',
  },
  slugTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  slugDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  joinButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 