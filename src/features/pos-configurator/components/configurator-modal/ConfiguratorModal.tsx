import { ModificationSelector } from "../modification-selector";
import { AddonSelector } from "../addon-selector";
import { ConfiguratorFooter } from "../configurator-footer";
import { usePOSStore } from "@/store/posStore";
import { addonGroups } from "@/data/data";
import { Title } from "@/components/shared/typography";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  BlackText
} from "./ConfiguratorModal.styles";

interface ConfiguratorModalProps {
  onClose: () => void;
}

// Main modal for customizing a drink - handles sizes, flavors and extras
export const ConfiguratorModal = ({ onClose }: ConfiguratorModalProps) => {
  const product = usePOSStore((state) => state.product);

  // Get addon groups for this product and sort them by their sortOrder
  const relevantAddonGroups = addonGroups
    .filter(g => g.refProductIds.includes(product.id))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>
          <BlackText>Anpassa</BlackText> {product?.name}
        </Title>

        <ModificationSelector />

        <Title>
          Extra tillval
        </Title>

        {relevantAddonGroups.map((group) => (
          <AddonSelector key={group.name} group={group} />
        ))}

        <ConfiguratorFooter onClose={onClose} />
      </ModalContent>
    </ModalOverlay>
  );
}; 