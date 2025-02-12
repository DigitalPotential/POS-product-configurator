import { usePOSStore } from "@/store/posStore";
import { formatCurrency } from "@/utils/formatting";
import { calculateTotal } from "@/utils/priceCalculations";
import { 
  TotalAmount, 
  ButtonGroup, 
  DoneButton, 
  ResetButton, 
  TotalSection 
} from "./ConfiguratorFooter.styles";

interface Props {
  onClose: () => void;
}

// Footer that shows the total and lets you reset or finish up
export const ConfiguratorFooter = ({ onClose }: Props) => {
  const state = usePOSStore();
  const resetSelections = usePOSStore((state) => state.actions.resetSelections);
  const total = calculateTotal(state);

  // Log the current state and calculated price whenever it changes
  console.log('Current selections:', {
    basePrice: state.product.price,
    size: state.selections.size,
    flavor: state.selections.flavor,
    addons: state.selections.addons,
    calculatedTotal: total
  });

  return (
    <TotalSection>
      <TotalAmount>
        Total: {formatCurrency(total)}
      </TotalAmount>
      <ButtonGroup>
        <ResetButton onClick={resetSelections}>
          Återställ
        </ResetButton>
        <DoneButton onClick={onClose}>
          Klar
        </DoneButton>
      </ButtonGroup>
    </TotalSection>
  );
};
