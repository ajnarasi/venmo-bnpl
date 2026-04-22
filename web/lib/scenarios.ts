export type Friend = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  hue: number;
};

export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Jordan K.',  handle: '@jordank',   initials: 'JK', hue: 212 },
  { id: 'f2', name: 'Priya S.',   handle: '@priyas',    initials: 'PS', hue: 330 },
  { id: 'f3', name: 'Marcus O.',  handle: '@marco',     initials: 'MO', hue: 24  },
  { id: 'f4', name: 'Elena R.',   handle: '@elenar',    initials: 'ER', hue: 160 },
  { id: 'f5', name: 'Tyler V.',   handle: '@tvee',      initials: 'TV', hue: 288 },
  { id: 'f6', name: 'Aisha N.',   handle: '@ainn',      initials: 'AN', hue: 48  },
  { id: 'f7', name: 'Devon L.',   handle: '@devl',      initials: 'DL', hue: 196 },
  { id: 'f8', name: 'Sana M.',    handle: '@sanam',     initials: 'SM', hue: 8   },
  { id: 'f9', name: 'Kai T.',     handle: '@kait',      initials: 'KT', hue: 260 },
  { id: 'fa', name: 'Noor B.',    handle: '@noorb',     initials: 'NB', hue: 128 },
];

export type Scenario = {
  id: string;
  label: string;
  merchant: string;
  category: string;
  total: number;
  friendIds: string[];   // includes the user as implicit first participant
  seed: number;
  startOnScreen?: number;
  note?: string;
  hybrid?: { giftAmount: number; giftFromLabel: string }; // for generational assist
};

export const SCENARIOS: Scenario[] = [
  {
    id: 'coachella',
    label: 'Coachella · 4 friends',
    merchant: 'Ticketmaster',
    category: 'Ticketing',
    total: 1200,
    friendIds: ['f1', 'f2', 'f3'], // + you = 4
    seed: 17,
    note: 'Weekend 1 GA, 4 passes',
  },
  {
    id: 'airpods',
    label: 'AirPods gift · 6 coworkers',
    merchant: 'Apple',
    category: 'Group gift',
    total: 300,
    friendIds: ['f4', 'f5', 'f6', 'f7', 'f8'], // + you = 6
    seed: 31,
    note: 'Teammate birthday',
  },
  {
    id: 'airbnb',
    label: 'Airbnb + car · 3 roommates',
    merchant: 'Airbnb',
    category: 'Travel',
    total: 3900,
    friendIds: ['f2', 'f4'], // + you = 3
    seed: 57,
    note: '4-night stay + rental',
  },
  {
    id: 'laptop',
    label: 'College laptop · parent assist',
    merchant: 'Apple',
    category: 'Education',
    total: 1500,
    friendIds: ['fa'], // + you (the kid) = 2, with parent giving fixed gift
    seed: 83,
    note: 'Parent gifts $500, kid finances $1,000',
    hybrid: { giftAmount: 500, giftFromLabel: 'Mom' },
  },
  {
    id: 'missed',
    label: 'Missed payment demo',
    merchant: 'Ticketmaster',
    category: 'Ask-a-Friend recovery',
    total: 1200,
    friendIds: ['f1', 'f2', 'f3'],
    seed: 17,
    startOnScreen: 5, // jump straight to Ask-a-Friend
    note: 'Installment #2 failed — recovery in progress',
  },
];

export function perPersonAmount(s: Scenario, acceptedCount: number): number {
  if (s.hybrid) {
    const financed = s.total - s.hybrid.giftAmount;
    return financed; // in hybrid flow, kid finances the whole remainder
  }
  const participants = Math.max(1, acceptedCount);
  return s.total / participants;
}
