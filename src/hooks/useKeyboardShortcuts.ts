import { useState, useEffect } from 'react';
import { usePOSStore } from '@/store/posStore';

// Hook that handles keyboard shortcuts and shows hints when Alt is pressed
export const useKeyboardShortcuts = (isConfiguring: boolean) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const handleKeyPress = usePOSStore((state) => state.actions.handleKeyPress);

  useEffect(() => {
    // Show shortcut hints when Alt is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Alt') {
        setShowShortcuts(true);
      }
      
      // Only handle shortcuts when the modal is open
      if (isConfiguring) {
        try {
          if (!event?.key) {
            console.error('Invalid keyboard event');
            return;
          }

          handleKeyPress(event);
        } catch (error) {
          console.error('Error handling keyboard shortcut:', error);
        }
      }
    };

    // Hide hints when Alt is released
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Alt') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up listeners when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress, isConfiguring]);

  return showShortcuts;
}; 