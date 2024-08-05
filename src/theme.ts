// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f5f7ff',
      100: '#e6edff',
      200: '#c4d4ff',
      300: '#a2bbff',
      400: '#799aff',
      500: '#4f79ff',
      600: '#3c5ed6',
      700: '#2c46ad',
      800: '#1d2e85',
      900: '#0f1b5d',
    },
  },
});

export default theme;