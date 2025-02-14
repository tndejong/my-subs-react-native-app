import { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/TranslationContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    try {
      setError('');
      
      if (!email || !password) {
        setError('required');
        return;
      }

      await signIn(email, password);
      // Login successful - AuthContext will handle the redirect
    } catch (err: any) {
      if (err.message === 'Invalid credentials') {
        setError('invalidCredentials');
      } else {
        setError('loginFailed');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
              <ThemedText style={styles.backText}>{t('global.buttons.back')}</ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedView style={styles.container}>
            <ThemedView 
              style={styles.formContainer}
              lightColor={Colors.light.background}
              darkColor={Colors.dark.background}
            >
              <ThemedText style={styles.title}>{t('auth.login.title')}</ThemedText>
              
              {error && <ThemedText style={styles.errorText}>{t(`global.errors.${error}`)}</ThemedText>}
              
              <ThemedTextInput
                placeholder={t('auth.login.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              
              <ThemedTextInput
                placeholder={t('auth.login.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                style={[styles.button, { backgroundColor: Colors[colorScheme].primary }]}
                onPress={handleLogin}
              >
                <ThemedText style={styles.buttonText}>{t('global.buttons.login')}</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => router.push('/register')}
              >
                <ThemedText style={[styles.linkText, { color: Colors[colorScheme].primary }]}>
                  {t('auth.login.noAccount')}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
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
  container: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
  errorText: {
    color: Colors.light.error,
    marginBottom: 10,
    textAlign: 'center',
  },
}); 