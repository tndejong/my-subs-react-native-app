import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '@/context/TranslationContext';

type Subscription = {
  id: string;
  name: string;
  price: string;
  status: string;
};

const mockSubscriptions: Subscription[] = [
  { id: '1', name: 'Skatepark De Fabriek', price: '€25/month', status: 'Active' },
  // Add more mock data as needed
];

export default function SubscriptionsScreen() {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: Subscription }) => (
    <ThemedView style={styles.subscriptionItem}>
      <ThemedText style={styles.subscriptionName}>{item.name}</ThemedText>
      <ThemedText style={styles.subscriptionPrice}>{item.price}</ThemedText>
      <ThemedText style={styles.subscriptionStatus}>{item.status}</ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {t('pages.subscriptions.title')}
        </ThemedText>
        <FlatList
          data={mockSubscriptions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  subscriptionItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#1A1A1A',
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subscriptionPrice: {
    fontSize: 16,
    color: Colors.dark.primary,
  },
  subscriptionStatus: {
    fontSize: 14,
    color: Colors.dark.success,
    marginTop: 5,
  },
}); 