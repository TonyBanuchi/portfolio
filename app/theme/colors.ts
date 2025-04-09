import { Theme, ThemeColors } from './types';

// Base palette that doesn't change between modes
const baseColors = {
  primary: {
    dark: '#123139',
    medium: '#1E4D5A',
    deepest: '#0B1F24',
  },
  accent: {
    teal: '#2A9D8F',
    gold: '#E9C46A',
  },
};

// Light theme colors
export const lightColors: ThemeColors = {
  ...baseColors,
  neutral: {
    warmGray: '#EBEBEB',
    offWhite: '#F8F8F8',
    darkGray: '#333333',
  },
  text: {
    primary: '#333333',
    secondary: '#555555',
    dark: '#111111',
  },
  functional: {
    cta: baseColors.accent.gold,
    link: baseColors.accent.teal,
    border: 'rgba(0, 0, 0, 0.1)',
    hoverOverlay: 'rgba(18, 49, 57, 0.05)',
  },
};

// Dark theme colors
export const darkColors: ThemeColors = {
  ...baseColors,
  neutral: {
    warmGray: '#333333',
    offWhite: '#1A1A1A',
    darkGray: '#CCCCCC',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBEB',
    dark: '#DDDDDD',
  },
  functional: {
    cta: baseColors.accent.gold,
    link: baseColors.accent.teal, 
    border: 'rgba(255, 255, 255, 0.1)',
    hoverOverlay: 'rgba(18, 49, 57, 0.8)',
  },
};

// Theme objects
export const lightTheme: Theme = {
  colors: lightColors,
  name: 'light',
  isDark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  name: 'dark',
  isDark: true,
};