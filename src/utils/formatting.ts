// Utility functions for formatting data, including currency formatting.

import { useCurrencyStore } from "@/store/currencyStore";

// Takes a number and formats it based on the current currency settings
// For example: 75 -> "75 kr" or "$ 75.00" depending on country
export const formatCurrency = (amount: number): string => {
  try {
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.warn('Invalid amount provided to formatCurrency:', amount);
      return '0';
    }

    const config = useCurrencyStore.getState().config;
    if (!config) {
      console.warn('Currency configuration not found, using default formatting');
      return amount.toString();
    }

    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: config.minimumFractionDigits,
        maximumFractionDigits: config.maximumFractionDigits
      }).format(amount);
    } catch (formatError) {
      console.error('Error formatting currency:', formatError);
      return amount.toString();
    }
  } catch (error) {
    console.error('Unexpected error in formatCurrency:', error);
    return amount.toString();
  }
};