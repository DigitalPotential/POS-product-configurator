// Main store that handles our soda product - keeps track of what size/flavor 
// the user picked and any extras they added

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { POSState } from "@/types/pos";
import { productWithModifications } from "@/data/data";
import { getAvailableAddons } from "@/utils/addonUtils";
import { handleSizeShortcut, handleFlavorShortcut, handleAddonShortcut } from "@/utils/keyboardUtils";

// Set up our store with Zustand
export const usePOSStore = create<POSState>()(
  devtools(
    (set, get) => ({
      // Start with some defaults
      product: productWithModifications, // Our soda product
      selections: {
        size: productWithModifications.modifications.sizes[0].name, // Pick first size by default
        flavor: productWithModifications.modifications.flavours[0].name, // Pick first flavor by default
        addons: {} // No extras to start with
      },
      ui: {
        error: null, // Keep track of any errors
        groupLimitMessage: null // Show messages when user hits group limits
      },

      // Actions
      actions: {
        // Pick a size (like 'small' or 'large')
        selectSize: (size: string) => {
          const state = get();
          const validSize = state.product.modifications.sizes.find(s => s.name === size);
          
          if (!validSize) {
            set(state => ({
              ...state,
              ui: { ...state.ui, error: `Invalid size selection: ${size}` }
            }));
            return;
          }

          set(state => ({
            ...state,
            selections: { ...state.selections, size },
            ui: { ...state.ui, error: null }
          }));
        },

        // Pick a flavor (like 'cola' or 'sprite')
        selectFlavor: (flavor: string) => {
          const state = get();
          const validFlavor = state.product.modifications.flavours.find(f => f.name === flavor);
          
          if (!validFlavor) {
            set(state => ({
              ...state,
              ui: { ...state.ui, error: `Invalid flavor selection: ${flavor}` }
            }));
            return;
          }

          set(state => ({
            ...state,
            selections: { ...state.selections, flavor },
            ui: { ...state.ui, error: null }
          }));
        },

        // Add or remove an extra (like whipped cream)
        toggleAddon: (addonName: string) => {
          const state = get();
          const addon = getAvailableAddons(state.product.id).find(a => a.addon.name === addonName);
          
          if (!addon) {
            set(state => ({
              ...state,
              ui: { ...state.ui, error: `Invalid addon: ${addonName}` }
            }));
            return;
          }

          set(state => {
            const currentCount = state.selections.addons[addonName] || 0;
            const allAddonsInGroup = getAvailableAddons(state.product.id)
              .filter(a => a.groupName === addon.groupName);
            
            // Count total selections in this group
            const groupTotal = allAddonsInGroup.reduce((sum, a) => 
              sum + (state.selections.addons[a.addon.name] || 0), 0);

            // Check if we're trying to increment
            if (currentCount < addon.limit) {
              // Make sure we won't exceed group limit
              if (groupTotal < addon.groupLimit) {
                return {
                  ...state,
                  selections: {
                    ...state.selections,
                    addons: { 
                      ...state.selections.addons, 
                      [addonName]: currentCount + 1 
                    }
                  },
                  ui: { ...state.ui, error: null }
                };
              } else {
                // Show group limit message
                state.actions.showGroupLimitMessage(addon.groupName, addon.groupLimit);
                return state;
              }
            } else {
              // Decrement if we're at or above limit
              return {
                ...state,
                selections: {
                  ...state.selections,
                  addons: { 
                    ...state.selections.addons, 
                    [addonName]: Math.max(0, currentCount - 1)
                  }
                },
                ui: { ...state.ui, error: null }
              };
            }
          });
        },

        // Show a message when you try to add too many extras
        showGroupLimitMessage: (groupName: string, limit: number) => {
          set(state => ({
            ...state,
            ui: { ...state.ui, groupLimitMessage: { groupName, limit } }
          }));
          
          // Message goes away after 2 seconds
          setTimeout(() => {
            set(state => ({
              ...state,
              ui: { ...state.ui, groupLimitMessage: null }
            }));
          }, 2000);
        },

        // Start over with default selections
        resetSelections: () => {
          set(state => ({
            ...state,
            selections: {
              size: state.product.modifications.sizes[0].name,
              flavor: state.product.modifications.flavours[0].name,
              addons: {}
            },
            ui: { error: null, groupLimitMessage: null }
          }));
        },

        // Handle keyboard shortcuts
        handleKeyPress: (event: KeyboardEvent) => {
          if (!event.altKey) return;
          
          const state = get();
          const key = event.key.toLowerCase();

          // Alt + A resets everything
          if (key === "a") {
            event.preventDefault();
            state.actions.resetSelections();
            return;
          }

          handleSizeShortcut(key, state);
          handleFlavorShortcut(key, state);
          handleAddonShortcut(key, state);
        }
      }
    }),
    {
      name: "posStore", // Name for the store
      anonymousActionType: "POS Store" // Type for anonymous actions in Redux devtools
    }
  )
);
