export interface ModificationOption {
  name: string;
  addonPrice: number;
}

export type ModificationType = 'sizes' | 'flavours';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductWithModifications extends Product {
  modifications: Record<ModificationType, ModificationOption[]>;
}

export interface AddonBase {
  name: string;
  price: number;
}

export interface Addon {
  addon: AddonBase;
  limit: number;
  sortOrder: number;
}

export interface AddonGroupType {
  name: string;
  limit: number;
  sortOrder: number;
  refProductIds: string[];
  addons: Addon[];
}

export interface ModificationState {
  sizes?: string;
  flavours?: string;
}

export interface AddonState {
  [groupId: string]: {
    [addonName: string]: number;
  };
}
