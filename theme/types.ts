export interface ThemeColors {
  // Base brand colors
  brand: {
    primary: string;   // Main brand color
    secondary: string; // Secondary brand variant
    dark: string;      // Darkest brand variant
  };
  
  // Accent colors for CTAs, highlights, etc.
  accent: {
    primary: string;   // Main accent
    secondary: string; // Secondary accent
  };
  
  // UI surface colors
  surface: {
    main: string;      // Main background 
    elevated: string;  // Cards, elevated content
    muted: string;     // Muted backgrounds, disabled states
  };
  
  // Text colors
  text: {
    primary: string;   // Main text color
    secondary: string; // Secondary, less important text
    muted: string;     // Subtle text like placeholders
    inverse: string;   // Text on colored backgrounds
  };
  
  // Functional/state colors
  state: {
    focus: string;      // Focus states
    hover: string;      // Hover states
    active: string;     // Active states
    disabled: string;   // Disabled states
    border: string;     // Border colors
  };
}

export interface Theme {
  colors: ThemeColors;
  name: string;
  isDark: boolean;
}

