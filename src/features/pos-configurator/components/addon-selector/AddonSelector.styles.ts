import styled from "styled-components";
import { ErrorText, PriceText } from "@components/shared";
import theme from "@/theme";

// Wrapper for each group of addons (like toppings, removals etc)
export const GroupContainer = styled.div`
  margin: 1rem 0;
  border-radius: 8px;
`;

// Makes addons look nice in a grid - adjusts based on screen size
export const AddonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
`;

// Keep track of whether an addon is picked or if it's something to remove
interface AddonItemProps {
  $isChecked: boolean;
  $isRemoval: boolean;
}

// The actual addon button - changes look based on state
// Red for things to remove
export const AddonItem = styled.button<AddonItemProps>`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  width: 100%;
  background: ${({ theme, $isChecked, $isRemoval }) => 
    $isChecked 
      ? ($isRemoval ? theme.colors.removal : theme.colors.primary)
      : theme.colors.background};
  border: 2px solid ${({ theme, $isChecked, $isRemoval }) => 
    $isRemoval 
      ? theme.colors.removal  // Always red border for removal items
      : $isChecked 
        ? theme.colors.primary 
        : theme.colors.border};
  min-height: 80px;
  color: ${props => props.$isChecked ? "white" : "inherit"};
  outline: none;

  &:focus {
    outline: none;
    border-color: ${({ theme, $isRemoval }) => 
      $isRemoval ? theme.colors.removal : theme.colors.primary};
  }

  // Tiny lift effect on hover
  &:hover {
    border-color: ${({ theme, $isRemoval }) => 
      $isRemoval ? theme.colors.removalLight : theme.colors.primary};
    transform: translateY(-2px);
  }

  // Price color changes when button is selected
  ${PriceText} {
    color: ${props => 
      props.$isChecked 
        ? "white" 
        : props.$isRemoval 
          ? theme.colors.removal 
          : theme.colors.priceText};
  }
`;

// Left-align text inside the button
export const AddonContent = styled.div`
  flex: 1;
  text-align: left;
`;

// For showing minus sign on removal items
interface AddonNameProps {
  $isRemoval: boolean;
}

// Addon name with a minus sign if it's removable
export const AddonName = styled.div<AddonNameProps>`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;

  &::before {
    content: "${props => props.$isRemoval ? '- ' : ''}";
  }
`;

// Shows error when you hit group limits
export const GroupError = styled(ErrorText)`
  margin: 0.5rem 0;
  padding: 0.5rem 0.75rem;
`; 