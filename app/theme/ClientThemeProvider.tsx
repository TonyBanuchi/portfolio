
'use client';

import { ThemeProvider } from '../theme/ThemeContext';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}