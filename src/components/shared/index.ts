import styled from 'styled-components';
import theme from '@/theme';

// Keeps everything neat and centered on the page
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

// Main headings - nothing fancy, just bold text
export const Heading = styled.h1`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headingText};
`;

// Price display - consistent look across the app
export const PriceText = styled.span`
  color: ${({ theme }) => theme.colors.priceText};
  font-size: 1rem;
  font-weight: 500;
`;

// Red box for errors - helps them stand out
export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorBackground};
  border-radius: 4px;
  font-size: 0.9rem;
`;

// Props for our buttons - can be selected or marked to remove
interface SelectableButtonProps {
  $selected?: boolean;
  $isRemoval?: boolean;
}

// Main button used everywhere - changes colors when clicked
// or when it's used to remove stuff (like 'no ice')
export const SelectableButton = styled.button<SelectableButtonProps>`
  padding: 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  min-height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  background: ${({ theme, $selected, $isRemoval }) => 
    $selected 
      ? ($isRemoval ? theme.colors.removal : theme.colors.primary)
      : theme.colors.background};
      
  border: 2px solid ${({ theme, $selected, $isRemoval }) => 
    $isRemoval 
      ? theme.colors.removal
      : $selected 
        ? theme.colors.primary 
        : theme.colors.border};
        
  color: ${props => props.$selected ? "white" : props.theme.colors.headingText};

  &:hover {
    border-color: ${({ theme, $isRemoval }) => 
      $isRemoval ? theme.colors.removalLight : theme.colors.primary};
  }

  ${PriceText} {
    color: ${props => 
      props.$selected 
        ? "white" 
        : props.$isRemoval 
          ? theme.colors.removal 
          : theme.colors.priceText};
  }
`;

// Makes button text easy to read
export const ButtonText = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

// Pull in all our shared stuff
export * from './buttons';
export * from './layout';
export * from './typography'; 