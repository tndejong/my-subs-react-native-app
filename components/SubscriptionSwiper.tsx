import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { organizations } from '@/data/organizationsData';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '@/context/TranslationContext';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_MARGIN = 10;
const SWIPER_HEIGHT = height / 4;

export function SubscriptionSwiper() {
  const { t } = useTranslation();

  const renderOrganizationCard = (org: typeof organizations[0]) => (
    <ThemedView key={org.id} style={styles.card}>
      <ThemedText style={styles.orgName}>{org.name}</ThemedText>
      <ThemedView style={styles.paymentInfo}>
        <ThemedView>
          <ThemedText style={styles.label}>{t('components.subscriptionSwiper.nextPayment')}</ThemedText>
          <ThemedText style={styles.value}>{org.nextPayment}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText style={styles.label}>{t('components.subscriptionSwiper.amount')}</ThemedText>
          <ThemedText style={styles.amount}>{org.amount}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={[styles.status, styles[org.status]]}>
          {t(`components.subscriptionSwiper.status.${org.status}`)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );

  if (organizations.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>{t('pages.home.swiper.noSubscriptions')}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
      contentContainerStyle={styles.scrollContent}
    >
      {organizations.map(renderOrganizationCard)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
  },
  emptyContainer: {
    height: SWIPER_HEIGHT - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: SWIPER_HEIGHT - 40,
    marginHorizontal: CARD_MARGIN,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orgName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 12,
  },
  active: {
    backgroundColor: Colors.dark.success + '20',
    color: Colors.dark.success,
  },
  pending: {
    backgroundColor: Colors.dark.primary + '20',
    color: Colors.dark.primary,
  },
  expired: {
    backgroundColor: Colors.dark.error + '20',
    color: Colors.dark.error,
  },
}); 