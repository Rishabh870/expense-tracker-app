import { SettlementEntry } from '../utils/types';

export const mockSettlementData: SettlementEntry[] = [
  {
    id: 1,
    amount: 750,
    direction: 'receive',
    expense_id: 1,
    settled_on: '2025-07-01T12:00:00Z',
    user: {
      id: 0,
      name: 'You',
      email: '',
      phone: '',
      bgColor: '#000000',
      created_at: new Date().toISOString(),
    },
    other_person: {
      id: 1,
      name: 'Alice Johnson',
      email: '',
      phone: '9876543210',
      bgColor: '#60A5FA',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 2,
    amount: 320,
    direction: 'pay',
    expense_id: 2,
    settled_on: '2025-07-02T12:00:00Z',
    user: {
      id: 0,
      name: 'You',
      email: '',
      phone: '',
      bgColor: '#000000',
      created_at: new Date().toISOString(),
    },
    other_person: {
      id: 2,
      name: 'Bob Smith',
      email: '',
      phone: '8765432109',
      bgColor: '#34D399',
      created_at: new Date().toISOString(),
    },
  },
  {
    id: 3,
    amount: 1140,
    direction: 'receive',
    expense_id: 3,
    settled_on: '2025-07-03T12:00:00Z',
    user: {
      id: 0,
      name: 'You',
      email: '',
      phone: '',
      bgColor: '#000000',
      created_at: new Date().toISOString(),
    },
    other_person: {
      id: 3,
      name: 'Charlie Lee',
      email: '',
      phone: '7654321098',
      bgColor: '#FBBF24',
      created_at: new Date().toISOString(),
    },
  },
  // ...continue for all others
];
