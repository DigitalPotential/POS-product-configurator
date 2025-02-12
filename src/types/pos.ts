import { ProductWithModifications } from './index';

export interface Selections {
  size: string;
  flavor: string;
  addons: Record<string, number>;
}

export interface UIState {
  error: string | null;
  groupLimitMessage: {
    groupName: string;
    limit: number;
  } | null;
}

export interface POSState {
  product: ProductWithModifications;
  selections: Selections;
  ui: UIState;
  actions: {
    selectSize: (size: string) => void;
    selectFlavor: (flavor: string) => void;
    toggleAddon: (addonName: string) => void;
    resetSelections: () => void;
    handleKeyPress: (event: KeyboardEvent) => void;
    showGroupLimitMessage: (groupName: string, limit: number) => void;
  };
} 