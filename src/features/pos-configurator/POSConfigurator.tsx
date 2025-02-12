import { usePOSStore } from "@/store/posStore";
import { formatCurrency } from "@/utils/formatting";
import { ConfiguratorModal } from "./components/configurator-modal";
import { useState } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
  ProductCard,
  ProductName,
  ProductPrice,
  ShortcutHint,
  ShortcutKey
} from "./POSConfigurator.styles";

// Main component for customizing drinks
// Shows a card you can click to open the modal
export const POSConfigurator = () => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showShortcuts = useKeyboardShortcuts(isConfiguring);
  const product = usePOSStore((state) => state.product);

  if (!product) {
    return (
      <div role="alert">
        <p>Error: Product data not available</p>
      </div>
    );
  }

  try {
    // Figure out what keyboard numbers to show for each option
    const totalSizes = product.modifications.sizes.length || 0;
    const hasMultipleSizes = totalSizes > 1;
    const totalFlavors = product.modifications.flavours.length || 0;
    
    const flavorStart = hasMultipleSizes ? totalSizes + 1 : 1;
    const flavorEnd = flavorStart + totalFlavors - 1;
    const addonStart = flavorEnd + 1;
    const remainingNumbers = Math.max(0, 9 - addonStart + 1);
    const addonDisplay = remainingNumbers > 0 ? `${addonStart}-9, Q, W` : 'Q, W';

    if (error) {
      return (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre>{error}</pre>
        </div>
      );
    }

    return (
      <>
        {/* Click this card to start customizing */}
        <ProductCard onClick={() => setIsConfiguring(true)}>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
        </ProductCard>

        {/* Modal pops up when you click the card */}
        {isConfiguring && (
          <ConfiguratorModal 
            onClose={() => setIsConfiguring(false)} 
          />
        )}

        {/* Show keyboard shortcuts when holding Alt */}
        {showShortcuts && isConfiguring && (
          <ShortcutHint>
            Keyboard Shortcuts:<br />
            {hasMultipleSizes && (
              <><ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>1-{totalSizes}</ShortcutKey>: Select size<br /></>
            )}
            <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>{flavorStart}-{flavorEnd}</ShortcutKey>: Select flavor<br />
            <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>{addonDisplay}</ShortcutKey>: Toggle addons<br />
            <ShortcutKey>Alt</ShortcutKey> + <ShortcutKey>a</ShortcutKey>: Reset selections<br />
            <ShortcutKey>Enter</ShortcutKey>: Confirm order
          </ShortcutHint>
        )}
      </>
    );
  } catch (err) {
    console.error('Error in POSConfigurator:', err);
    setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{err instanceof Error ? err.message : 'An unexpected error occurred'}</pre>
      </div>
    );
  }
}; 