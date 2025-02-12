import { describe, it, expect, beforeEach } from 'vitest';
import { usePOSStore } from '../posStore';
import { productWithModifications } from '@/data/data';

describe('POS Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    usePOSStore.setState({
      product: productWithModifications,
      selections: {
        size: productWithModifications.modifications.sizes[0].name,
        flavor: productWithModifications.modifications.flavours[0].name,
        addons: {}
      },
      ui: {
        error: null,
        groupLimitMessage: null
      }
    });
  });

  describe('Size Selection', () => {
    it('should select a valid size', () => {
      const store = usePOSStore.getState();
      const newSize = productWithModifications.modifications.sizes[1].name;
      
      store.actions.selectSize(newSize);
      
      expect(usePOSStore.getState().selections.size).toBe(newSize);
      expect(usePOSStore.getState().ui.error).toBeNull();
    });

    it('should handle invalid size selection', () => {
      const store = usePOSStore.getState();
      const invalidSize = 'Invalid Size';
      
      store.actions.selectSize(invalidSize);
      
      expect(usePOSStore.getState().ui.error).toContain('Invalid size selection');
      expect(usePOSStore.getState().selections.size).not.toBe(invalidSize);
    });
  });

  describe('Addon Selection', () => {
    it('should toggle addon state', () => {
      const store = usePOSStore.getState();
      const addonName = 'Whipped cream';
      
      store.actions.toggleAddon(addonName);
      expect(usePOSStore.getState().selections.addons[addonName]).toBe(1);
      
      store.actions.toggleAddon(addonName);
      expect(usePOSStore.getState().selections.addons[addonName]).toBe(0);
    });

    it('should handle invalid addon', () => {
      const store = usePOSStore.getState();
      const invalidAddon = 'Invalid Addon';
      
      store.actions.toggleAddon(invalidAddon);
      
      expect(usePOSStore.getState().ui.error).toContain('Invalid addon');
      expect(usePOSStore.getState().selections.addons[invalidAddon]).toBeUndefined();
    });
  });

  describe('Reset Functionality', () => {
    it('should reset to initial state', () => {
      const store = usePOSStore.getState();
      const initialSize = store.selections.size;
      
      // Make some changes
      store.actions.selectSize(productWithModifications.modifications.sizes[1].name);
      store.actions.toggleAddon('Whipped cream');
      
      // Reset
      store.actions.resetSelections();
      
      const finalState = usePOSStore.getState();
      expect(finalState.selections.size).toBe(initialSize);
      expect(Object.keys(finalState.selections.addons)).toHaveLength(0);
      expect(finalState.ui.error).toBeNull();
    });
  });
}); 