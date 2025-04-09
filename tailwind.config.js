module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add other paths as needed
  ],
  // Enable dark mode that uses class strategy instead of media queries
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#123139',
          medium: '#1E4D5A',
          deepest: '#0B1F24',
        },
        accent: {
          teal: '#2A9D8F',
          gold: '#E9C46A',
        },
        // Light mode specific
        light: {
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
          border: 'rgba(0, 0, 0, 0.1)',
          hoverOverlay: 'rgba(18, 49, 57, 0.05)',
        },
        // Dark mode specific
        dark: {
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
          border: 'rgba(255, 255, 255, 0.1)',
          hoverOverlay: 'rgba(18, 49, 57, 0.8)',
        },
      },
    },
  },
  plugins: [],
}