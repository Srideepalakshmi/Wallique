export interface MonthTheme {
  month: number;
  name: string;
  image: string;
  primary: string;
  accent: string;
  background: string;
  mood: string;
}

export const MONTH_THEMES: Record<number, MonthTheme> = {
  0: {
    month: 0,
    name: 'January',
    image: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80&w=2000',
    primary: '#1e3a5f',
    accent: '#64b5f6',
    background: '#f0f4f8',
    mood: 'Cool & Festive'
  },
  1: {
    month: 1,
    name: 'February',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=2000',
    primary: '#880e4f',
    accent: '#f48fb1',
    background: '#fce4ec',
    mood: 'Romantic & Floral'
  },
  2: {
    month: 2,
    name: 'March',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2000',
    primary: '#2e7d32',
    accent: '#81c784',
    background: '#e8f5e9',
    mood: 'Fresh & Spring'
  },
  3: {
    month: 3,
    name: 'April',
    image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=2000',
    primary: '#ef6c00',
    accent: '#ffb74d',
    background: '#fff3e0',
    mood: 'Bright & Pastel'
  },
  4: {
    month: 4,
    name: 'May',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000',
    primary: '#fbc02d',
    accent: '#fff176',
    background: '#fffde7',
    mood: 'Summer Sunlight'
  },
  5: {
    month: 5,
    name: 'June',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2000',
    primary: '#00695c',
    accent: '#4db6ac',
    background: '#e0f2f1',
    mood: 'Nature & Rain'
  },
  6: {
    month: 6,
    name: 'July',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
    primary: '#0277bd',
    accent: '#4fc3f7',
    background: '#e1f5fe',
    mood: 'Energetic Skies'
  },
  7: {
    month: 7,
    name: 'August',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000',
    primary: '#c62828',
    accent: '#e57373',
    background: '#ffebee',
    mood: 'Festive Tones'
  },
  8: {
    month: 8,
    name: 'September',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000',
    primary: '#4e342e',
    accent: '#a1887f',
    background: '#efebe9',
    mood: 'Harvest Earth'
  },
  9: {
    month: 9,
    name: 'October',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000',
    primary: '#e65100',
    accent: '#ffb74d',
    background: '#fff3e0',
    mood: 'Autumn Orange'
  },
  10: {
    month: 10,
    name: 'November',
    image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=2000',
    primary: '#ff8f00',
    accent: '#ffd54f',
    background: '#fff8e1',
    mood: 'Golden Lights'
  },
  11: {
    month: 11,
    name: 'December',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=2000',
    primary: '#2e7d32',
    accent: '#81c784',
    background: '#e8f5e9',
    mood: 'Winter Festive'
  }
};
