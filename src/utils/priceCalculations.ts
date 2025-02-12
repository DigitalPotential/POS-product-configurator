import { POSState } from "@/types/pos";
import { addonGroups } from "@/data/data";
import { AddonGroupType } from "@/types";

// Adds up the base price plus any extras they picked
export const calculateTotal = (state: POSState): number => {
  if (!state?.product) {
    console.error('Invalid state: Product is required for price calculation');
    return 0;
  }

  const { product, selections } = state;
  let total = product.price || 0;

  // Add any extra cost for size/flavor choices
  try {
    if (!product.modifications) {
      throw new Error('Product modifications are not defined');
    }

    // Check if they picked a size that costs extra
    const sizeModification = product.modifications.sizes?.find(m => m.name === selections.size);
    if (!sizeModification && selections.size) {
      console.warn(`Size modification not found for: ${selections.size}`);
    }

    // Check if they picked a flavor that costs extra
    const flavorModification = product.modifications.flavours?.find(m => m.name === selections.flavor);
    if (!flavorModification && selections.flavor) {
      console.warn(`Flavor modification not found for: ${selections.flavor}`);
    }

    total += (sizeModification?.addonPrice || 0) + (flavorModification?.addonPrice || 0);
  } catch (error) {
    console.error('Error calculating modification prices:', error);
    // Keep going with what we have
  }

  // Add up any extras they picked (like whipped cream)
  if (selections.addons) {
    try {
      Object.entries(selections.addons).forEach(([addonName, count]) => {
        if (count < 0) {
          console.warn(`Invalid negative count for addon ${addonName}, skipping`);
          return;
        }

        const addon = addonGroups
          ?.flatMap((g: AddonGroupType) => g.addons || [])
          .find(a => a.addon?.name === addonName)?.addon;
        
        if (!addon) {
          console.warn(`Addon not found: ${addonName}, skipping price calculation`);
          return;
        }

        total += (addon.price || 0) * count;
      });
    } catch (error) {
      console.error('Error calculating addon prices:', error);
      // Keep going with what we have
    }
  }

  return Math.max(0, total); // Never return a negative price
}; 