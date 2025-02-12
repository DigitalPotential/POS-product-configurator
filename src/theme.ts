import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    // Main green shades
    primary: "#459B69",        // Base green
    primaryHover: "#367D54",   // Darker for hover
    primaryLight: "#53B77C",   // Lighter for highlights
    
    // UI colors
    border: "#E5E7EB",        // Light gray for borders
    background: "#FFFFFF",     // White background
    headingText: "#000000",   // Black for headings
    priceText: "#367D54",     // Darker green for prices
    
    // Status/Feedback colors
    error: "#EF4444",         // Red for errors
    errorBackground: "#FEE2E2",// Light red background
    removal: "#DC2626",       // Red for removal actions
    removalLight: "#EF4444",  // Light red for hover
  }
};

export default theme;
