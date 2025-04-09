export interface ThemeColors {
  primary: {
    dark: string;
    medium: string;
    deepest: string;
  };
  accent: {
    teal: string;
    gold: string;
  };
  neutral: {
    warmGray: string;
    offWhite: string;
    darkGray: string;
  };
  text: {
    primary: string;
    secondary: string;
    dark: string;
  };
  functional: {
    cta: string;
    link: string;
    border: string;
    hoverOverlay: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  name: string;
  isDark: boolean;
}

