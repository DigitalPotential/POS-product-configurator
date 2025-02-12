import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      border: string;
      error: string;
      errorBackground: string;
      background: string;
      removal: string;
      removalLight: string;
      headingText: string;
      priceText: string;
    };
  }
} 