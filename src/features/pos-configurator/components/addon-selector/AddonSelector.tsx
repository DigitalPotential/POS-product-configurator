import { usePOSStore } from "@/store/posStore";
import type { AddonGroupType } from '@/types';
import { formatCurrency } from "@/utils/formatting";
import { PriceText } from "@components/shared"
import { 
  GroupContainer, 
  AddonGrid, 
  AddonItem,
  AddonContent,
  AddonName, 
  GroupError
} from './AddonSelector.styles';
import { REMOVAL_GROUP_NAME } from "@/constants";

interface AddonSelectorProps {
  group: AddonGroupType;
}

/**
 * Renders a group of addons with selection functionality
 */
export const AddonSelector = ({ group }: AddonSelectorProps) => {
  const selections = usePOSStore((state) => state.selections) ?? { addons: {} };
  const groupLimitMessage = usePOSStore((state) => state.ui.groupLimitMessage);
  const { toggleAddon, showGroupLimitMessage } = usePOSStore((state) => state.actions);

  if (!group || !group.addons) {
    return null;
  }

  const isRemovalGroup = group.name.toLowerCase() === REMOVAL_GROUP_NAME;
  const sortedAddons = [...(group.addons || [])].sort((a, b) => 
    (a.sortOrder || 0) - (b.sortOrder || 0)
  );

  const handleAddonToggle = (addonName: string) => {
    const currentCount = selections.addons?.[addonName] || 0;
    const newCount = currentCount === 0 ? 1 : 0;

    // Validate group limits
    if (newCount === 1) {
      const groupAddons = Object.entries(selections.addons || {})
        .filter(([, count]) => count > 0)
        .filter(([name]) => 
          group.addons.some(a => a.addon.name === name)
        );

      if (groupAddons.length >= (group.limit || 0)) {
        showGroupLimitMessage(group.name, group.limit || 0);
        return;
      }
    }

    toggleAddon(addonName);
  };

  return (
    <GroupContainer>
      {groupLimitMessage && groupLimitMessage.groupName === group.name && (
        <GroupError>
          Maximum {groupLimitMessage.limit} items allowed in this group
        </GroupError>
      )}
      <AddonGrid>
        {sortedAddons.map(({ addon }) => {
          if (!addon || !addon.name) return null;
          
          const isChecked = (selections.addons?.[addon.name] || 0) > 0;
          return (
            <AddonItem 
              key={addon.name}
              $isChecked={isChecked}
              $isRemoval={isRemovalGroup}
              onClick={() => handleAddonToggle(addon.name)}
              type="button"
            >
              <AddonContent>
                <AddonName $isRemoval={isRemovalGroup}>
                  {addon.name}
                </AddonName>
                <PriceText>
                  +{formatCurrency(addon.price || 0)}
                </PriceText>
              </AddonContent>
            </AddonItem>
          );
        })}
      </AddonGrid>
    </GroupContainer>
  );
};
