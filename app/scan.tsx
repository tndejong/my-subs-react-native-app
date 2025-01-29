import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from '@/context/TranslationContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BarCodeScannedCallback } from 'expo-barcode-scanner';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{t('scan.noAccess')}</ThemedText>
          <ThemedText style={styles.description}>{t('scan.enableCamera')}</ThemedText>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme].primary }]}
            onPress={requestPermission}
          >
            <ThemedText style={styles.buttonText}>{t('scan.goBack')}</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedCallback) => {
    setScanned(true);
    try {
      const scannedData = JSON.parse(data);
      console.log('Scanned QR Code Type:', type);
      console.log('Scanned QR Code Data:', scannedData);
      router.back();
    } catch (error) {
      console.log('Invalid QR Code format:', data);
      setScanned(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        type="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 