import { create } from 'zustand';
import { CURRENCY_CONFIGS } from '@/constants/currencyConstants';

// Settings for how to format prices
export interface CurrencyConfig {
  locale: string;
  currency: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
}

interface CurrencyState {
  config: CurrencyConfig;
  setConfig: (config: Partial<CurrencyConfig>) => void;
}

// Get the default currency setup based on country
const getDefaultConfig = (countryCode: string): CurrencyConfig => {
  return CURRENCY_CONFIGS[countryCode] || CURRENCY_CONFIGS['SE'];
};

// Use country from env or fallback to SE
const countryCode = import.meta.env.VITE_COUNTRY_CODE || 'SE';

// Make sure we have all the required currency settings
const validateCurrencyConfig = (config: Partial<CurrencyConfig>) => {
  if (!config.locale) {
    throw new Error('Currency locale is required');
  }
  if (!config.currency) {
    throw new Error('Currency code is required');
  }
  if (typeof config.minimumFractionDigits !== 'number') {
    throw new Error('minimumFractionDigits must be a number');
  }
  if (typeof config.maximumFractionDigits !== 'number') {
    throw new Error('maximumFractionDigits must be a number');
  }
};

// Store for handling currency formatting across the app
export const useCurrencyStore = create<CurrencyState>((set) => ({
  config: getDefaultConfig(countryCode),
  setConfig: (newConfig) => {
    try {
      validateCurrencyConfig(newConfig);
      set(state => ({ 
        config: { ...state.config, ...newConfig }
      }));
    } catch (error) {
      console.error('Invalid currency configuration:', error);
      // Keep using current config if the new one is invalid
    }
  },
})); 