import { POSState } from "@/types/pos";
import { getAvailableAddons } from "./addonUtils";

// Maps number keys to size options (1-5)
export const handleSizeShortcut = (key: string, state: POSState) => {
  try {
    const { product, actions } = state;
    if (!product?.modifications?.sizes) {
      console.warn('Size modifications not available');
      return;
    }

    const totalSizes = product.modifications.sizes.length;
    if (totalSizes === 0) {
      console.warn('No size options available');
      return;
    }
    
    // If there's only one size, just pick it
    if (totalSizes === 1) {
      actions.selectSize(product.modifications.sizes[0].name);
      return;
    }

    // Check if they pressed a valid number for size
    const keyNumber = parseInt(key);
    if (isNaN(keyNumber) || keyNumber < 1 || keyNumber > totalSizes) {
      return; // Not a valid size number
    }

    const size = product.modifications.sizes[keyNumber - 1];
    if (size) actions.selectSize(size.name);
  } catch (error) {
    console.error('Error handling size shortcut:', error);
  }
};

// Maps number keys to flavor options (comes after sizes)
export const handleFlavorShortcut = (key: string, state: POSState) => {
  try {
    const { product, actions } = state;
    if (!product?.modifications?.flavours) {
      console.warn('Flavor modifications not available');
      return;
    }

    // If we have multiple sizes, flavor shortcuts start after them
    const totalSizes = product.modifications.sizes?.length || 0;
    const flavorStart = totalSizes > 1 ? totalSizes + 1 : 1;
    const flavorKey = parseInt(key);
    
    if (isNaN(flavorKey)) {
      return; // Not a number key
    }

    // Convert the pressed number to a flavor index
    const flavorIndex = flavorKey - flavorStart;
    if (flavorIndex < 0 || flavorIndex >= product.modifications.flavours.length) {
      return; // Number doesn't map to a flavor
    }

    const flavor = product.modifications.flavours[flavorIndex];
    if (flavor) actions.selectFlavor(flavor.name);
  } catch (error) {
    console.error('Error handling flavor shortcut:', error);
  }
};

// Maps remaining number keys (and Q, W) to addons
export const handleAddonShortcut = (key: string, state: POSState) => {
  try {
    const { product, actions } = state;
    if (!product?.id) {
      console.warn('Product ID not available for addon shortcuts');
      return;
    }

    // Addons start after sizes and flavors
    const totalSizes = product.modifications.sizes?.length || 0;
    const flavorStart = totalSizes > 1 ? totalSizes + 1 : 1;
    const addonStart = flavorStart + (product.modifications.flavours?.length || 0);
    
    const availableAddons = getAvailableAddons(product.id);
    if (!availableAddons.length) {
      console.warn('No addons available');
      return;
    }

    // Figure out which addon they want
    let addonIndex = -1;
    if (key >= '1' && key <= '9') {
      addonIndex = parseInt(key) - addonStart;
    } else if (key === 'q') {
      addonIndex = availableAddons.length - 2;
    } else if (key === 'w') {
      addonIndex = availableAddons.length - 1;
    }

    if (addonIndex >= 0 && addonIndex < availableAddons.length) {
      actions.toggleAddon(availableAddons[addonIndex].addon.name);
    }
  } catch (error) {
    console.error('Error handling addon shortcut:', error);
  }
}; 