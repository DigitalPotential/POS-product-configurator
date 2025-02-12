import { CurrencyConfig } from '../store/currencyStore';

// Currency settings for each country we support
// SE = no decimals (whole numbers)
// US = always show cents (2 decimals)
export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  'SE': { locale: 'sv-SE', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  'US': { locale: 'en-US', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 },
}; 