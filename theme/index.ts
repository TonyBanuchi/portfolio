// Example theme/index.ts file to simplify imports
import { Theme, ThemeColors } from './types';
import { lightTheme, darkTheme, lightColors, darkColors } from './colors';
import { ThemeProvider, useTheme } from '../components/ThemeProvider';

export {
  ThemeProvider,
  useTheme,
  lightTheme,
  darkTheme,
  lightColors,
  darkColors,
  type Theme,
  type ThemeColors,
};

// Example implementation flow:

// 1. app/layout.tsx - Server Component
//    Import ThemeProvider
//    Import ClientLayout
//    Wrap children with both

// 2. components/ThemeProvider.tsx - Client Component 
//    Manages theme state
//    Provides theme context
//    Applies theme class to document

// 3. components/ClientLayout.tsx - Client Component
//    Contains Header and Footer
//    Uses theme context
//    Wraps children (page content)

// 4. theme/colors.ts - Defines theme colors
//    Exports lightColors and darkColors objects
//    Exports lightTheme and darkTheme objects

// 5. theme/types.ts - Defines theme types
//    Exports ThemeColors interface
//    Exports Theme interface