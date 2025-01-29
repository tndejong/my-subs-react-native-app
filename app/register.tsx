import { useState } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/context/TranslationContext';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const handleRegister = async () => {
    try {
      setError('');
      
      if (!email || !password) {
        setError('required');
        return;
      }

      if (password !== confirmPassword) {
        setError('passwordMismatch');
        return;
      }

      await register(email, password);
      // Registration successful - AuthContext will handle the redirect
    } catch (err: any) {
      if (err.message === 'User already exists') {
        setError('userExists');
      } else {
        setError('registrationFailed');
      }
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <ThemedView style={styles.container}>
            <ThemedView 
              style={styles.formContainer}
              lightColor={Colors.light.background}
              darkColor={Colors.dark.background}
            >
              <ThemedText style={styles.title}>{t('auth.register.title')}</ThemedText>
              
              {error && <ThemedText style={styles.errorText}>{t(`global.errors.${error}`)}</ThemedText>}
              
              <ThemedTextInput
                placeholder={t('auth.register.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              
              <ThemedTextInput
                placeholder={t('auth.register.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <ThemedTextInput
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                style={[styles.button, { backgroundColor: Colors[colorScheme].primary }]}
                onPress={handleRegister}
              >
                <ThemedText style={styles.buttonText}>{t('global.buttons.register')}</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => router.back()}
              >
                <ThemedText style={[styles.linkText, { color: Colors[colorScheme].primary }]}>
                  {t('auth.register.hasAccount')}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000000',
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