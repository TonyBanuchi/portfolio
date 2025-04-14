// theme/colors.ts
import { Theme, ThemeColors } from './types';

// Base brand colors that stay consistent between modes
const brandColors = {
  primary: '#123139',   // Dark blue
  secondary: '#1E4D5A', // Medium blue 
  dark: '#0B1F24',      // Deepest blue
};

// Accent colors that stay consistent between modes
const accentColors = {
  primary: '#E9C46A',   // Gold (primary accent)
  secondary: '#2A9D8F', // Teal (secondary accent)
};

// Light theme colors
export const lightColors: ThemeColors = {
  brand: { ...brandColors },
  accent: { ...accentColors },
  surface: {
    main: '#F8F8F8',     // Light background
    elevated: '#FFFFFF', // White for cards
    muted: '#EBEBEB',    // Light gray for secondary surfaces
  },
  text: {
    primary: '#333333',   // Near black
    secondary: '#555555', // Dark gray
    muted: '#888888',     // Medium gray
    inverse: '#FFFFFF',   // White text on dark backgrounds
  },
  state: {
    focus: accentColors.secondary,
    hover: 'rgba(18, 49, 57, 0.05)',
    active: 'rgba(18, 49, 57, 0.1)',
    disabled: '#CCCCCC',
    border: 'rgba(0, 0, 0, 0.1)',
  }
};

// Dark theme colors
export const darkColors: ThemeColors = {
  brand: { ...brandColors },
  accent: { ...accentColors },
  surface: {
    main: '#121212',     // Dark background
    elevated: '#1E1E1E', // Slightly lighter dark
    muted: '#2A2A2A',    // Muted dark surface
  },
  text: {
    primary: '#FFFFFF',   // White
    secondary: '#EBEBEB', // Light gray
    muted: '#AAAAAA',     // Medium gray
    inverse: '#333333',   // Dark text on light backgrounds
  },
  state: {
    focus: accentColors.secondary,
    hover: 'rgba(42, 157, 143, 0.15)',
    active: 'rgba(42, 157, 143, 0.25)',
    disabled: '#555555',
    border: 'rgba(255, 255, 255, 0.1)',
  }
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