export type Organization = {
  id: string;
  name: string;
  nextPayment: string;
  amount: string;
  logo?: string;
  status: 'active' | 'pending' | 'expired';
};

export const organizations: Organization[] = [
  {
    id: '1',
    name: 'Skatepark De Fabriek',
    nextPayment: '24 maart 2024',
    amount: '€25,00',
    status: 'active',
  },
  {
    id: '2',
    name: 'Fitness Club',
    nextPayment: '1 april 2024',
    amount: '€45,00',
    status: 'active',
  },
  {
    id: '3',
    name: 'Tennis Vereniging',
    nextPayment: '15 april 2024',
    amount: '€30,00',
    status: 'active',
  },
]; 