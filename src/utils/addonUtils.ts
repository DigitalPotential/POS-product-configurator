import { addonGroups } from "@/data/data";
import type { AddonGroupType } from "@/types";

// Addon with extra info about its group
interface AddonWithGroup extends Omit<AddonGroupType['addons'][0], 'addon'> {
  addon: AddonGroupType['addons'][0]['addon'];
  groupName: string;
  groupLimit: number;
}

// Gets all the addons a product can have and sorts them
export const getAvailableAddons = (productId: string): AddonWithGroup[] => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    if (!Array.isArray(addonGroups)) {
      throw new Error('Addon groups data is not properly initialized');
    }

    // Find groups that match this product
    const filteredGroups = addonGroups.filter(g => g.refProductIds.includes(productId));
    if (filteredGroups.length === 0) {
      console.warn(`No addon groups found for product ${productId}`);
    }

    // Flatten groups into a single list and add group info to each addon
    return filteredGroups
      .flatMap(group => 
        (group.addons || []).map(addon => ({
          ...addon,
          groupName: group.name,
          groupLimit: group.limit
        }))
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('Error getting available addons:', error);
    return [];
  }
}; 