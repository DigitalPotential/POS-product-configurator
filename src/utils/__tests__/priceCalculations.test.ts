import { describe, it, expect } from 'vitest';
import { calculateTotal } from '../priceCalculations';
import { POSState } from '@/types/pos';
import { productWithModifications } from '@/data/data';

describe('Price Calculations', () => {
  const mockBaseState: POSState = {
    product: productWithModifications,
    selections: {
      size: 'Normal',
      flavor: 'Coca Cola',
      addons: {}
    },
    ui: { error: null, groupLimitMessage: null },
    actions: {
      selectSize: () => {},
      selectFlavor: () => {},
      toggleAddon: () => {},
      resetSelections: () => {},
      handleKeyPress: () => {},
      showGroupLimitMessage: () => {}
    }
  };

  describe('Base Price', () => {
    it('should return base price with no modifications', () => {
      const total = calculateTotal(mockBaseState);
      expect(total).toBe(75); // Base price from data
    });

    it('should handle null state gracefully', () => {
      const total = calculateTotal(null as unknown as POSState);
      expect(total).toBe(0);
    });
  });

  describe('Size Modifications', () => {
    it('should add size modification price correctly', () => {
      const state = {
        ...mockBaseState,
        selections: {
          ...mockBaseState.selections,
          size: 'Extra large'
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(90); // Base 75 + Extra large 15
    });
  });

  describe('Addon Calculations', () => {
    it('should calculate single addon correctly', () => {
      const state = {
        ...mockBaseState,
        selections: {
          ...mockBaseState.selections,
          addons: {
            'Whipped cream': 1
          }
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(90); // Base 75 + Whipped cream 15
    });

    it('should handle multiple addons correctly', () => {
      const state = {
        ...mockBaseState,
        selections: {
          ...mockBaseState.selections,
          addons: {
            'Whipped cream': 1,
            'Vanilla icecream': 1
          }
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(95); // Base 75 + Whipped cream 15 + Vanilla icecream 5
    });

    it('should ignore invalid addons', () => {
      const state = {
        ...mockBaseState,
        selections: {
          ...mockBaseState.selections,
          addons: {
            'Invalid Addon': 1,
            'Whipped cream': 1
          }
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(90); // Base 75 + Whipped cream 15
    });
  });

  describe('Edge Cases', () => {
    it('should never return negative total', () => {
      const state = {
        ...mockBaseState,
        product: {
          ...mockBaseState.product,
          price: -100 // Invalid negative price
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(0);
    });

    it('should handle missing modifications gracefully', () => {
      const state = {
        ...mockBaseState,
        product: {
          ...mockBaseState.product,
          modifications: undefined as unknown as typeof productWithModifications.modifications
        }
      };
      const total = calculateTotal(state);
      expect(total).toBe(75); // Should return base price
    });
  });
}); 