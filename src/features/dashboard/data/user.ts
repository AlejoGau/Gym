import type { User } from '@/features/dashboard/types';

/** Usuario mock del portal. No hay autenticación real en esta etapa. */
export const currentUser: User = {
  id: 'usr-001',
  name: 'Alejo Gautier',
  avatarUrl: null,
  goal: 'Ganar masa muscular',
  memberSince: '2025-11-03',
};
