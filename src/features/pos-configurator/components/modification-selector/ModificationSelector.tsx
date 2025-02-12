import { usePOSStore } from "@/store/posStore";
import { formatCurrency } from "@/utils/formatting";
import { useEffect } from "react";
import { ModificationButton, ModificationGrid, ModificationSection, SectionHeading, ModificationGroup } from "./ModificationSelector.styles";
import { ButtonText, PriceText } from "@/components/shared";

export const ModificationSelector = () => {
  // Get current product and selections from the store
  const product = usePOSStore((state) => state.product);
  const selections = usePOSStore((state) => state.selections);
  const { selectSize, selectFlavor } = usePOSStore((state) => state.actions);

  // Set default selections when component mounts
  useEffect(() => {
    if (product) {
      if (!selections.size) {
        selectSize(product.modifications.sizes[0].name);
      }
      if (!selections.flavor) {
        const defaultFlavor = product.modifications.flavours.find(f => f.name === "Coca Cola")?.name 
          || product.modifications.flavours[0].name;
        selectFlavor(defaultFlavor);
      }
    }
  }, [product, selections.size, selections.flavor, selectSize, selectFlavor]);

  if (!product) return null;

  // Helper function to render price additions (if any)
  const renderPrice = (price: number) => {
    if (price <= 0) return null;
    return (
      <PriceText>
        +{formatCurrency(price)}
      </PriceText>
    );
  };

  return (
    <ModificationSection>
      {/* Size selection group */}
      <ModificationGroup>
        <SectionHeading>
          Storlek
        </SectionHeading>
        <ModificationGrid>
          {product.modifications.sizes.map((option) => {
            const isSelected = selections.size === option.name;
            return (
              <ModificationButton
                key={option.name}
                $selected={isSelected}
                onClick={() => selectSize(option.name)}
                role="radio"
                aria-checked={isSelected}
              >
                <ButtonText>{option.name}</ButtonText>
                {renderPrice(option.addonPrice)}
              </ModificationButton>
            );
          })}
        </ModificationGrid>
      </ModificationGroup>

      {/* Flavor selection group */}
      <ModificationGroup>
        <SectionHeading>
          Smak
        </SectionHeading>
        <ModificationGrid>
          {product.modifications.flavours.map((option) => {
            const isSelected = selections.flavor === option.name;
            return (
              <ModificationButton
                key={option.name}
                $selected={isSelected}
                onClick={() => selectFlavor(option.name)}
                role="radio"
                aria-checked={isSelected}
              >
                <ButtonText>{option.name}</ButtonText>
                {renderPrice(option.addonPrice)}
              </ModificationButton>
            );
          })}
        </ModificationGrid>
      </ModificationGroup>
    </ModificationSection>
  );
};
